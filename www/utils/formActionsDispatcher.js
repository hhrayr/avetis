import { forEach, camelCase } from 'lodash';
import proxy from './proxy';

const roxyConfigs = {
  'contact-us': (payload) => {
    return proxy.sendContactUsEmail(payload);
  },
};

function extractFormData(formSchema) {
  const res = {};
  forEach(formSchema.segments, (segment) => {
    forEach(segment.elements, (element) => {
      if (element.id && element.value) {
        res[camelCase(element.id)] = element.value;
      }
    });
  });
  return res;
}

export default (payload) => {
  return roxyConfigs[payload.formId](extractFormData(payload.schema));
};
