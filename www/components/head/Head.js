import React from 'react';
import config from '../../configs/tracking';

class Head extends React.Component {
  render() {
    const isProduction = this.props.env === 'production';
    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.pageSettings.title}</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
        <meta
          name="description"
          content={this.props.pageSettings.description}
        />
        <meta
          name="keywords"
          content={this.props.pageSettings.keywords}
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:site_name"
          content={this.props.pageSettings.ogSiteName}
        />
        <meta
          property="og:title"
          content={this.props.pageSettings.ogTitle || this.props.pageSettings.title}
        />
        <meta
          property="og:description"
          content={this.props.pageSettings.ogDescription || this.props.pageSettings.description}
        />
        <meta
          property="og:image"
          content={this.props.pageSettings.ogImage}
        />
        <meta name="google-site-verification"
          content={config.googleApiKey}
        />
        <meta name="msvalidate.01"
          content={config.bingApiKey}
        />
        { this.props.env !== 'local' &&
          <link rel="stylesheet" type="text/css" href="/public/js/style.min.css" /> }
        { this.renderJsVariablesScriptTag() }
        <script type="text/javascript" src="/assets/js/media.match.min.js" />
        {isProduction &&
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', '${config.ga.id}', 'auto', 'AvetisGA');
            ga('set', 'anonymizeIp', true);
            ga('send', 'pageview');` }}
          />
        }
      </head>
    );
  }

  renderJsVariablesScriptTag() {
    return (
      <script
        dangerouslySetInnerHTML={{ __html: `window.ENV='${this.props.env}';` }}
      />
    );
  }
}

Head.contextTypes = {
  executeAction: React.PropTypes.func,
};

Head.propTypes = {
  context: React.PropTypes.object,
  env: React.PropTypes.string,
  pageSettings: React.PropTypes.object,
};

export default Head;
