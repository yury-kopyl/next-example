import TextField, {TextFieldProps} from "@mui/material/TextField";

export default function Input(props: TextFieldProps) {
  const {...other} = props;
  return (
    <TextField
      {...other}
      variant="outlined"
    />
  );
}
