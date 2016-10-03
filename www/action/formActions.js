import { isSchemaElementValid } from '../utils/schemaElementValidation';
import { trackDevEvent } from '../utils/tracking';
import { merge } from 'lodash';

function jumpToElement(elementId) {
  const element = document.getElementById(`${elementId}-container`);
  const offsetTop = element && element.parentNode.offsetTop;
  if (offsetTop > 0) {
    window.scrollTo(0, offsetTop - 20);
  }
  trackDevEvent({
    category: 'form',
    action: 'jumpToInvalidElement',
    label: elementId,
  });
}

function getElementDomNode(elementId) {
  return document.getElementById(`${elementId}-container`);
}

function getElementValidationSchema(elementSchema) {
  const res = merge({}, elementSchema.validation);
  const elementDomeNode = getElementDomNode(elementSchema.id);
  if (elementDomeNode && elementDomeNode.getAttribute('required') !== null) {
    res.required = true;
  }
  switch (elementSchema.type) {
    case 'date': {
      res.pattern = 'date';
      res.inFuture = elementSchema.inFuture;
      res.maxYearsInFuture = elementSchema.maxYearsInFuture;
      break;
    }
    case 'payment': {
      res.pattern = 'payment';
      break;
    }
    default: break;
  }
  return res;
}

export function validateAllElements(context, payload) {
  let firstInValid;
  payload.schema.segments.forEach(segment => {
    segment.elements.forEach(element => {
      const elementSchema = element;
      const isInValid = !element.isValidated && getElementDomNode(elementSchema.id) &&
        !isSchemaElementValid(
          getElementValidationSchema(elementSchema),
          elementSchema.value
        );
      elementSchema.isInValid = isInValid;
      if (!firstInValid && isInValid) {
        firstInValid = elementSchema;
      }
    });
  });
  if (firstInValid) {
    jumpToElement(firstInValid.id);
    context.dispatch('FORM_VALIDATE_ALL_ELEMENTS', payload);
  }

  return !firstInValid;
}

export function updateElement(context, payload, done) {
  context.dispatch('FORM_UPDATE_ELEMENT', payload);
  done();
}

export function updateElements(context, payload, done) {
  context.dispatch('FORM_UPDATE_ELEMENTS', payload);
  done();
}

export function removeElementError(context, payload, done) {
  const elementSchema = payload;
  elementSchema.isInValid = false;
  context.dispatch('FORM_UPDATE_ELEMENT', elementSchema);
  done();
}

export function validateElement(context, payload, done) {
  const elementSchema = payload;
  elementSchema.isInValid = !isSchemaElementValid(
    elementSchema.validation,
    elementSchema.value
  );
  context.dispatch('FORM_UPDATE_ELEMENT', elementSchema);
  done();
}

export function clearSchema(context, formId, done) {
  context.dispatch('FORM_CLEAR_SCHEMA', formId);
  done();
}
