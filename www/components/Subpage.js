import React from 'react';
import { connectToStores } from 'fluxible-addons-react';

let Subpage = (props) => {
  return (
    <div className="container subpage">
      <h2>{props.content.title}</h2>
      <div className="body-text"
        dangerouslySetInnerHTML={{ __html: props.content.body }}
      >
      </div>
    </div>
  );
};

Subpage = connectToStores(Subpage, ['RouteStore'], (component) => {
  const currentRoute = component.getStore('RouteStore').getCurrentRoute();
  return {
    content: {
      title: `content.title.${currentRoute.page}`,
      body: `content.body.${currentRoute.page}`,
    },
  };
});

Subpage.propTypes = {
  content: React.PropTypes.object,
};

export default Subpage;
