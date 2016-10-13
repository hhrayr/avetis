import BaseStore from 'fluxible/addons/BaseStore';
import { forEach, merge, find } from 'lodash';
import buildContactUsForm from './ContactUsFormBuilder';

class FormStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.staticSchemas = {};
  }

  getSchema(formId, language) {
    if (typeof this.staticSchemas[formId] === 'undefined') {
      this.staticSchemas[formId] = this.buildSchema(formId, language);
    }
    return this.staticSchemas[formId];
  }

  buildSchema(formId, language) {
    if (formId.indexOf('contact-us') === 0) {
      return buildContactUsForm(language);
    }
    return null;
  }

  updateSchema(payload) {
    if (typeof this.staticSchemas[payload.formId] !== 'undefined') {
      this.staticSchemas[payload.formId] = payload.schema;
      this.emitChange();
    }
  }

  updateElement(payload) {
    const elementSchema = this.getElementSchema(payload.formId, payload.id, payload.segmentId);
    if (elementSchema) {
      elementSchema.value = payload.value;
      elementSchema.isInValid = payload.isInValid;
      this.emitChange();
    }
  }

  updateElements(payload) {
    forEach(payload.elements, (schema, elementId) => {
      const elementSchema = this.getElementSchema(payload.formId, elementId);
      if (elementSchema) {
        elementSchema.value = schema.value;
        elementSchema.isInValid = schema.isInValid;
      }
    });
    this.emitChange();
  }

  getFormSchema(formId) {
    return this.staticSchemas[formId];
  }

  getElementSchema(formId, elementId, segmentId) {
    const segmentElementSchema = this.getSegmentElementSchema(formId, elementId, segmentId);
    if (segmentElementSchema) {
      return segmentElementSchema.element;
    }
    return null;
  }

  getSegmentElementSchema(formId, elementId, segmentId) {
    let res = null;
    const formSchema = this.staticSchemas[formId];
    if (formSchema) {
      if (segmentId) {
        const segmentSchema = find(formSchema.segments, { id: segmentId });
        if (segmentSchema) {
          res = this.getSegmentElementSchemaFromSegment(segmentSchema, elementId);
        }
      } else {
        forEach(formSchema.segments, (segment) => {
          const elementSchema = this.getSegmentElementSchemaFromSegment(segment, elementId);
          if (elementSchema) {
            res = elementSchema;
            return false;
          }
          return true;
        });
      }
    }
    return res;
  }

  getSegmentElementSchemaFromSegment(segmentSchema, elementId) {
    let res;
    forEach(segmentSchema.elements, (element, index) => {
      if (element.id === elementId) {
        res = {
          segment: segmentSchema,
          element: merge(element, { segmentId: segmentSchema.id }),
          index,
        };
        return false;
      }
      return true;
    });
    return res;
  }

  clearSchema(formId) {
    const clear = (fId, store) => {
      if (typeof store.staticSchemas[fId] !== 'undefined') {
        const storeRef = store;
        delete storeRef.staticSchemas[fId];
        store.emitChange();
      }
    };
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        clear(formId, this);
      }, 300);
    } else {
      clear(formId, this);
    }
  }

  dehydrate() {
    return {
      staticSchemas: this.staticSchemas,
    };
  }

  rehydrate(state) {
    this.staticSchemas = state.staticSchemas;
  }
}

FormStore.storeName = 'FormStore';
FormStore.handlers = {
  FORM_UPDATE_SCHEMA: 'updateSchema',
  FORM_UPDATE_ELEMENT: 'updateElement',
  FORM_UPDATE_ELEMENTS: 'updateElements',
  FORM_CLEAR_SCHEMA: 'clearSchema',
};

export default FormStore;
