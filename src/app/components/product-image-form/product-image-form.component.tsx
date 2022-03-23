import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { DropEvent } from "react-dropzone";
import { UpdateProductImageDto } from "@app/models/product-image.model";
import { Product } from "@app/models/product.model";
import { Form, useForm } from "@app/hooks/use-form.hook";
import DropZone from "../drop-zone/drop-zone.component";
import Controls from "../controls";

const acceptFileTypes = "image/jpeg, image/png";
const messageSuggest = "Only *.jpeg and *.png images will be accepted";

const initialProductImageValues: UpdateProductImageDto = {
  productId: 0,
  title: "",
  productImages: [],
};

type TypeProps = {
  isEdit: boolean;
  isView: boolean;
  recordForAction: Product;
  addOrEdit: (
    values: Partial<UpdateProductImageDto>,
    resetForm: () => void
  ) => void;
  productNoImages: Product[];
};

function ProductImageForm(props: TypeProps) {
  const { isEdit, isView, recordForAction, addOrEdit, productNoImages } = props;

  if (productNoImages.length) {
    initialProductImageValues.productId = productNoImages[0].id;
  }

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onDropAccepted = (files: File[], event: DropEvent) => {
    setImageFiles(files);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    setErrors({
      ...temp,
    });

    return fieldValues === values && Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialProductImageValues, true, validate);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newProductImage: Partial<UpdateProductImageDto> = {
      productId: values.productId,
      productImages: imageFiles,
    };
    if (isEdit) {
      addOrEdit(newProductImage, resetForm);
      return;
    }
    addOrEdit(newProductImage, resetForm);
  };

  useEffect(() => {
    if ((isView || isEdit) && recordForAction.id) {
      setValues({
        ...recordForAction,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForAction]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          {!!productNoImages.length && (
            <Controls.Select
              name="productId"
              label="Title"
              value={values.productId}
              options={productNoImages}
              onChange={handleInputChange}
              error={errors.productId}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {!isView && (
            <DropZone
              acceptFileTypes={acceptFileTypes}
              messageSuggest={messageSuggest}
              onDropAccepted={onDropAccepted}
            />
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

export default ProductImageForm;
