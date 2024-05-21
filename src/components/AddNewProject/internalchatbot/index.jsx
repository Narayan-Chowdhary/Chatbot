import { React, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Select,
    TextField,
    Grid,
    FormControl, MenuItem, InputLabel, Button
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { addChatBot } from '../../../services/projects.service';
import AutoComplete from '../../common/AutoComplete';

export default function InteranlChatBot(props) {
    const { isClick, setIsClick, setFormOpen, setActiveStep, form, handleClose, fetchData } = props

    const id = uuidv4();

    const ChatBotSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name Required"),
        datasource: Yup.string()
            .required("Source is Required"),
        initialMessage: Yup.string()
            .required("Initial Message required"),
        tags: Yup.string()
            .required("Tags Required"),
        token: Yup.string()

    });
    const [detailsOfChatBot, setDetailsOfChatBot] = useState({
        name: "",
        datasource: "",
        initialMessage: "",
        projectEndPoint: "",
        userEndPoint: "",
        tags: "",
        token: "",
    })

    useEffect(() => {
        if (isClick) {
            let link = document?.getElementById('btn1');
            link?.click();
            setIsClick();
        }

    }, [isClick, setIsClick])


    const handleSubmit = async (data) => {
        const res = await addChatBot(data)
        if (res) {
            handleClose();
            fetchData();
            setActiveStep(0)
            setFormOpen(false)
        }
    }

    return (
        <>
            <Box>
                <Formik
                    initialValues={{
                        name: "",
                        datasource: "",
                        initialMessage: "",
                        projectEndPoint: "",
                        userEndPoint: "",
                        tags: "",
                        token: "",

                    }}
                    validationSchema={ChatBotSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        const data = { ...values, theme: 1, internal: form === 1 ? true : false, headerColor: "#d0eceb", projectMsgColor: "#5168c2", }
                        handleSubmit(data)
                    }}
                >
                    {({
                        errors,
                        values,
                        touched,
                        handleChange,

                    }) => (
                        <Form>
                            <Box>
                                <Grid container rowSpacing={5} sx={{ px: 5 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Name"
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
                                                handleChange('name')(value);
                                                setDetailsOfChatBot((prevState) => {
                                                    return {
                                                        ...prevState, [value?.target?.name]: value?.target?.value
                                                    }
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Data Source</InputLabel>
                                            <Select
                                                name="datasource"
                                                label="ProjectType"
                                                onChange={(value) => {
                                                    handleChange('datasource')(value);
                                                    setDetailsOfChatBot((prevState) => {
                                                        return {
                                                            ...prevState, [value?.target?.name]: value?.target?.value
                                                        }
                                                    });
                                                }}
                                            >
                                                <MenuItem value={1}>PDF </MenuItem>
                                                <MenuItem value={0}> Without PDF</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box>
                                            <TextField fullWidth
                                                variant="standard"
                                                required={values.type}
                                                label="Initial Message"
                                                type="text"
                                                name="initialMessage"
                                                helperText={
                                                    touched?.initialMessage ? errors?.initialMessage : ""
                                                }
                                                error={touched?.initialMessage ? errors?.initialMessage : ""}
                                                touched={touched?.initialMessage}
                                                value={values?.initialMessage}
                                                onChange={(value) => {
                                                    handleChange('initialMessage')(value);
                                                    setDetailsOfChatBot((prevState) => {
                                                        return {
                                                            ...prevState, [value?.target?.name]: value?.target?.value
                                                        }
                                                    });
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "10px",
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box>
                                            <TextField fullWidth
                                                variant="standard"
                                                label="Enter Chat API endpoint "
                                                type="text"
                                                required={values.type}
                                                name="pdfEndPoint"
                                                value={values?.projectEndPoint}
                                                onChange={(value) => {
                                                    handleChange('projectEndPoint')(value);
                                                    setDetailsOfChatBot((prevState) => {
                                                        return {
                                                            ...prevState, [value?.target?.name]: value?.target?.value
                                                        }
                                                    });
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "10px",
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box>
                                            <TextField fullWidth
                                                variant="standard"
                                                label="Enter PDF API endpoint "
                                                type="text"
                                                name="projectEndPoint"
                                                value={values?.userEndPoint}
                                                onChange={(value) => {
                                                    handleChange('userEndPoint')(value);
                                                    setDetailsOfChatBot((prevState) => {
                                                        return {
                                                            ...prevState, [value?.target?.name]: value?.target?.value
                                                        }
                                                    });
                                                }}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "10px",
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Token"
                                            fullWidth
                                            type="text"
                                            name="token"
                                            value={values?.token}
                                            helperText={touched?.token ? errors?.token : ""}
                                            error={touched?.token ? errors?.token : ""}
                                            touched={touched?.token}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('token')(value);
                                                setDetailsOfChatBot((prevState) => {
                                                    return {
                                                        ...prevState, [value?.target?.name]: value?.target?.value
                                                    }
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <AutoComplete setter={(val) => {
                                            if (val?.length > 0) {
                                                handleChange("tags")(val?.join(','))
                                            }
                                        }} />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Button style={{ display: 'none' }} id="btn1" type='submit'>Save</Button>
                        </Form>
                    )}
                </Formik>
            </Box>

        </>
    )
}