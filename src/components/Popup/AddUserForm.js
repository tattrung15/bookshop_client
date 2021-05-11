import React, { useState, useEffect } from "react";
import moment from "moment";

import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/Popup/UseForm";

const roleItems = () => [
  { id: "ADMIN", title: "Admin" },
  { id: "MEMBER", title: "Member" },
];

const initialFValues = {
  id: 0,
  lastName: "",
  firstName: "",
  email: "",
  mobile: "",
  address: "",
  username: "",
  password: "",
  cfPassword: "",
  amount: 0,
  roleId: "MEMBER",
  createAt: "",
  updateAt: "",
};

export default function AddUserForm(props) {
  const { addOrEdit, recordForEdit, isEdit, isView } = props;

  const [showPassword, setShowPassword] = useState(false);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if (isEdit) {
      temp.password = "";
      temp.cfPassword = "";
    }

    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "This field is required";
    }
    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "This field is required";
    }
    if ("address" in fieldValues) {
      temp.address = fieldValues.address ? "" : "This field is required";
    }
    if ("email" in fieldValues) {
      temp.email = !fieldValues.email
        ? "This field is required"
        : /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    }
    if ("mobile" in fieldValues) {
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required";
    }
    if ("username" in fieldValues) {
      temp.username = !fieldValues.username
        ? "This field is required"
        : /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(fieldValues.username)
        ? ""
        : "Username contains only letters, numbers and characters: . or _";
    }
    if (isEdit) {
      if (fieldValues.password) {
        if ("password" in fieldValues) {
          temp.password = !fieldValues.password
            ? "This field is required"
            : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_]{8,}$/.test(
                fieldValues.password
              )
            ? ""
            : "Password at least 8 characters, at least one letter and one number";
        }
        if ("cfPassword" in fieldValues) {
          temp.cfPassword =
            values.password === fieldValues.cfPassword
              ? ""
              : "Doesn't match the password";
        }
      }
    } else {
      if ("password" in fieldValues) {
        temp.password = !fieldValues.password
          ? "This field is required"
          : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_]{8,}$/.test(
              fieldValues.password
            )
          ? ""
          : "Password at least 8 characters, at least one letter and one number";
      }
      if ("cfPassword" in fieldValues) {
        temp.cfPassword =
          values.password === fieldValues.cfPassword
            ? ""
            : "Doesn't match the password";
      }
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      if (validate()) {
        addOrEdit(values, resetForm);
      }
      return;
    }
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        {isView ? (
          <Grid item xs={6}>
            <Controls.Input
              name="firstName"
              label="First Name"
              value={values.firstName}
              error={errors.firstName}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controls.Input
              name="lastName"
              label="Last Name"
              value={values.lastName}
              error={errors.lastName}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              error={errors.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controls.Input
              label="Mobile"
              name="mobile"
              value={values.mobile}
              error={errors.mobile}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controls.Input
              label="Address"
              name="address"
              value={values.address}
              error={errors.address}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={6}>
            <Controls.Input
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
            />
            <Controls.Input
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
            />
            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Controls.Input
              label="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              error={errors.mobile}
            />
            <Controls.Input
              label="Address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              error={errors.address}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          {isEdit ? (
            <>
              <Controls.Input
                name="username"
                label="Username"
                value={values.username}
                onChange={handleInputChange}
                error={errors.username}
                disabled
              />
              <Controls.Input
                name="password"
                label="Password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Controls.Input
                name="cfPassword"
                label="Confirm password"
                value={values.cfPassword}
                onChange={handleInputChange}
                error={errors.cfPassword}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Controls.Select
                name="roleId"
                label="Role"
                value={values.roleId}
                onChange={handleInputChange}
                options={roleItems()}
                error={errors.roleId}
              />
              <Controls.Input
                name="amount"
                label="Amount"
                value={values.amount}
                onChange={handleInputChange}
                error={errors.amount}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </>
          ) : isView ? (
            <>
              <Controls.Input
                name="username"
                label="Username"
                value={values.username}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="roleId"
                label="Role"
                value={values.roleId}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="amount"
                label="Amount"
                value={values.amount}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="createAt"
                label="Create At"
                value={moment(values.createAt).format("DD/MM/YYYY HH:mm:ss")}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="updateAt"
                label="Update At"
                value={moment(values.updateAt).format("DD/MM/YYYY HH:mm:ss")}
                InputProps={{
                  readOnly: true,
                }}
              />
            </>
          ) : (
            <>
              <Controls.Input
                name="username"
                label="Username"
                value={values.username}
                onChange={handleInputChange}
                error={errors.username}
              />
              <Controls.Input
                name="password"
                label="Password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Controls.Input
                name="cfPassword"
                label="Confirm password"
                value={values.cfPassword}
                onChange={handleInputChange}
                error={errors.cfPassword}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Controls.Select
                name="roleId"
                label="Role"
                value={values.roleId}
                onChange={handleInputChange}
                options={roleItems()}
                error={errors.roleId}
              />
              <Controls.Input
                name="amount"
                label="Amount"
                value={values.amount}
                onChange={handleInputChange}
                error={errors.amount}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </>
          )}
        </Grid>
        {!isView && (
          <Grid item xs={12}>
            <div style={{ textAlign: "center" }}>
              <Controls.Button type="submit" text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </Form>
  );
}
