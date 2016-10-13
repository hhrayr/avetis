import React from 'react';
import Form from './form/Form';
import Tsl from './Tsl';
import { clearSchema } from '../action/formActions';
import { connectToStores } from 'fluxible-addons-react';

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.onNewMessageClick = this.onNewMessageClick.bind(this);
    this.state = {
      formSubmitSuccess: this.props.formSubmitSuccess,
    };
  }

  componentWillUnmount() {
    this.context.executeAction(clearSchema, 'contact-us');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formSubmitSuccess !== this.state.formSubmitSuccess) {
      this.setState({
        formSubmitSuccess: nextProps.formSubmitSuccess,
      });
    }
  }

  onNewMessageClick() {
    this.setState({
      formSubmitSuccess: false,
    });
  }

  render() {
    return (
      <div className="container subpage">
        <h2><Tsl id="contact.us.title" /></h2>
        {this.renderPanels()}
      </div>
    );
  }

  renderPanels() {
    if (!this.state.formSubmitSuccess) {
      return this.renderForm();
    }
    return this.renderSuccessPanel();
  }

  renderForm() {
    return (
      <Form
        formId="contact-us"
        submitButton={'form.button.submit'}
      />
    );
  }

  renderSuccessPanel() {
    return (
      <div>
        <h3><Tsl id="contact.us.success" /></h3>
        <button type="submit" onClick={this.onNewMessageClick}>
          <Tsl id="contact.us.newMessage" />
        </button>
      </div>
    );
  }
}

ContactUs.contextTypes = {
  executeAction: React.PropTypes.func,
};

ContactUs.propTypes = {
  formSubmitSuccess: React.PropTypes.bool,
};

ContactUs = connectToStores(ContactUs, ['ContactUsFormStore'], (component) => {
  return {
    formSubmitSuccess: component.getStore('ContactUsFormStore').getFormSubmitSuccess(),
  };
});

export default ContactUs;
