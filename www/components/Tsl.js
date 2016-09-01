import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import i18n from '../../shared/utils/i18n';
import { template } from 'lodash';

const defaultInterpolatePattern = /{([\s\S]+?)}/g;

export function getTranslation(language, id, interpolate, interpolatePattern) {
  let res = i18n(language, id);
  if (interpolate) {
    res = template(res, {
      interpolate: interpolatePattern || defaultInterpolatePattern,
    })(interpolate);
  }
  return res;
}

let Tsl = (props) => {
  return (
    <span>
      {
        getTranslation(
          props.language,
          props.id,
          props.interpolate,
          props.interpolatePattern
        )
      }
    </span>
  );
};

Tsl.defaultProps = {
  interpolatePattern: defaultInterpolatePattern,
};

Tsl.propTypes = {
  id: React.PropTypes.string,
  interpolate: React.PropTypes.object,
  interpolatePattern: React.PropTypes.object,
  language: React.PropTypes.string,
};

Tsl = connectToStores(Tsl, ['EnvironmentStore'], (component) => {
  return {
    language: component.getStore('EnvironmentStore').getLanguage(),
  };
});

export default Tsl;
