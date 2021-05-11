import React, { useEffect } from "react";

import { Grid } from "@material-ui/core";

import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/Popup/UseForm";
import ImageGridList from "../../components/ImageGridList";

const initialFValues = {
  id: 0,
  title: "",
  productId: 0,
  longDescription: "",
  productImages: [],
};

export default function AddProductForm(props) {
  const { addOrEdit, recordForEdit, isEdit, isView, productsNoImage } = props;

  if (productsNoImage.length !== 0) {
    initialFValues.productId = productsNoImage[0].id;
  }

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

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
          </Grid>
        ) : (
          <Grid item xs={6}>
            {productsNoImage.length !== 0 && (
              <Controls.Select
                name="productId"
                label="Title"
                value={values.productId}
                options={productsNoImage}
                onChange={handleInputChange}
                error={errors.productId}
              />
            )}
          </Grid>
        )}
        <Grid item xs={6}>
          {isEdit ? (
            <>
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
            </>
          ) : isView ? (
            <>
              <ImageGridList images={recordForEdit.productImages} />
            </>
          ) : (
            <>
              <h1>a</h1>
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
