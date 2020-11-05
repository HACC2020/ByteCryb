import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Rookie',
  type: 'object',
  properties: {
    name: { type: 'string', pattern: "^([a-zA-Z])+$"},
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
    gender: { type: 'string', pattern: "^([a-zA-Z])+$"},
    residence: { type: 'string', pattern: "^([a-zA-Z])+$"},
    dateOfArrival: {
      type: "string",
      pattern: "(\\d{2}\\/\\d{2}\\/\\d{4})",
    },
    nameOfShip: { type: 'string', pattern: "^([a-zA-Z])+$"},
    from: { type: 'string', pattern: "^([a-zA-Z])+$"},

  },
  // required: ['from'],
  required: ['name', 'age', 'gender', 'residence', 'nameOfShip', 'from', 'dateOfArrival'],
};

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: object) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);
