import React, { useEffect } from "react";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { Form, useForm } from "@app/hooks/use-form.hook";
import { Category, UpdateCategoryDto } from "@app/models/category.model";
import { DEFAULT_DATETIME_FORMAT } from "@app/shared/constants/common";
import Controls from "../controls";
import { titleCase } from "@core/helpers/string.helper";

const initialCategoryValues: UpdateCategoryDto = {
  id: 0,
  name: "",
  description: "",
  isAuthor: false,
  parentCategoryId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

type PropTypes = {
  isEdit: boolean;
  isView: boolean;
  recordForAction: Category;
  addOrEdit: (values: UpdateCategoryDto, resetForm: () => void) => void;
  categories: Category[];
};

function CategoryForm(props: PropTypes) {
  const { isEdit, isView, recordForAction, addOrEdit, categories } = props;

  const categoryItems = () => {
    return categories
      .filter((item) => !item.parentCategory)
      .map((item) => ({
        id: item.id,
        title: titleCase(item.name),
      }))
      .filter((item) => (isEdit ? item.id !== recordForAction.id : true));
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("name" in fieldValues) {
      temp.name =
        fieldValues.name.trim() !== "" ? "" : "Trường này là bắt buộc";
    }

    setErrors({
      ...temp,
    });

    return fieldValues === values && Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialCategoryValues, true, validate);

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
        <Grid
          item
          xs={isView ? 6 : 12}
          style={{ textAlign: isView ? "left" : "center" }}
        >
          <Controls.Input
            name="name"
            label="Tên"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="description"
            label="Mô tả"
            multiline
            maxRows={8}
            disabled={isView}
            value={values.description}
            error={errors.description}
            onChange={handleInputChange}
            InputProps={{
              readOnly: isView,
              classes: {
                disabled: "bs-text-black",
              },
            }}
          />
          <Controls.Select
            name="parentCategoryId"
            label="Danh mục cha"
            value={values.parentCategoryId ? values.parentCategoryId : ""}
            onChange={handleInputChange}
            options={categoryItems()}
            error={errors.parentCategoryId}
            disabled={isView}
            className={clsx({ "bs-text-black": isView })}
            style={{ textAlign: "left" }}
          />
        </Grid>
        <Grid
          item
          xs={isView ? 6 : 12}
          style={{ textAlign: isView ? "left" : "center" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={values.isAuthor}
                name="isAuthor"
                onChange={handleInputChange}
                color="primary"
                disabled={isView}
                className="bs-color-primary"
              />
            }
            label={<span className="bs-text-black">Là tác giả</span>}
          />
          {isView && (
            <>
              <Controls.Input
                name="createdAt"
                label="Được tạo lúc"
                value={dayjs(values.createdAt).format(DEFAULT_DATETIME_FORMAT)}
                InputProps={{
                  readOnly: isView,
                }}
              />
              <Controls.Input
                name="updatedAt"
                label="Được cập nhật lúc"
                value={dayjs(values.updatedAt).format(DEFAULT_DATETIME_FORMAT)}
                InputProps={{
                  readOnly: isView,
                }}
              />
            </>
          )}
        </Grid>
        {!isView && (
          <Grid item xs={12}>
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

export default CategoryForm;
