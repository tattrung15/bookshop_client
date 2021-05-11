import React, { useEffect } from "react";
import moment from "moment";

import { Grid } from "@material-ui/core";

import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/Popup/UseForm";

const initialFValues = {
  id: 0,
  title: "",
  longDescription: "",
  price: 0,
  author: "",
  currentNumber: 0,
  numberOfPage: 0,
  quantityPurchased: 0,
  createAt: "",
  updateAt: "",
  categoryId: 0,
};

export default function AddProductForm(props) {
  const { addOrEdit, recordForEdit, isEdit, isView, categories } = props;

  if (categories.length !== 0) {
    initialFValues.categoryId = categories[0].id;
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("title" in fieldValues) {
      temp.title =
        fieldValues.title.trim() !== "" ? "" : "This field is required";
    }

    if ("longDescription" in fieldValues) {
      temp.longDescription =
        fieldValues.longDescription.trim() !== ""
          ? ""
          : "This field is required";
    }

    if ("author" in fieldValues) {
      temp.author =
        fieldValues.author.trim() !== "" ? "" : "This field is required";
    }

    if ("price" in fieldValues) {
      temp.price =
        fieldValues.price > 0 ? "" : "This field must be greater than 0";
    }

    if ("currentNumber" in fieldValues) {
      temp.currentNumber =
        fieldValues.currentNumber >= 0
          ? ""
          : "This field must be greater than 0";
    }

    if ("numberOfPage" in fieldValues) {
      temp.numberOfPage =
        fieldValues.numberOfPage > 0 ? "" : "This field must be greater than 0";
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
              name="title"
              label="Title"
              value={values.title}
              error={errors.title}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controls.Input
              name="longDescription"
              label="Long Description"
              multiline
              rowsMax={8.5}
              value={values.longDescription}
              error={errors.longDescription}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controls.Input
              name="price"
              label="Price"
              value={values.price}
              error={errors.price}
              InputProps={{
                readOnly: true,
              }}
            />
            <Controls.Input
              name="author"
              label="Author"
              value={values.author}
              error={errors.author}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={6}>
            <Controls.Input
              name="title"
              label="Title"
              value={values.title}
              onChange={handleInputChange}
              error={errors.title}
            />
            <Controls.Input
              name="longDescription"
              label="Long Description"
              multiline
              rowsMax={8.5}
              value={values.longDescription}
              onChange={handleInputChange}
              error={errors.longDescription}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          {isEdit ? (
            <>
              <Controls.Input
                name="price"
                label="Price"
                value={values.price}
                onChange={handleInputChange}
                error={errors.price}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Controls.Input
                name="author"
                label="Author"
                value={values.author}
                onChange={handleInputChange}
                error={errors.author}
              />
              <Controls.Input
                name="currentNumber"
                label="Current Number"
                value={values.currentNumber}
                onChange={handleInputChange}
                error={errors.currentNumber}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Controls.Input
                name="numberOfPage"
                label="Number Of Page"
                value={values.numberOfPage}
                onChange={handleInputChange}
                error={errors.numberOfPage}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              {categories.length !== 0 && (
                <Controls.Select
                  name="categoryId"
                  label="Category"
                  value={values.categoryId}
                  options={categories}
                  onChange={handleInputChange}
                  error={errors.categoryId}
                />
              )}
            </>
          ) : isView ? (
            <>
              <Controls.Input
                name="currentNumber"
                label="Current Number"
                value={values.currentNumber}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="numberOfPage"
                label="Number Of Page"
                value={values.numberOfPage}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="quantityPurchased"
                label="Quantity Purchased"
                value={values.quantityPurchased}
                InputProps={{
                  readOnly: true,
                }}
              />
              {categories.length !== 0 && (
                <Controls.Select
                  name="categoryId"
                  label="Category"
                  value={recordForEdit.categoryId}
                  options={categories.filter(
                    (item) => item.id === recordForEdit.categoryId
                  )}
                  error={errors.categoryId}
                />
              )}
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
                name="price"
                label="Price"
                value={values.price}
                onChange={handleInputChange}
                error={errors.price}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Controls.Input
                name="author"
                label="Author"
                value={values.author}
                onChange={handleInputChange}
                error={errors.author}
              />
              <Controls.Input
                name="currentNumber"
                label="Current Number"
                value={values.currentNumber}
                onChange={handleInputChange}
                error={errors.currentNumber}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Controls.Input
                name="numberOfPage"
                label="Number Of Page"
                value={values.numberOfPage}
                onChange={handleInputChange}
                error={errors.numberOfPage}
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
              />
              {categories.length !== 0 && (
                <Controls.Select
                  name="categoryId"
                  label="Category"
                  value={values.categoryId}
                  onChange={handleInputChange}
                  options={categories}
                  error={errors.categoryId}
                />
              )}
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
