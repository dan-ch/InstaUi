import TextField from "@mui/material/TextField";
import React from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  variant: "standard" | "filled" | "outlined";
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  type,
  variant,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      {...register(name)}
      label={label}
      name={name}
      placeholder={placeholder}
      fullWidth
      type={type}
      color="primary"
      variant={variant}
      error={!!errors[name]}
      helperText={errors[name] ? errors[name]?.message : ""}
    />
  );
};
