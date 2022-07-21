import TextField from "@mui/material/TextField";
export const Input = ({ ...props }, ref) => {
  return <TextField margin="normal" required fullWidth {...props} autoFocus />;
};
