import React from 'react';
import _ from 'lodash';
import {
  enableFeature,
  disableFeature,
  getFeatureFlags,
  isEnabled,
} from '../../shared/utils/featureFlags';

class Features extends React.Component {
  toggleFeature(feature) {
    return isEnabled(feature) ? disableFeature(feature) : enableFeature(feature);
  }

  render() {
    return (
      <div className="container sub-page">
        <h2>Features</h2>
        <ul className="feature-flags">
          {_.keys(getFeatureFlags()).map((feature, index) => {
            return (
              <li key={index}>
                <input type="checkbox"
                  id={feature}
                  defaultChecked={isEnabled(feature)}
                  onChange={() => {
                    this.toggleFeature(feature);
                  }}
                />
                <label htmlFor={feature}>{feature}</label>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Features;
