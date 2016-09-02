import React from 'react';
import BaseFormElement from '../BaseFormElement';
import { getTranslation } from '../../Tsl';
import { isNumeric } from '../../../../shared/utils/validation';
import Select from '../Select';

class CCValidUntil extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onYearChange = this.onYearChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
  }

  onYearChange(payload) {
    this.fireOnValueChange({ year: this.getDatePartNumricValue(payload.value) });
  }

  onMonthChange(payload) {
    this.fireOnValueChange({ month: this.getDatePartNumricValue(payload.value) });
  }

  getDatePartNumricValue(value) {
    if (isNumeric(value)) {
      return parseInt(value, 10);
    }
    return null;
  }

  fireOnValueChange(value) {
    if (this.props.onValueChange) {
      this.props.onValueChange({
        id: this.props.id,
        segmentId: this.props.segmentId,
        value,
      });
    }
  }

  getValue() {
    return this.props.value;
  }

  getContainerClassName() {
    return [
      super.getContainerClassName(),
      'payment-method-valid-until',
    ].join(' ');
  }

  renderYearSelector() {
    const yearSelectorId = `${this.props.id}-year`;
    return (
      <Select
        id={yearSelectorId}
        key={yearSelectorId}
        segmentId={this.props.segmentId}
        componentStyle={{ width: 'p50', align: 'left' }}
        value={this.getYearValue()}
        options={this.getYearSelectorOptions()}
        onValueChange={this.onYearChange}
        isInValid={this.props.isInValid}
      />
    );
  }

  getYearValue() {
    const value = this.getValue();
    if (value) {
      return value.year;
    }
    return undefined;
  }

  getYearSelectorOptions() {
    const res = new Array(11 + 1);
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;
    res[0] = { value: null, text: getTranslation(this.props.language, 'registration.date.year') };
    for (let i = startYear, j = 1; i <= endYear; i++, j++) {
      res[j] = { text: i, value: i };
    }
    return res;
  }

  renderMonthSelector() {
    const monthSelectorId = `${this.props.id}-month`;
    return (
      <Select
        id={monthSelectorId}
        key={monthSelectorId}
        segmentId={this.props.segmentId}
        componentStyle={{ width: 'p50', align: 'right' }}
        value={this.getMonthValue()}
        options={this.getMonthSelectorOptions()}
        onValueChange={this.onMonthChange}
        isInValid={this.props.isInValid}
      />
    );
  }

  getMonthValue() {
    const value = this.getValue();
    if (value) {
      return value.month;
    }
    return undefined;
  }

  getMonthSelectorOptions() {
    const res = new Array(12 + 1);
    res[0] = { value: null, text: getTranslation(this.props.language, 'registration.date.month') };
    for (let i = 1; i <= 12; i++) {
      res[i] = { text: i, value: i };
    }
    return res;
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {this.renderYearSelector()}
        {this.renderMonthSelector()}
        <div className="content-message">
          {this.props.isInValid && this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

CCValidUntil.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  language: React.PropTypes.string,
  value: React.PropTypes.object,
};

export default CCValidUntil;
