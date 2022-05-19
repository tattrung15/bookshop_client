import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { Form, useForm } from "@app/hooks/use-form.hook";
import { Category } from "@app/models/category.model";
import { Product, UpdateProductDto } from "@app/models/product.model";
import { DEFAULT_DATETIME_FORMAT } from "@app/shared/constants/common";
import { titleCase } from "@core/helpers/string.helper";
import Controls from "../controls";

const initialProductValues: UpdateProductDto = {
  id: 0,
  title: "",
  longDescription: "",
  price: 0,
  author: "",
  currentNumber: 0,
  numberOfPage: 0,
  quantityPurchased: 0,
  categoryId: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

type PropTypes = {
  isEdit: boolean;
  isView: boolean;
  recordForAction: Product;
  addOrEdit: (values: UpdateProductDto, resetForm: () => void) => void;
  categories: Category[];
};

function ProductForm(props: PropTypes) {
  const { isEdit, isView, recordForAction, addOrEdit, categories } = props;

  if (recordForAction.id) {
    initialProductValues.id = recordForAction.id;
  }

  const categoryItems = () => {
    return categories.map((item) => ({
      id: item.id,
      title: titleCase(item.name),
    }));
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("title" in fieldValues) {
      temp.title =
        fieldValues.title.trim() !== "" ? "" : "Trường này là bắt buộc";
    }

    if ("longDescription" in fieldValues) {
      temp.longDescription =
        fieldValues.longDescription.trim() !== ""
          ? ""
          : "Trường này là bắt buộc";
    }

    if ("author" in fieldValues) {
      temp.author =
        fieldValues.author.trim() !== "" ? "" : "Trường này là bắt buộc";
    }

    if ("price" in fieldValues) {
      temp.price = fieldValues.price > 0 ? "" : "Trường này phải lớn hơn 0";
    }

    if ("currentNumber" in fieldValues) {
      temp.currentNumber =
        fieldValues.currentNumber >= 0 ? "" : "Trường này phải lớn hơn 0";
    }

    if ("numberOfPage" in fieldValues) {
      temp.numberOfPage =
        fieldValues.numberOfPage > 0 ? "" : "Trường này phải lớn hơn 0";
    }

    setErrors({
      ...temp,
    });

    return fieldValues === values && Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialProductValues, true, validate);

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
            name="title"
            label="Tiêu đề"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="longDescription"
            label="Mô tả"
            multiline
            maxRows={8.5}
            value={values.longDescription}
            onChange={handleInputChange}
            error={errors.longDescription}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="price"
            label="Giá"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="author"
            label="Tác giả"
            value={values.author}
            onChange={handleInputChange}
            error={errors.author}
            InputProps={{
              inputProps: { min: 0 },
              readOnly: isView,
            }}
          />
          {isView && (
            <Controls.Select
              name="categoryId"
              label="Danh mục"
              value={values.categoryId ? values.categoryId : ""}
              onChange={handleInputChange}
              options={categoryItems()}
              error={errors.categoryId}
              disabled={isView}
              className={clsx({ "bs-text-black": isView })}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="currentNumber"
            label="Số lượng còn"
            value={values.currentNumber}
            onChange={handleInputChange}
            error={errors.currentNumber}
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              readOnly: isView,
            }}
          />
          <Controls.Input
            name="numberOfPage"
            label="Số trang"
            value={values.numberOfPage}
            onChange={handleInputChange}
            error={errors.numberOfPage}
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              readOnly: isView,
            }}
          />
          {isView && (
            <Controls.Input
              name="quantityPurchased"
              label="Số lượng đã mua"
              value={values.quantityPurchased}
              disabled
              InputProps={{
                readOnly: isView,
                classes: {
                  disabled: "bs-text-black",
                },
              }}
            />
          )}
          {!isView && (
            <Controls.Select
              name="categoryId"
              label="Danh mục"
              value={values.categoryId ? values.categoryId : ""}
              onChange={handleInputChange}
              options={categoryItems()}
              error={errors.categoryId}
              disabled={isView}
              className={clsx({ "bs-text-black": isView })}
            />
          )}
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

export default ProductForm;
