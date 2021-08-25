import React, { useEffect } from "react";
import moment from "moment";

import { Grid } from "@material-ui/core";

import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/Popup/UseForm";

const initialFValues = {
  id: 0,
  name: "",
  description: "",
  createAt: "",
  updateAt: "",
};

export default function AddCategoryForm(props) {
  const { addOrEdit, recordForEdit, isEdit, isView } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("name" in fieldValues) {
      temp.name =
        fieldValues.name.trim() !== "" ? "" : "This field is required";
    }

    if ("description" in fieldValues) {
      temp.description =
        fieldValues.description.trim() !== "" ? "" : "This field is required";
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
        <Grid item xs={12} style={{ textAlign: "center" }}>
          {isEdit ? (
            <>
              <Controls.Input
                name="name"
                label="Category Name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <Controls.Input
                name="description"
                label="Description"
                multiline
                rowsMax={8}
                value={values.description}
                onChange={handleInputChange}
                error={errors.description}
              />
            </>
          ) : isView ? (
            <>
              <Controls.Input
                name="name"
                label="Category Name"
                value={values.name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Controls.Input
                name="description"
                label="Description"
                multiline
                rowsMax={8}
                value={values.description}
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
                name="name"
                label="Category Name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <Controls.Input
                name="description"
                label="Description"
                multiline
                rowsMax={8}
                value={values.description}
                onChange={handleInputChange}
                error={errors.description}
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
