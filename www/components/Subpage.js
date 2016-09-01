import React from 'react';
import { connectToStores } from 'fluxible-addons-react';

let Subpage = (props) => {
  return (
    <div className="container subpage">
      <h2>{props.content.title}</h2>
      <div className="body-text"
        dangerouslySetInnerHTML={{ __html: props.content }}
      >
      </div>
    </div>
  );
};

Subpage = connectToStores(Subpage, ['RouteStore'], (component) => {
  const routeStore = component.getStore('RouteStore');
  return {
    content: `content.${routeStore.getCurrentRoute().page}`,
  };
});

Subpage.propTypes = {
  content: React.PropTypes.string,
};

export default Subpage;
