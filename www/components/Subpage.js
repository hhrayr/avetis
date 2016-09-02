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
  const routeStore = component.getStore('RouteStore');
  return {
    content: {
      title: `content.title.${routeStore.getCurrentRoute().page}`,
      body: `content.body.${routeStore.getCurrentRoute().page}`,
    },
  };
});

Subpage.propTypes = {
  content: React.PropTypes.object,
};

export default Subpage;
