/* eslint-disable no-unexpected-multiline */
import * as Yup from "yup";
type ValidationArgsType = {
  errorMessage?: string;
  required?: boolean;
};

interface FieldMatchArgsType {
  fieldName: string;
  required?: boolean;
  errorMessages?: {
    requiredError?: string;
    fieldMatchError?: string;
  };
}

// Creating validation schema
const createValidationSchema = (
  args:
    | Record<
        string,
        Yup.StringSchema<
          Yup.Maybe<string | undefined>,
          Yup.AnyObject,
          undefined,
          ""
        >
      >
    | Record<
        number,
        Yup.NumberSchema<
          Yup.Maybe<number | undefined>,
          Yup.AnyObject,
          undefined,
          ""
        >
      >
) => Yup.object(args);

// Schemas validations
const schemaValidation = {
  // Email Validation
  emailValidation: (args?: ValidationArgsType) => {
    const required = args?.required ?? true;
    return Yup.string()
      .test(
        "contains-at",
        "Invalid email format..missing @symbol",
        (value) => !!value && value.includes("@")
      )
      .test(
        "contains-dot-com",
        "Email address must end with (.com, .net, e.t.c )",
        (value) => !!value && value.endsWith(".com")
      )
      .email("Invalid email format")
      .when("$isSubmitting", {
        is: true,
        then: (schema) =>
          required ? schema.required("Email is required") : schema,
      });
  },

  // Required Validation for normal fields
  requiredFieldValidation: (args?: ValidationArgsType) => {
    const required = args?.required ?? true;

    return Yup.string()[required ? "required" : "notRequired"](
      args?.errorMessage ?? "This field is required"
    );
  },

  requiredNumberFieldValidation: (args?: ValidationArgsType) => {
    const required = args?.required ?? true;

    return Yup.number()[required ? "required" : "notRequired"](
      args?.errorMessage ?? "This field is required"
    );
  },

  // Password validation
  passwordValidation: (args?: ValidationArgsType) => {
    const required = args?.required ?? true;
    return Yup.string()
      [required ? "required" : "notRequired"](
        args?.errorMessage ?? "Password is required"
      )
      .min(8, "password must be up to 8 characters");
  },

  // Validating if this field matches another field
  matchFieldValidation: ({
    errorMessages,
    required = true,
    fieldName,
  }: FieldMatchArgsType) =>
    Yup.string()
      [required ? "required" : "notRequired"](
        errorMessages?.requiredError ?? "This field is required"
      )
      .oneOf(
        [Yup.ref(fieldName)],
        errorMessages?.fieldMatchError ?? "Field does not match"
      ),
};

export { schemaValidation, createValidationSchema };
