import { useState } from "react";
import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Form, useForm } from "@app/hooks/use-form.hook";
import Controls from "../controls";
import { REGEX_PASSWORD } from "@app/shared/constants/common";

const initialUserValues = {
  oldPassword: "",
  newPassword: "",
  cfPassword: "",
};

type PropTypes = {
  changePassword: (oldPassword: string, newPassword: string) => void;
};

function ChangePasswordForm(props: PropTypes) {
  const { changePassword } = props;

  const [isShowPassword, setIsShowPassword] = useState(false);

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("oldPassword" in fieldValues) {
      temp.oldPassword = fieldValues.oldPassword
        ? ""
        : "Trường này là bắt buộc";
    }
    if ("newPassword" in fieldValues) {
      temp.newPassword = !fieldValues.newPassword
        ? "Trường này là bắt buộc"
        : REGEX_PASSWORD.test(fieldValues.newPassword)
        ? ""
        : "Mật khẩu ít nhất 8 ký tự, ít nhất một chữ cái và một số";
    }
    if ("cfPassword" in fieldValues) {
      temp.cfPassword =
        values.newPassword === fieldValues.cfPassword
          ? ""
          : "Không khớp với mật khẩu";
    }

    setErrors({
      ...temp,
    });

    return fieldValues === values && Object.values(temp).every((x) => x === "");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialUserValues, true, validate);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (validate()) {
      changePassword(values.oldPassword, values.newPassword);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Controls.Input
            name="oldPassword"
            label="Mật khẩu cũ"
            value={values.oldPassword ?? ""}
            onChange={handleInputChange}
            error={errors.oldPassword}
            type={isShowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Controls.Input
            name="newPassword"
            label="Mật khẩu mới"
            value={values.newPassword ?? ""}
            onChange={handleInputChange}
            error={errors.newPassword}
            type={isShowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Controls.Input
            name="cfPassword"
            label="Nhập lại mật khẩu mới"
            value={values.cfPassword ?? ""}
            onChange={handleInputChange}
            error={errors.cfPassword}
            type={isShowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1em" }}>
          <div style={{ textAlign: "center" }}>
            <Controls.Button type="submit" text="Gửi đi" />
            <Controls.Button
              text="Đặt lại"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

export default ChangePasswordForm;
