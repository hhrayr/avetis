import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import FormBuilder from './FormBuilder';
import {
  updateElement,
  updateElements,
  removeElementError,
  validateElement,
} from '../../action/formActions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onElementValueChange = this.onElementValueChange.bind(this);
    this.onElementValueChangeBulk = this.onElementValueChangeBulk.bind(this);
    this.onElementFocus = this.onElementFocus.bind(this);
    this.onElementBlur = this.onElementBlur.bind(this);
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

  render() {
    return (
      <div id={`${this.props.formId}-form`} className="form-container">
        {this.props.schema ?
        <FormBuilder
          segments={this.props.schema.segments}
          onElementValueChange={this.onElementValueChange}
          onElementValueChangeBulk={this.onElementValueChangeBulk}
          onElementFocus={this.onElementFocus}
          onElementBlur={this.onElementBlur}
        /> : null }
      </div>
    );
  }
}

Form.contextTypes = {
  executeAction: React.PropTypes.func,
};

Form.propTypes = {
  formId: React.PropTypes.string.isRequired,
  schema: React.PropTypes.object,
};

Form = connectToStores(Form, ['FormStore'], (component, props) => {
  const formStore = component.getStore('FormStore');
  return {
    schema: formStore.getSchema(props.formId),
  };
});

export default Form;
