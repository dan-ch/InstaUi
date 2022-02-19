import React, {useState} from 'react';
import {PasswordInput} from "./PasswordInput";
import Button from "@mui/material/Button";
import {FormProvider, useForm} from "react-hook-form";
import {passwordResetData} from "../models/Authentication";
import {yupResolver} from "@hookform/resolvers/yup";
import {passwordSchema, signUpSchema} from "../pages/auth/ValidationSchema";
import {useDispatch} from "react-redux";
import {passwordReset} from "store/actions/authActions";

interface ResetPasswordDialogProps {

}

export const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = () => {
    const methods = useForm<passwordResetData>({
        resolver: yupResolver(passwordSchema),
    });
    const [password, confirmedPassword] = methods.watch(['password' ,'password_confirmation']);
    const action = useDispatch();

    const onSubmit = (data: passwordResetData) => {
        console.log("ebeebe");
        action(passwordReset(data));
    };

  return (
       <section className="reset">
           <h1>Change your password</h1>
           <FormProvider {...methods}>
               <form
                   onSubmit={methods.handleSubmit(onSubmit)}
                   className="reset__form reset__form--edit-password"
               >

                   <PasswordInput label="New password" name="password" variant="outlined" />
                   <PasswordInput
                       label="Confirm Password"
                       name="password_confirmation"
                       variant="outlined"
                   />
                   {password !== undefined && password === confirmedPassword ? <Button type="submit" variant="contained">
                       Change password
                   </Button> : <Button type="submit" variant="contained" disabled >
                       Change password
                   </Button>}

               </form>
           </FormProvider>
       </section>
  );
 }