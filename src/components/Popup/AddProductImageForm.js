import React, { useEffect } from "react";

import { useDropzone } from "react-dropzone";

import { Grid, makeStyles } from "@material-ui/core";

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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  },
}));

function BasicDropZone() {
  const classes = useStyles();

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
    });

  if (acceptedFiles.length !== 0) {
    initialFValues.productImages = acceptedFiles;
  }

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
}

export default function AddProductForm(props) {
  const { addOrEdit, recordForEdit, isEdit, isView, productsNoImage } = props;

  if (productsNoImage.length !== 0) {
    initialFValues.productId = productsNoImage[0].id;
  } else {
    initialFValues.productId = 0;
    initialFValues.productImages = [];
  }

  if (isEdit) {
    initialFValues.productImages = [];
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
      const newProductImage = {
        productId: values.productId,
        productImages: initialFValues.productImages,
      };
      addOrEdit(newProductImage, resetForm);
      return;
    }
    const newProductImage = {
      productId: values.productId,
      productImages: initialFValues.productImages,
    };
    addOrEdit(newProductImage, resetForm);
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
        ) : isEdit ? (
          <Grid item xs={6}>
            <Controls.Input
              name="title"
              label="Title"
              value={values.title}
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
              <BasicDropZone />
            </>
          ) : isView ? (
            <>
              <ImageGridList images={recordForEdit.productImages} />
            </>
          ) : (
            <>
              <BasicDropZone />
            </>
          )}
        </Grid>
        {!isView && (
          <Grid item xs={12}>
            <div style={{ textAlign: "center" }}>
              <Controls.Button type="submit" text="Submit" />
            </div>
          </Grid>
        )}
      </Grid>
    </Form>
  );
}
