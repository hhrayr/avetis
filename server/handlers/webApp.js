import React from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import HtmlComponent from '../../www/components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import app from '../../www/app';
import navigateAction from '../../www/action/navigateAction';
import debug from '../../shared/utils/debug';
import { getEnvironment } from '../../shared/utils/env';

const env = getEnvironment();

export default (req, res, next) => {
  const context = app.createContext({ req, res });

  debug('Executing navigate action');
  context.getActionContext().executeAction(navigateAction, {
    url: req.url,
  }, (err) => {
    if (err && err.statusCode !== 404) {
      next(err);
      return;
    }

    debug('Exposing context state');
    const exposed = `window.App=${serialize(app.dehydrate(context))};`;

    debug('Rendering Application component into html');
    const markup = ReactDOM.renderToString(createElementWithContext(context));
    const htmlElement = React.createElement(HtmlComponent, {
      clientFile: env !== 'local' ? 'main.min.js' : 'main.js',
      context: context.getComponentContext(),
      state: exposed,
      markup,
    });
    const html = ReactDOM.renderToStaticMarkup(htmlElement);

    debug('Sending markup');
    res.type('html');
    res.write(`<!DOCTYPE html>${html}`);
    res.end();
  });
};
