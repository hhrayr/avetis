import { getTranslation } from '../../components/Tsl';

class ContactUsFormBuilder {
  constructor(language) {
    this._language = language;
  }

  build() {
    const elements = [];
    elements.push(this.buildEmailInput());
    elements.push(this.buildCompanyNameInput());
    elements.push(this.buildMessageTextArea());
    return {
      segments: [{
        id: 'contact',
        elements,
      }],
    };
  }

  getLabelTranslaions(label) {
    return getTranslation(this._language, label);
  }

  buildEmailInput() {
    return {
      id: 'email',
      type: 'input',
      label: this.getLabelTranslaions('form.email.label'),
      error: this.getLabelTranslaions('form.email.error'),
      validation: {
        required: true,
        pattern: 'email',
      },
    };
  }

  buildCompanyNameInput() {
    return {
      id: 'comapny-name',
      type: 'input',
      label: this.getLabelTranslaions('form.company-name.label'),
    };
  }

  buildMessageTextArea() {
    return {
      id: 'message',
      type: 'textarea',
      label: this.getLabelTranslaions('form.message.label'),
      error: this.getLabelTranslaions('form.message.error'),
      validation: {
        required: true,
      },
    };
  }
}

export default (language) => {
  return new ContactUsFormBuilder(language).build();
};
