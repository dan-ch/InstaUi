import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import { PasswordInput } from "components/PasswordInput";
import { TextInput } from "components/TextInput";
import { signUpData } from "models/Authentication";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { signUpSchema } from "./ValidationSchema";
import "App.scss";
import { useDispatch } from "react-redux";
import { signUp } from "store/actions/authActions";
import {Link} from "react-router-dom";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const action = useDispatch();
  const methods = useForm<signUpData>({
    resolver: yupResolver(signUpSchema),
  });
  const [password, confirmedPassword] = methods.watch(['password' ,'password_confirmation']);
  const onSubmit = (data: signUpData) => {
    action(signUp(data));
  };
  return (
    <div className="auth__wrapper">
      <div className="auth__header">
        <h1>Sign up</h1>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form form-sign-up"
        >
          <TextInput
            label="Username"
            name="name"
            placeholder="Username"
            type="text"
            variant="outlined"
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="email@email.com"
            type="email"
            variant="outlined"
          />
          <PasswordInput label="Password" name="password" variant="outlined" />
          <PasswordInput
            label="Confirm Password"
            name="password_confirmation"
            variant="outlined"
          />
          {password !== undefined && password === confirmedPassword ? <Button type="submit" variant="contained">
            Sign up
          </Button> : <Button type="submit" variant="contained" disabled>
            Sign up
          </Button>}
        </form>
      </FormProvider>

      <span className="auth__footer">
        <p>Already have an account? </p>
        <Link to="/signin" className="sign-in__footer__link">Sign in</Link>
      </span>
    </div>
  );
};
