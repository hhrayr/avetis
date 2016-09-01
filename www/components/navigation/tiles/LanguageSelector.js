import React from 'react';
import Icon from '../icons/Icon';
import AccordionIcon from '../icons/AccordionIcon';
import LanguageSelectorAccordion from '../helper/LanguageSelectorAccordion';
import environmentConfig from '../../../configs/environment';
import { toggleLanguageSlideoutVisibility } from '../../../action/navigationActions';
import Tsl from '../../Tsl';

const LanguageSelector = (props, context) => {
  const isLanguageAccordionActiveClass = props.isLanguageSlideoutVisible ? 'active' : '';
  return (
    <div>
      <div onClick={ () => { context.executeAction(toggleLanguageSlideoutVisibility); } }
        className={`navbar-mobile-item-container ${isLanguageAccordionActiveClass}`}
      >
        <div className="navbar-mobile-image-icon-container">
          <Icon isActive={props.isLanguageSlideoutVisible}
            iconPath="/assets/images/navigation/"
            defaultIcon="language_black.svg"
            activeIcon="language_white.svg"
          />
          <Tsl id={ `generics.languages.${props.language}` } />
          {props.showAccordionIcon &&
            <AccordionIcon isActive={props.isLanguageSlideoutVisible} />
          }
        </div>
      </div>
      {props.isLanguageSlideoutVisible &&
        <LanguageSelectorAccordion language={props.language}
          content={environmentConfig.availableLanguages}
          currentRouteName={props.currentRouteName}
        />}
    </div>
  );
};

LanguageSelector.contextTypes = {
  executeAction: React.PropTypes.func,
};

LanguageSelector.defaultProps = {
  showAccordionIcon: false,
};

LanguageSelector.propTypes = {
  language: React.PropTypes.string.isRequired,
  currentRouteName: React.PropTypes.string.isRequired,
  showAccordionIcon: React.PropTypes.bool,
  isLanguageSlideoutVisible: React.PropTypes.bool,
};

export default LanguageSelector;
