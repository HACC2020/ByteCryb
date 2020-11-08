import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

function JSONBridge(schema) {
  const schemaValidator = createValidator(schema);
  return new JSONSchemaBridge(schema, schemaValidator);
}

export { JSONBridge }

// export const bridge = new JSONSchemaBridge(schema, schemaValidator);
