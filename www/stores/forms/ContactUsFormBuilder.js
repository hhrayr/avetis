class ContactUsFormBuilder {
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

  buildEmailInput() {
    return {
      id: 'email',
      type: 'input',
      label: 'form.email.label',
      error: 'form.email.error',
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
      label: 'form.company-name.label',
    };
  }

  buildMessageTextArea() {
    return {
      id: 'message',
      type: 'textarea',
      label: 'form.message.label',
      error: 'form.message.error',
      validation: {
        required: true,
      },
    };
  }
}

export default new ContactUsFormBuilder();
