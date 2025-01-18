import { TextFieldProps } from "@mui/material/TextField";
import type { MouseEvent } from "react";

import { forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PasswordFieldProps extends Omit<TextFieldProps, "type" | "endAdornment"> {}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => setShowPassword((show) => !show);
  const handleMousePassword = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <TextField
      ref={ref}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide the password" : "display the password"}
                onClick={handleClick}
                onMouseDown={handleMousePassword}
                onMouseUp={handleMousePassword}
                size="small"
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
});
PasswordField.displayName = "PasswordField";

export default PasswordField;
