import React from 'react';
import BaseFormElement from './BaseFormElement';
import Select from './Select';
import { getTranslation } from '../Tsl';
import { isNumeric } from '../../../shared/utils/validation';

class DateElement extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onYearChange = this.onYearChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    if (this.props.value) {
      this.state = {
        year: this.props.value.year,
        month: this.props.value.month,
        day: this.props.value.day,
      };
    }
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      this.setState({
        year: props.value.year,
        month: props.value.month,
        day: props.value.day,
      });
    }
  }

  onYearChange(payload) {
    this.setState({ year: this.getDatePartNumricValue(payload.value) }, () => {
      this.fireOnValueChange();
    });
  }

  onMonthChange(payload) {
    this.setState({ month: this.getDatePartNumricValue(payload.value) }, () => {
      this.fireOnValueChange();
    });
  }

  onDayChange(payload) {
    this.setState({ day: this.getDatePartNumricValue(payload.value) }, () => {
      this.fireOnValueChange();
    });
  }

  getDatePartNumricValue(value) {
    if (isNumeric(value)) {
      return parseInt(value, 10);
    }
    return null;
  }

  fireOnValueChange() {
    if (this.props.onValueChange) {
      this.props.onValueChange({
        id: this.props.id,
        segmentId: this.props.segmentId,
        value: this.getValue(),
      });
    }
  }

  getValue() {
    return {
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
    };
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} date input`;
  }

  renderDatePartElements() {
    return this.props.order.map((order, index) => {
      return this.renderDateElement(this.buildDateElementSchema(order, index));
    });
  }

  renderDateElement(elementSchema) {
    return (
      <Select
        {...elementSchema}
      />
    );
  }

  buildDateElementSchema(datePart, index) {
    const elementId = `${this.props.id}-${datePart}`;
    const res = {
      ref: datePart,
      id: elementId,
      key: elementId,
      componentStyle: {
        width: 'p33',
        align: index ? 'right' : null,
      },
      value: this.state ? this.state[datePart] : undefined,
      options: this.getDatePartOptions(datePart),
      onValueChange: this.getDatePartOnChangeHandler(datePart),
      isInValid: this.props.isInValid,
      disabled: this.props.disabled,
    };
    return res;
  }

  getDatePartOptions(datePart) {
    switch (datePart) {
      case 'year': return this.getYearOptions();
      case 'month': return this.getMonthOptions();
      case 'day': return this.getDayOptions();
      default: return null;
    }
  }

  getYearOptions() {
    const startYear = this.getCurrentYear();
    const endYear = this.getEndYear();
    const num = Math.abs(endYear - startYear);
    const res = new Array(num + 1);
    res[0] = { value: null, text: this.getDatePartOptionsPlaceholder('year') };
    if (endYear >= startYear) {
      for (let i = startYear, j = 1; i <= endYear; i++, j++) {
        res[j] = { text: i, value: i };
      }
    } else {
      for (let i = startYear, j = 1; i >= endYear; i--, j++) {
        res[j] = { text: i, value: i };
      }
    }
    return res;
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getEndYear() {
    const current = this.getCurrentYear();
    if (this.props.inFuture) {
      return current + (this.props.maxYearsInFuture || 0);
    }
    return this.props.minYear;
  }

  getMonthOptions() {
    return this.getStaticDatePartOptions(12, 'month');
  }

  getDayOptions() {
    return this.getStaticDatePartOptions(31, 'day');
  }

  getStaticDatePartOptions(num, datePart) {
    const res = new Array(num + 1);
    res[0] = { value: null, text: this.getDatePartOptionsPlaceholder(datePart) };
    for (let i = 1; i < res.length; i++) {
      res[i] = { text: i, value: i };
    }
    return res;
  }

  getDatePartOptionsPlaceholder(datePart) {
    return getTranslation(this.props.language, `registration.date.${datePart}`);
  }

  getDatePartOnChangeHandler(datePart) {
    switch (datePart) {
      case 'year': return this.onYearChange;
      case 'month': return this.onMonthChange;
      case 'day': return this.onDayChange;
      default: return null;
    }
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <div className="date-elements">
          {this.renderDatePartElements()}
        </div>
        <div className="content-message">
          {this.props.isInValid && this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

DateElement.defaultProps = {
  order: ['day', 'month', 'year'],
  maxYearsInFuture: 50,
  minYear: 1900,
};

DateElement.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  language: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  value: React.PropTypes.object,
  order: React.PropTypes.array,
  inFuture: React.PropTypes.bool,
  maxYearsInFuture: React.PropTypes.number,
  onValueChange: React.PropTypes.any,
  minYear: React.PropTypes.number,
};

export default DateElement;
