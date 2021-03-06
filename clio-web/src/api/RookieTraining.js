import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Rookie',
  type: 'object',
  properties: {
    name: { type: 'string'},
    age: { type: 'string'},
    gender: { type: 'string'},
    residence: { type: 'string'},
    dateOfArrival: {
      type: "string",
    },
    nameOfShip: { type: 'string'},
    from: { type: 'string' },

  },
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
