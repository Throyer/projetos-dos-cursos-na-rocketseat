import { ValidationError } from "yup";

interface CustomErrors {
    [key: string]: string;
}

export const getAllValidationErrors = ({ inner: errors }: ValidationError): CustomErrors => {

    const validations: CustomErrors = {};

    errors.forEach(({ path, message }) => validations[path] = message);

    return validations;
}