import React from 'react';
import BaseFormElement from './BaseFormElement';
import Input from './Input';
import { forEach, find } from 'lodash';


class GoogleAutocomplete extends BaseFormElement {
  componentDidMount() {
    if (this.props.country) {
      this.loadGooglePlugin();
    }
  }

  loadGooglePlugin() {
    if (window.google === undefined) {
      const GoogleMaps = require('google-maps');
      GoogleMaps.CLIENT = 'gme-drivenowgmbhandco';
      GoogleMaps.VERSION = '3.19';
      GoogleMaps.LIBRARIES = ['places'];
      GoogleMaps.LANGUAGE = this.props.language;
      GoogleMaps.load(() => {
        this.setupAutocompletePlugin();
      });
    } else {
      this.setupAutocompletePlugin();
    }
  }

  setupAutocompletePlugin() {
    const inputDomNode = this.getInputDomNode();
    const autocomplete = new window.google.maps.places.Autocomplete(inputDomNode, {
      componentRestrictions: { country: this.props.country },
    });
    inputDomNode.setAttribute('placeholder', '');
    autocomplete.addListener('place_changed', () => {
      this.fillInAddress(autocomplete);
    });
  }

  getInputDomNode() {
    const inputComponent = this.refs.input;
    return inputComponent.refs.input;
  }

  fillInAddress(autocomplete) {
    const place = autocomplete.getPlace();
    const googleAddressComponents = place && place.address_components
      ? place.address_components : null;
    if (googleAddressComponents && googleAddressComponents.length) {
      const updatedElements = {};
      forEach(this.props.fillmap, (addressFieldId, addressComponentsName) => {
        updatedElements[addressFieldId] = null;
        const addressComponentsNames = addressComponentsName.split(',');
        forEach(addressComponentsNames, (googleAddressComponentType) => {
          const googleAddressComponent = find(googleAddressComponents, (adrComp) => {
            return adrComp.types[0] === googleAddressComponentType;
          });
          if (googleAddressComponent) {
            updatedElements[addressFieldId] = addressFieldId !== 'country'
              ? googleAddressComponent.long_name
              : googleAddressComponent.short_name;
            return false;
          }
          return true;
        });
      });
      this.fireOnValuesChange(updatedElements);
    }
  }

  fireOnValuesChange(payload) {
    if (this.props.onValuesChange) {
      this.props.onValuesChange(payload);
    }
  }

  getValue() {
    return this.props.value;
  }

  getContainerClassName() {
    return `${super.getContainerClassName()} input`;
  }

  render() {
    return (
      <Input
        ref="input"
        {...this.props}
      />
    );
  }
}

GoogleAutocomplete.propTypes = {
  onValuesChange: React.PropTypes.func,
  country: React.PropTypes.string,
  fillmap: React.PropTypes.object,
};

export default GoogleAutocomplete;
