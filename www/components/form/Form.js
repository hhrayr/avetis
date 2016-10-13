import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import FormBuilder from './FormBuilder';
import {
  updateElement,
  updateElements,
  removeElementError,
  validateElement,
  submitForm,
} from '../../action/formActions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onElementValueChange = this.onElementValueChange.bind(this);
    this.onElementValueChangeBulk = this.onElementValueChangeBulk.bind(this);
    this.onElementFocus = this.onElementFocus.bind(this);
    this.onElementBlur = this.onElementBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onElementValueChange(params) {
    this.context.executeAction(updateElement, this.extendElementParamsWithFormId(params));
  }

  onElementValueChangeBulk(params) {
    this.context.executeAction(updateElements, this.extendElementParamsWithFormId(params));
  }

  onElementFocus(params) {
    const extendedParams = this.extendElementParamsWithFormId(params);
    const elementTimeoutId = this.getElementUniqueTimeoutID(extendedParams);
    if (this[elementTimeoutId]) {
      window.clearTimeout(this[elementTimeoutId]);
      delete this[elementTimeoutId];
    } else {
      this.context.executeAction(removeElementError, extendedParams);
    }
  }

  onElementBlur(params) {
    const extendedParams = this.extendElementParamsWithFormId(params);
    const elementTimeoutId = this.getElementUniqueTimeoutID(extendedParams);
    this[elementTimeoutId] = window.setTimeout(
      () => {
        this.context.executeAction(validateElement, extendedParams);
        delete this[elementTimeoutId];
      }, 300
    );
  }

  extendElementParamsWithFormId(params) {
    const res = params;
    res.formId = this.props.formId;
    return res;
  }

  getElementUniqueTimeoutID(params) {
    return `${params.formId}-${params.segmentId}-${params.id}-timeout`;
  }

  onSubmit() {
    this.context.executeAction(submitForm, {
      formId: this.props.formId,
      schema: this.props.schema,
      clearOnSubmit: this.props.clearOnSubmit,
    });
    if (this.props.onSubmit) {
      this.props.onSubmit(this.props.schema);
    }
  }

  render() {
    return (
      <div id={`${this.props.formId}-form`} className="form-container">
        {this.props.schema ?
        <FormBuilder
          segments={this.props.schema.segments}
          submitButton={this.props.submitButton}
          onElementValueChange={this.onElementValueChange}
          onElementValueChangeBulk={this.onElementValueChangeBulk}
          onElementFocus={this.onElementFocus}
          onElementBlur={this.onElementBlur}
          onSubmit={this.onSubmit}
        /> : null }
      </div>
    );
  }
}

Form.contextTypes = {
  executeAction: React.PropTypes.func,
};

Form.defaultProps = {
  clearOnSubmit: true,
};

Form.propTypes = {
  formId: React.PropTypes.string.isRequired,
  schema: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  submitButton: React.PropTypes.string,
  clearOnSubmit: React.PropTypes.bool,
};

Form = connectToStores(Form, ['FormStore', 'EnvironmentStore'], (component, props) => {
  const formStore = component.getStore('FormStore');
  const envStore = component.getStore('EnvironmentStore');
  const language = envStore.getLanguage();
  return {
    schema: formStore.getSchema(props.formId, language),
  };
});

export default Form;
