import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string; //isso que o campo key seja qualquer coisa, assim podemos ter N parametros de tipagem
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
