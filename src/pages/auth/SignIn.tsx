import {yupResolver} from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import "App.scss";
import {PasswordInput} from "components/PasswordInput";
import {TextInput} from "components/TextInput";
import {signInData} from "models/Authentication";
import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store";
import {signIn, signInSocial} from "store/actions/authActions";
import {signInSchema} from "./ValidationSchema";
import {Link} from "react-router-dom";
import GoogleLogin from 'react-google-login';
// @ts-ignore
import LoginGithub from 'react-login-github';

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => {
    const {authLoading} = useSelector((state:RootState) => state.auth);
  const action = useDispatch();
  const methods = useForm<signInData>({
    resolver: yupResolver(signInSchema),
  });
  const onSubmit = (data: signInData) => {
    action(signIn(data));
  };

  const responseGoogle = (response: any) => {
    action(signInSocial(response.accessToken, "google"));
  }

  const onSuccess = async (response: any) => {
    action(signInSocial(response.code, "github"));
  }

  const onFailure = (response: any) => console.error(response);

  return (
    <div className="auth__wrapper">
      <div className="auth__header">
        <h1>Log in</h1>
        <p>Sign up with one of following options.</p>
      </div>
      <div className="social-auth-container">
        <GoogleLogin
            className="social-auth-container-button"
            clientId="943857804982-okau4ko9qn2harjiv75if0mt57o99j3e.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            buttonText="Google"
            tag='button'
            render={renderProps => (
                <button className="social-auth-container-button social-auth-container-button-google"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                  <i className="fab fa-google  social-auth-container-button-icon" /></button>
            )}
            icon={false}

            cookiePolicy={'single_host_origin'}
        />
        <LoginGithub clientId="cef6e2a53464bfd04904"
                     className="social-auth-container-button social-auth-container-button-github"
                     scope={'user:email'}
                     onSuccess={onSuccess}
                     buttonText={<i className="fab fa-github social-auth-container-button-icon"/>}
                     onFailure={onFailure}/>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="form form-sign-in"
        >
          <TextInput
            label="Email"
            name="email"
            placeholder="email@email.com"
            type="email"
            variant="outlined"
          />
          <PasswordInput label="Password" name="password" variant="outlined" />
          {authLoading ? (
            <Button variant="outlined" color="primary" disabled>
                Loading...
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Sign In
            </Button>
          )}


        </form>
        <div className="auth__footer">
        <p>Don't have an account? </p>
        <Link to="/signup">Sign up</Link>
      </div>
      </FormProvider>
    </div>
  );
};
