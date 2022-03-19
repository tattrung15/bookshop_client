import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export default function Select(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    disabled = false,
    ...other
  } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        disabled={disabled}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
