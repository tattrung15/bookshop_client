import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Grid, ImageList, ImageListItem } from "@material-ui/core";
import { Form, useForm } from "@app/hooks/use-form.hook";
import DropZone from "../drop-zone/drop-zone.component";
import Controls from "../controls";
import { UpdateBannerDto } from "@app/models/banner.model";
import { useStyles } from "./make-style";
import { buildImageSrc } from "@app/shared/helpers/helpers";
import { BANNER_TYPE_MAP } from "@app/shared/constants/common";

const acceptFileTypes = "image/jpeg, image/png";
const messageSuggest = "Only *.jpeg and *.png images will be accepted";

const initialBannerValues: Partial<UpdateBannerDto> = {
  bannerId: 0,
  imageUrl: "",
  type: 1,
  title: "",
  files: [],
};

const bannerItems = () => {
  return Object.keys(BANNER_TYPE_MAP).map((key) => ({
    id: key,
    title: BANNER_TYPE_MAP[key],
  }));
};

type TypeProps = {
  isEdit: boolean;
  isView: boolean;
  recordForAction: UpdateBannerDto;
  addOrEdit: (values: Partial<UpdateBannerDto>, resetForm: () => void) => void;
};

function BannerForm(props: TypeProps) {
  const classes = useStyles();
  const { isEdit, isView, recordForAction, addOrEdit } = props;

  if (recordForAction.bannerId) {
    initialBannerValues.bannerId = recordForAction.bannerId;
  }

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const onFileDialogOpen = () => {
    setImageFiles([]);
  };

  const onDropAccepted = (files: File[]) => {
    setImageFiles(files);
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("title" in fieldValues) {
      temp.title =
        fieldValues.title.trim() !== "" ? "" : "This field is required";
    }

    setErrors({
      ...temp,
    });

    return fieldValues === values && Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialBannerValues, true, validate);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isEdit) {
      if (validate()) {
        const updateValue: Partial<UpdateBannerDto> = {
          bannerId: values.bannerId,
          title: values.title,
          type: values.type,
          files: imageFiles,
        };
        addOrEdit(updateValue, resetForm);
      }
      return;
    }
    if (validate()) {
      const newValue: Partial<UpdateBannerDto> = {
        title: values.title,
        type: values.type,
      };
      addOrEdit(newValue, resetForm);
    }
  };

  useEffect(() => {
    if ((isView || isEdit) && recordForAction.bannerId) {
      setValues({
        ...recordForAction,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordForAction]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid
          item
          xs={isView || isEdit ? 6 : 12}
          style={{ textAlign: isView || isEdit ? "left" : "center" }}
        >
          <Controls.Input
            name="title"
            label="Title"
            value={values.title ?? ""}
            onChange={handleInputChange}
            error={errors.title}
            InputProps={{
              readOnly: isView,
            }}
          />
          <Controls.Select
            name="type"
            label="Type"
            value={values.type || ""}
            onChange={handleInputChange}
            options={bannerItems()}
            error={errors.roleId}
            disabled={isView}
            className={clsx({ "bs-text-black": isView })}
            style={{ textAlign: "left" }}
          />
        </Grid>
        <Grid item xs={6}>
          {isEdit && (
            <DropZone
              acceptFileTypes={acceptFileTypes}
              messageSuggest={messageSuggest}
              onDropAccepted={onDropAccepted}
              onFileDialogOpen={onFileDialogOpen}
              maxFiles={1}
            />
          )}
          {isView && values.imageUrl && (
            <ImageList rowHeight={200} cols={1}>
              <ImageListItem>
                <img
                  className={classes.image}
                  src={buildImageSrc(values.imageUrl)}
                  alt={values.imageUrl}
                />
              </ImageListItem>
            </ImageList>
          )}
          {isView && !values.imageUrl && <h3>Không có ảnh</h3>}
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

export default BannerForm;
