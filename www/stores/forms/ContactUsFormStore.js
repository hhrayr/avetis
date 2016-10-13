import BaseStore from 'fluxible/addons/BaseStore';

class ContactUsFormStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.formSubmitSuccess = false;
  }

  getFormSubmitSuccess() {
    return this.formSubmitSuccess;
  }

  formSubmit(payload) {
    if (payload.formId === 'contact-us') {
      this.formSubmitSuccess = true;
      this.emitChange();
    }
  }
}

ContactUsFormStore.storeName = 'ContactUsFormStore';
ContactUsFormStore.handlers = {
  FORM_SUBMIT_SUCCESS: 'formSubmit',
};

export default ContactUsFormStore;
