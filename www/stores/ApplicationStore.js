import BaseStore from 'fluxible/addons/BaseStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';
import { getTranslation } from '../components/Tsl';
import EnvironmentStore from './EnvironmentStore';
import { pageView } from '../utils/tracking';

class ApplicationStore extends BaseStore {
  handleRouteChange(currentRoute) {
    this.dispatcher.waitFor(EnvironmentStore, () => {
      if (currentRoute) {
        if (typeof document !== 'undefined') {
          const pageTitle = this.dispatcher.getStore('ContentStore').getPageSettings().title;
          if (pageTitle) {
            document.title = pageTitle;
          }
          window.dispatchEvent(new Event('dn_history'));
        }
        this.emitChange();
      }
    });
  }

  handleNavigationStart(currentRoute) {
    pageView(currentRoute.url);
  }

  showModalOverlay(payload) {
    const overlayContainerId = `${payload.elementId}-container`;
    const mountNode = document.createElement('div');
    const language = this.dispatcher.getStore('EnvironmentStore').getLanguage();
    mountNode.id = overlayContainerId;
    document.body.appendChild(mountNode);
    ReactDOM.render(
      <Modal show>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: payload.modal.html }} />
        </Modal.Body>
        <Modal.Footer>
          <a onClick={() => { this.closeModal(overlayContainerId); }}>
          {getTranslation(language, 'generics.modal.close')}
          </a>
        </Modal.Footer>
      </Modal>,
      mountNode
    );
  }

  closeModal(overlayContainerId) {
    const containerNode = document.getElementById(overlayContainerId);
    window.setTimeout(() => {
      ReactDOM.unmountComponentAtNode(containerNode);
      document.body.removeChild(containerNode);
    }, 100);
  }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
  NAVIGATE_START: 'handleNavigationStart',
  NAVIGATE_SUCCESS: 'handleRouteChange',
  SHOW_MODAL_OVERLAY: 'showModalOverlay',
};

export default ApplicationStore;
