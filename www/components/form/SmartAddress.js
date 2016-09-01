import React from 'react';
import BaseFormElement from './BaseFormElement';
import Input from './Input';
import { findAddress, retrieveAddress } from '../../action/registrationActions';
import { forEach } from 'lodash';


class SmartAddress extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.state = {
      list: this.props.list ? this.props.list.items : null,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ list: props.list ? props.list.items : null });
  }

  fireOnValuesChange(payload) {
    if (this.props.onValuesChange) {
      this.props.onValuesChange(payload);
    }
  }

  onInputValueChange(payload) {
    this.setState({ value: payload.value });
    if (payload.value.length > 4) {
      this.context.executeAction(findAddress, {
        searchTerm: payload.value,
        country: this.props.tenant,
        elementId: this.props.id,
      });
    } else {
      this.setState({ list: null });
    }
  }

  onSuggestionItemClick(item) {
    if (item.nextAction === 'Find') {
      this.context.executeAction(findAddress, {
        searchTerm: item.label,
        country: this.props.tenant,
        lastId: item.id,
        elementId: this.props.id,
      });
    } else {
      this.setState({ value: null });
      this.context.executeAction(retrieveAddress, {
        id: item.id,
        elementId: this.props.id,
      });
    }
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} smart-address input`;
  }

  getValue() {
    return this.refs.input.getValue();
  }

  renderSuggestions() {
    if (this.state.list && this.state.list.length > 0) {
      const suggestionItems = [];
      forEach(this.state.list, (item, index) => {
        suggestionItems.push(this.renderSuggestionItem(item, index));
      });
      return (
        <ul className="suggestions">
          { suggestionItems }
        </ul>
      );
    }
    return null;
  }

  renderSuggestionItem(item, index) {
    return (
      <li
        key={`${item.id}-${index}`}
        onClick={() => { this.onSuggestionItemClick(item); }}
      >
        { item.label }
      </li>
    );
  }

  render() {
    const inputId = `${this.props.id}-input`;
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
      <Input
        ref="input"
        key={inputId}
        id={inputId}
        segmentId={this.props.segmentId}
        value={this.state.value}
        label={this.props.label}
        onValueChange={this.onInputValueChange}
        infotext={this.props.infotext}
        disabled={this.props.disabled}
      />
      { this.renderSuggestions() }
      </div>
    );
  }
}

SmartAddress.contextTypes = {
  executeAction: React.PropTypes.func,
};

SmartAddress.propTypes = {
  list: React.PropTypes.object,
};

export default SmartAddress;
