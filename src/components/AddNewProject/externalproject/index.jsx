import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, TextField, Grid, FormControl } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addChatBot } from "../../../services/projects.service";
import AutoComplete from "../../common/AutoComplete";

export default function ExternalProjectAdd(props) {
  const {
    isClick,
    setIsClick,
    setFormOpen,
    setActiveStep,
    form,
    handleClose,
    fetchData,
  } = props;
  const id = uuidv4();
  const newProject = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    url: Yup.string().required("URL Required"),
    tags: Yup.string().required("Tags Required"),
  });

  const [detailsOfChatBot, setDetailsOfChatBot] = useState({
    name: "",
    url: "",
    tags: "",
  });

  useEffect(() => {
    if (isClick) {
      let link = document?.getElementById("btn1");
      link?.click();
      setIsClick();
    }
  }, [isClick, setIsClick]);

  const handleSubmit = async (data) => {
    const res = await addChatBot(data);
    if (res) {
      handleClose();
      fetchData();
      setActiveStep(0);
      setFormOpen(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: 442,
        }}
        className="w-full sm:w-[320px] md:w-[500px]"
      >
        <Formik
          initialValues={{
            name: "",
            url: "",
            tags: "",
          }}
          validationSchema={newProject}
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={(values) => {
            const data = { ...values, internal: false };
            handleSubmit(data);
          }}
        >
          {({ errors, values, touched, handleChange }) => (
            <Form>
              <Box>
                <Grid container rowSpacing={5} sx={{ px: 5 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      variant="standard"
                      label="Enter Project Name"
                      fullWidth
                      type="text"
                      name="name"
                      value={values?.name}
                      helperText={touched?.name ? errors?.name : ""}
                      error={touched?.name ? errors?.name : ""}
                      touched={touched?.name}
                      InputProps={{
                        sx: {
                          borderRadius: "10px",
                        },
                      }}
                      onChange={(value) => {
                        handleChange("name")(value);
                        setDetailsOfChatBot((prevState) => {
                          return {
                            ...prevState,
                            [value?.target?.name]: value?.target?.value,
                          };
                        });
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Box>
                      <FormControl fullWidth>
                        <TextField
                          variant="standard"
                          required={values?.type}
                          label="Enter URL "
                          type="text"
                          name="url"
                          helperText={touched?.url ? errors?.url : ""}
                          error={touched?.url ? errors?.url : ""}
                          touched={touched?.url}
                          value={values?.url}
                          onChange={(value) => {
                            handleChange("url")(value);
                            setDetailsOfChatBot((prevState) => {
                              return {
                                ...prevState,
                                [value?.target?.name]: value?.target?.value,
                              };
                            });
                          }}
                          InputProps={{
                            sx: {
                              borderRadius: "10px",
                            },
                          }}
                        />
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <AutoComplete
                      setter={(val) => {
                        if (val?.length > 0) {
                          handleChange("tags")(val?.join(","));
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Button style={{ display: "none" }} id="btn1" type="submit">
                click
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
