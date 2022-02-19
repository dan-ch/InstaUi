import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import React, {useState} from "react";
import {useFormContext} from "react-hook-form";

interface PasswordInputProps {
  label: string;
  name: string;
  variant: "standard" | "filled" | "outlined";
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  variant,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggle = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      {...register(name)}
      label={label}
      name={name}
      fullWidth
      type={showPassword ? "text" : "password"}
      color="primary"
      variant={variant}
      error={!!errors[name]}
      helperText={errors[name] ? errors[name]?.message : ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={toggle}>
              {showPassword ? (
                <VisibilityIcon style={{ fill: "#989898" }} />
              ) : (
                <VisibilityOffIcon style={{ fill: "#989898" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
