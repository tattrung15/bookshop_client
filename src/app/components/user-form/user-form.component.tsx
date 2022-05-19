import { useEffect, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Form, useForm } from "@app/hooks/use-form.hook";
import { UpdateUserDto, User } from "@app/models/user.model";
import { Role } from "@app/shared/types/user.type";
import { titleCase } from "@core/helpers/string.helper";
import Controls from "../controls";
import {
  DEFAULT_DATETIME_FORMAT,
  REGEX_PASSWORD,
} from "@app/shared/constants/common";

const initialUserValues: UpdateUserDto = {
  id: 0,
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  address: "",
  username: "",
  password: "",
  cfPassword: "",
  amount: 0,
  roleId: Role.MEMBER,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const roleItems = () => {
  return Object.keys(Role)
    .map((key) => ({
      id: key,
      title: titleCase(Role[key]),
    }))
    .filter((item) => item.id !== Role.GUEST);
};

type PropTypes = {
  isEdit: boolean;
  isView: boolean;
  recordForAction: User;
  addOrEdit: (values: UpdateUserDto, resetForm: () => void) => void;
};

function UserForm(props: PropTypes) {
  const { isEdit, isView, recordForAction, addOrEdit } = props;

  if (recordForAction.id) {
    initialUserValues.id = recordForAction.id;
  }

  const [isShowPassword, setIsShowPassword] = useState(false);

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if (isEdit) {
      temp.password = "";
      temp.cfPassword = "";
    }

    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "Trường này là bắt buộc";
    }
    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "Trường này là bắt buộc";
    }
    if ("address" in fieldValues) {
      temp.address = fieldValues.address ? "" : "Trường này là bắt buộc";
    }
    if ("email" in fieldValues) {
      temp.email = !fieldValues.email
        ? "Trường này là bắt buộc"
        : /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email không hợp lệ";
    }
    if ("phone" in fieldValues) {
      temp.phone =
        fieldValues.phone.length >= 10 ? "" : "Yêu cầu tối thiểu 10 số";
    }
    if ("username" in fieldValues) {
      temp.username = !fieldValues.username
        ? "Trường này là bắt buộc"
        : /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(fieldValues.username)
        ? ""
        : "Tên người dùng chỉ chứa các chữ cái, số và ký tự:. hoặc _";
    }
    if (isEdit) {
      if (fieldValues.password) {
        if ("password" in fieldValues) {
          temp.password = !fieldValues.password
            ? "Trường này là bắt buộc"
            : REGEX_PASSWORD.test(fieldValues.password)
            ? ""
            : "Mật khẩu ít nhất 8 ký tự, ít nhất một chữ cái và một số";
        }
        if ("cfPassword" in fieldValues) {
          temp.cfPassword =
            values.password === fieldValues.cfPassword
              ? ""
              : "Không khớp với mật khẩu";
        }
      }
    } else {
      if ("password" in fieldValues) {
        temp.password = !fieldValues.password
          ? "Trường này là bắt buộc"
          : REGEX_PASSWORD.test(fieldValues.password)
          ? ""
          : "Mật khẩu ít nhất 8 ký tự, ít nhất một chữ cái và một số";
      }
      if ("cfPassword" in fieldValues) {
        temp.cfPassword =
          values.password === fieldValues.cfPassword
            ? ""
            : "Không khớp với mật khẩu";
      }
    }

    setErrors({
      ...temp,
    });

    return fieldValues === values && Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialUserValues, true, validate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  useEffect(() => {
    if ((isView || isEdit) && recordForAction.id) {
      setValues({
        ...recordForAction,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForAction, isView, isEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="Tên"
            value={values.firstName ?? ""}
            error={errors.firstName}
            onChange={handleInputChange}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="lastName"
            label="Họ"
            value={values.lastName ?? ""}
            error={errors.lastName}
            onChange={handleInputChange}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email ?? ""}
            error={errors.email}
            onChange={handleInputChange}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="phone"
            label="Điện thoại"
            value={values.phone ?? ""}
            error={errors.phone}
            onChange={handleInputChange}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="address"
            label="Địa chỉ"
            value={values.address ?? ""}
            error={errors.address}
            onChange={handleInputChange}
            InputProps={{
              readOnly: isView,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="username"
            label="Tên người dùng"
            value={values.username ?? ""}
            onChange={handleInputChange}
            error={errors.username}
            disabled={isView || isEdit}
            InputProps={{
              classes: {
                disabled: "bs-text-black",
              },
            }}
          />
          {!isView && (
            <>
              <Controls.Input
                name="password"
                label="Mật khẩu"
                value={values.password ?? ""}
                onChange={handleInputChange}
                error={errors.password}
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
                label="Nhập lại mật khẩu"
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
            </>
          )}
          <Controls.Select
            name="roleId"
            label="Vai trò"
            value={values.roleId ?? ""}
            onChange={handleInputChange}
            options={roleItems()}
            error={errors.roleId}
            disabled={isView}
            className={clsx({ "bs-text-black": isView })}
          />
          <Controls.Input
            name="amount"
            label="Số tiền"
            value={values.amount ?? ""}
            onChange={handleInputChange}
            error={errors.amount}
            type="number"
            disabled={isView}
            InputProps={{
              inputProps: { min: 0 },
              classes: {
                disabled: "bs-text-black",
              },
            }}
          />
          {isView && (
            <>
              <Controls.Input
                name="createdAt"
                label="Được tạo lúc"
                value={dayjs(values.createdAt).format(DEFAULT_DATETIME_FORMAT)}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="updatedAt"
                label="Được cập nhật lúc"
                value={dayjs(values.updatedAt).format(DEFAULT_DATETIME_FORMAT)}
                InputProps={{
                  readOnly: true,
                }}
              />
            </>
          )}
        </Grid>
        {!isView && (
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
        )}
      </Grid>
    </Form>
  );
}

export default UserForm;
