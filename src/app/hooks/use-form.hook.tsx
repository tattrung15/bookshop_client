import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(
  initialValues: any,
  validateOnChange = false,
  validate: (value: { [key: string]: any }) => boolean
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = e.target.type === "checkbox" ? e.target.checked : value;
    setValues({
      ...values,
      [name]: newValue,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}
