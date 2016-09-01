import React from 'react';
import BaseFormElement from './BaseFormElement';
import Select from './Select';
import { getTranslation } from '../Tsl';
import { concat } from 'lodash';
import {
  tenantChanged,
  currentTenantSelected,
  otherTenantSelected,
  tenantSelected,
} from '../../action/registrationActions';

const otherResidencyValue = 'other';

class TenantSelector extends BaseFormElement {
  constructor(props) {
    super(props);
    this.onResidencyElementValueChange = this.onResidencyElementValueChange.bind(this);
  }

  componentDidMount() {
    this.fireOnTenantSelected(this.getResidencyValue());
  }

  fireOnTenantSelected(tenant) {
    this.context.executeAction(tenantSelected, tenant);
  }

  getResidencyValue() {
    return this.props.value || this.props.currentTenant;
  }

  onResidencyElementValueChange(payload) {
    if (payload.value === otherResidencyValue) {
      this.fireOnOtherTenantSelected();
      this.fireOnValueChange(payload);
      this.fireOnTenantSelected(null);
    } else if (payload.value === this.props.currentTenant) {
      this.fireOnCurrentTenantSelected();
      this.fireOnValueChange(payload);
    } else {
      this.fireOnTenantChange(payload.value);
    }
  }

  fireOnValueChange(payload) {
    if (this.props.onValueChange) {
      this.props.onValueChange(payload);
    }
  }

  fireOnTenantChange(value) {
    this.context.executeAction(tenantChanged, { newTenant: value,
      currentTenant: this.props.currentTenant });
  }

  fireOnCurrentTenantSelected() {
    this.context.executeAction(currentTenantSelected, { currentTenant: this.props.currentTenant });
  }

  fireOnOtherTenantSelected() {
    this.context.executeAction(otherTenantSelected, { currentTenant: this.props.currentTenant });
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} tenat-selector input`;
  }

  renderResidencySelector() {
    return (
      <Select
        {...this.props}
        options={this.getResidencyOptions()}
        label={getTranslation(this.props.language, 'registration.tenantselector.residency')}
        value={this.getResidencyValue()}
        onValueChange={this.onResidencyElementValueChange}
      />
    );
  }

  getResidencyOptions() {
    return concat(
      this.props.options || [],
      {
        text: getTranslation(this.props.language, 'registration.tenantselector.other'),
        value: otherResidencyValue,
      }
    );
  }

  render() {
    return (
      <div className={this.getContainerClassName()}
        id={`${this.props.id}-container`}
        ref={`${this.props.id}-container`}
      >
        {this.renderResidencySelector()}
      </div>
    );
  }
}

TenantSelector.contextTypes = {
  executeAction: React.PropTypes.func,
};

TenantSelector.propTypes = {
  id: React.PropTypes.string,
  segmentId: React.PropTypes.any,
  language: React.PropTypes.string,
  options: React.PropTypes.array,
  componentClass: React.PropTypes.string,
  value: React.PropTypes.string,
  currentTenant: React.PropTypes.string,
  onValueChange: React.PropTypes.any,
};

export default TenantSelector;
