import React from 'react';
import { map } from 'lodash';
import NavLink from '../../modules/links/NavLink';
import { closeMobileNavigation } from '../../../action/navigationActions';
import Translation from '../../Tsl';

const LanguageSelectorAccordion = (props, context) => {
  const AccordionElements = map(props.content, (element, i) => {
    const isCurrentLanguage = element === props.language;
    return (
      <div key={i} className={
          `navbar-mobile-item-container sub-item ${isCurrentLanguage ? 'active' : ''}`
        }
        onClick={ () => { context.executeAction(closeMobileNavigation); } }
      >
        <NavLink routeName={props.currentRouteName} overwriteLanguage={element}>
          <Translation id={`generics.languages.${element}`}
            language={props.language}
          />
        </NavLink>
      </div>
    );
  });
  return (
    <div className="navbar-mobile-accordion">{ AccordionElements }</div>
  );
};

LanguageSelectorAccordion.propTypes = {
  content: React.PropTypes.array.isRequired,
  language: React.PropTypes.string.isRequired,
  currentRouteName: React.PropTypes.string.isRequired,
};

LanguageSelectorAccordion.contextTypes = {
  executeAction: React.PropTypes.func,
};

export default LanguageSelectorAccordion;
