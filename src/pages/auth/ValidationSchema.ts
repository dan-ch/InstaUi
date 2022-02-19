import * as yup from "yup";

const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;

const passwordConfirmationValidation = yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short")
    .max(15, "Password is too long")
    .matches(REGEX_PASSWORD, "Password does not meet requirements.");

const passwordValidation = yup
    .string()
    .required("You need to confirm your password")
    .min(6, "Password is too short")
    .max(15, "Password is too long")
    .matches(REGEX_PASSWORD, "Password does not meet requirements.");

const validationCredentials = {
  email: yup.string().email("Invalid email").required("Email is required"),
  password: passwordValidation,
};

export const passwordSchema = yup.object().shape({
  password: passwordValidation,
  password_confirmation: passwordConfirmationValidation
      });

export const signUpSchema = yup.object().shape({...validationCredentials,  password_confirmation: passwordConfirmationValidation,
  name: yup.string()
      .required("Name required")
      .min(6, "Name is too short")
      .max(15, "Name is too long"
)});

export const signInSchema = yup.object().shape(validationCredentials);