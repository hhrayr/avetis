import React from 'react';
import { forEach } from 'lodash';
import Segment from './Segment';
import Input from './Input';
import Textarea from './Textarea';
import Password from './Password';
import Checkbox from './Checkbox';
import RadioButtonList from './RadioButtonList';
import Select from './Select';
import DateElement from './DateElement';
import Payment from './payment/Payment';
import PhoneNumber from './PhoneNumber';
import GoogleAutocomplete from './GoogleAutocomplete';

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.onElementValueChange = this.onElementValueChange.bind(this);
    this.onElementValueChangeBulk = this.onElementValueChangeBulk.bind(this);
    this.onElementFocus = this.onElementFocus.bind(this);
    this.onElementBlur = this.onElementBlur.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onElementValueChange(params) {
    if (this.props.onElementValueChange) {
      this.props.onElementValueChange(params);
    }
  }

  onElementValueChangeBulk(params) {
    if (this.props.onElementValueChangeBulk) {
      this.props.onElementValueChangeBulk(params);
    }
  }

  onElementFocus(params) {
    if (this.props.onElementFocus) {
      this.props.onElementFocus(params);
    }
  }

  onElementBlur(params) {
    if (this.props.onElementBlur) {
      this.props.onElementBlur(params);
    }
  }

  onSubmitForm(e) {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
    return false;
  }

  renderSegments() {
    return this.props.segments.map((segmentSchema) => {
      if (this.isSegmentActive(segmentSchema)) {
        return this.renderSegment(segmentSchema);
      }
      return null;
    });
  }

  isSegmentActive(segmentSchema) {
    if (segmentSchema.activator) {
      const activatorElement = this.getElementSchema(segmentSchema.activator);
      return activatorElement && activatorElement.value;
    }
    return true;
  }

  getElementSchema(elementId) {
    let elementSchema;
    forEach(this.props.segments, (segment) => {
      forEach(segment.elements, (element) => {
        if (element.id === elementId) {
          elementSchema = element;
          return false;
        }
        return true;
      });
      if (elementSchema) {
        return false;
      }
      return true;
    });
    return elementSchema;
  }

  renderSegment(schema) {
    return (
      <Segment
        schema={schema}
        ref={schema.id}
        key={schema.id}
      >
        {schema.elements && this.renderElements(schema.elements, schema.id)}
      </Segment>
    );
  }

  renderElements(elements, segmentId) {
    return elements.map((element) => {
      if (!element.hidden) {
        return this.renderElement(element, segmentId);
      }
      return null;
    });
  }

  renderElement(element, segmentId) {
    switch (element.type) {
      case 'input': return this.renderInputElement(element, segmentId);
      case 'textarea': return this.renderTextareaElement(element, segmentId);
      case 'password': return this.renderPasswordElement(element, segmentId);
      case 'select': return this.renderSelectElement(element, segmentId);
      case 'phoneNumber': return this.renderPhoneNumberElement(element, segmentId);
      case 'date': return this.renderDateElement(element, segmentId);
      case 'checkbox': return this.renderCheckboxElement(element, segmentId);
      case 'payment': return this.renderPaymentElement(element, segmentId);
      case 'radiobuttonList': return this.renderRadioButtonListElement(element, segmentId);
      case 'googleAutocomplete': return this.renderGoogleAutocomplete(element, segmentId);
      default: return null;
    }
  }

  renderInputElement(element, segmentId) {
    return (
      <Input
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        type={element.type}
        name={element.id}
        value={element.value}
        label={element.label}
        placeholder={element.placeholder}
        validation={element.validation}
        error={element.error}
        onValueChange={this.onElementValueChange}
        onBlur={this.onElementBlur}
        onFocus={this.onElementFocus}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
      />
    );
  }

  renderTextareaElement(element, segmentId) {
    return (
      <Textarea
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        type={element.type}
        name={element.id}
        value={element.value}
        label={element.label}
        placeholder={element.placeholder}
        validation={element.validation}
        error={element.error}
        onValueChange={this.onElementValueChange}
        onBlur={this.onElementBlur}
        onFocus={this.onElementFocus}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
      />
    );
  }

  renderPasswordElement(element, segmentId) {
    return (
      <Password
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        name={element.id}
        label={element.label}
        value={element.value}
        placeholder={element.placeholder}
        validation={element.validation}
        error={element.error}
        onValueChange={this.onElementValueChange}
        onBlur={this.onElementBlur}
        onFocus={this.onElementFocus}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
      />
    );
  }

  renderPhoneNumberElement(element, segmentId) {
    return (
      <PhoneNumber
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        type="text"
        name={element.id}
        value={element.value}
        label={element.label}
        placeholder={element.placeholder}
        validation={element.validation}
        error={element.error}
        onValueChange={this.onElementValueChange}
        onBlur={this.onElementBlur}
        onFocus={this.onElementFocus}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
      />
    );
  }

  renderDateElement(element, segmentId) {
    return (
      <DateElement
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        language={this.props.language}
        label={element.label}
        isInValid={element.isInValid}
        error={element.error}
        componentStyle={element.style}
        value={element.value}
        disabled={element.disabled}
        infotext={element.infotext}
        onValueChange={this.onElementValueChange}
        order={element.order}
        inFuture={element.inFuture}
        maxYearsInFuture={element.maxYearsInFuture}
      />
    );
  }

  renderCheckboxElement(element, segmentId) {
    return (
      <Checkbox
        language={this.props.language}
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        label={element.label}
        value={element.value}
        validation={element.validation}
        onValueChange={this.onElementValueChange}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
      />
    );
  }

  renderSelectElement(element, segmentId) {
    if (element.id === 'gender') {
      return this.renderRadioButtonListElement(element, segmentId);
    }
    return (
      <Select
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        options={element.options}
        label={element.label}
        value={element.value}
        validation={element.validation}
        error={element.error}
        onValueChange={this.onElementValueChange}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
      />
    );
  }

  renderRadioButtonListElement(element, segmentId) {
    return (
      <RadioButtonList
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        options={element.options}
        label={element.label}
        value={element.value}
        validation={element.validation}
        error={element.error}
        onValueChange={this.onElementValueChange}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
      />
    );
  }

  renderPaymentElement(element, segmentId) {
    return (
      <Payment
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        name={element.id}
        language={this.props.language}
        label={element.label}
        value={element.value}
        onValueChange={this.onElementValueChange}
        onElementFocus={this.onElementFocus}
        isInValid={element.isInValid}
        componentStyle={element.style}
        methods={element.methods}
        CCProviders={element.CCProviders}
      />
    );
  }

  renderGoogleAutocomplete(element, segmentId) {
    return (
      <GoogleAutocomplete
        key={element.id}
        id={element.id}
        segmentId={segmentId}
        type={element.type}
        name={element.id}
        value={element.value}
        label={element.label}
        placeholder={element.placeholder}
        validation={element.validation}
        error={element.error}
        onValueChange={this.onElementValueChange}
        onValuesChange={this.onElementValueChangeBulk}
        onBlur={this.onElementBlur}
        onFocus={this.onElementFocus}
        componentStyle={element.style}
        isInValid={element.isInValid}
        infotext={element.infotext}
        disabled={element.disabled}
        country={this.props.country}
        fillmap={element.fillmap}
      />
    );
  }

  render() {
    const wrapperClassName = 'form-wrapper clearfix';
    return (
      <div className={wrapperClassName}>
        <form noValidate onSubmit={this.onSubmitForm}>
          {this.renderSegments()}
        </form>
      </div>
    );
  }
}

FormBuilder.propTypes = {
  segments: React.PropTypes.array,
  promocode: React.PropTypes.object,
  language: React.PropTypes.string,
  country: React.PropTypes.string,
  onElementValueChange: React.PropTypes.func,
  onElementValueChangeBulk: React.PropTypes.func,
  onElementFocus: React.PropTypes.func,
  onElementBlur: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
};

export default FormBuilder;
