import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema: object) {

  let validator = '';

  try {
    validator = ajv.compile(schema);
  } catch (e) {
    return [false, e];
  }

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

function JSONBridge(schema) {
  const schemaValidator = createValidator(schema);
  if (schemaValidator[0] === false) {
    return schemaValidator;
  }
  return new JSONSchemaBridge(schema, schemaValidator);
}

export { JSONBridge }

// export const bridge = new JSONSchemaBridge(schema, schemaValidator);
