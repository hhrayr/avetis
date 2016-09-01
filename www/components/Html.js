import React from 'react';
import Head from './head/Head';
import config from '../configs/tracking';

const Html = (props) => {
  const currentEnv = (typeof window !== 'undefined') ? window.ENV : process.env.NODE_ENV;
  const isProduction = currentEnv === 'production';
  return (
    <html>
    <Head context={props.context} env={currentEnv} pageSettings={{}} />
    <body>
    <div dangerouslySetInnerHTML={{ __html: props.markup }} id="app" />
    <script dangerouslySetInnerHTML={{ __html: props.state }} />
    <script src={`/public/js/${props.clientFile}`} />
    {isProduction &&
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${config.gtm.id}');
          `,
        }}
      />
    }
    </body>
    </html>
  );
};

Html.propTypes = {
  clientFile: React.PropTypes.string,
  context: React.PropTypes.object,
  markup: React.PropTypes.string,
  state: React.PropTypes.string,
};

export default Html;
