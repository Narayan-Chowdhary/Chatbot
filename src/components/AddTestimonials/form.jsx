import { React, useEffect, useState, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Grid,
    Button,
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import Autocomplete from '@mui/material/Autocomplete';
import { addUser, update } from '../../services/users.service';
import { allDocumentList, documentListByUserId } from '../../services/documents.service';
import { allProjectList, projectListByUserId } from '../../services/projects.service';
import AutoComplete from '../common/AutoComplete';

const TestimonialForm = (props) => {
    const { isClick, setIsClick, handleClose, testimonialEditData } = props
    const [projects, setProjects] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [documentOptions, setDocumentsOptions] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState();

    // const [isAdmin, setIsAdmin] = useState(userEditData?.isAdmin)
    const [loadingProjects, setLoadingProjects] = useState(true)
    const [loadingDocuments, setLoadingDocuments] = useState(true)
    // const isEdit = userEditData && userEditData?.fullName;
    // const [editUserId, setUserId] = useState(userEditData?._id)

    const ChatBotSchema = Yup.object().shape({
        title: Yup.string()
            .required("Title is required"),
        name: Yup.string()
            .required("Client name is required"),
        companyName: Yup.string()
            .required("Company name is required"),
        projectName: Yup.string()
            .required("Project name is required"),
        projectDuration: Yup.string()
            .required("Project duration is required"),
        projectDuration: Yup.string()
            .required("Tags Required"),
        uploadFile: Yup.mixed().required('File is required').test('is-video', 'Only video files are allowed', (value) => {
            console.log("value", value)
            if (!value) return true; // Allow empty values

            if (testimonialEditData.video_file_name)            //////
                return true                               ////

            const supportedVideoTypes = ['video/mp4', 'video/x-m4v', 'video/avi', 'video/mkv', 'video/3gpp'];
            console.log('HF', value)
            return supportedVideoTypes?.includes(value.type);
        }),

    });

    const fetchDocumentOption = async () => {
        const res = await allDocumentList()
        if (res && res?.data) {
            setDocumentsOptions(res?.data)
        }
    }

    const fetchProjectOption = async () => {
        const res = await allProjectList()
        if (res && res?.data) {
            setProjectOptions(res?.data)
        }
    }

    // const fetchDocumentForUser = async () => {
    //     // setUserId(userEditData._id)
    //     const res = await documentListByUserId(userEditData._id)
    //     setLoadingDocuments(false)
    //     if (res && res?.data) {
    //         setDocuments(res?.data)
    //     }
    // }

    // const fetchProjectForUser = async () => {
    //     setUserId(userEditData._id)
    //     const res = await projectListByUserId(userEditData._id)
    //     setLoadingProjects(false)
    //     if (res && res?.data) {
    //         setProjects(res?.data)
    //     }
    // }

    // useEffect(() => {
    //     fetchProjectOption();
    //     fetchDocumentOption();

    //     // if (userEditData && userEditData.fullName && userEditData._id) {
    //     //     fetchDocumentForUser()
    //     //     fetchProjectForUser()
    //     // }
    // }, [])

    useEffect(() => {
        if (isClick) {
            let link = document?.getElementById('btn1');
            link?.click();
            setIsClick();
        }
    }, [isClick, setIsClick])


    const handleSubmit = async (val) => {
        // let temp = {
        //     ...val,
        //     // isAdmin,
        //     // project_id: projects.map((name) => name._id),
        //     // document_id: documents.map((name) => name._id),
        // }

        // if (isEdit) {
        //     delete temp['password']
        //     await update({ ...temp, id: editUserId })
        // } else {
        //     await addUser(temp)
        // }
        handleClose()
    }

    // const handleIsAdminCheckbox = (event) => {
    //     setIsAdmin(event.target.checked);
    // };

    const handleFileSelection = (event) => {
        setSelectedVideo(event?.target?.files[0]);
    };


    return (
        <>
            <Box>
                <Formik
                    initialValues={{
                        title: testimonialEditData?.title,
                        description: testimonialEditData?.description,
                        technology: testimonialEditData?.technology,
                        name: testimonialEditData?.name,
                        companyName: testimonialEditData?.company_name,
                        projectName: testimonialEditData?.project_name,
                        projectDuration: testimonialEditData?.project_duration,
                        uploadFile: testimonialEditData?.video_file_name || null,
                        // technology: testimonialEditData?.technology
                    }}
                    validationSchema={ChatBotSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        // values = { ...values, email: values.email.trim() };
                        handleSubmit(values)
                    }}
                >
                    {({
                        errors,
                        values,
                        touched,
                        setFieldValue,
                        setFieldTouched,
                        handleChange,

                    }) => (
                        <Form>
                            <Box>
                                <Grid container rowSpacing={5} sx={{ px: 5 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Title"
                                            fullWidth
                                            type="text"
                                            name="title"
                                            value={values?.title}
                                            helperText={touched?.title ? errors?.title : ""}
                                            error={touched?.title ? errors?.title : ""}
                                            touched={touched?.title}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('title')(value);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <label>Description</label>
                                        <TextField
                                            placeholder="Type in here…"
                                            rows={3}
                                            multiline
                                            sx={{
                                                '&::before': {
                                                    display: 'none',
                                                },
                                                '&:focus-within': {
                                                    outline: '2px solid var(--Textarea-focusedHighlight)',
                                                    outlineOffset: '2px',
                                                },
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            type="text"
                                            name="description"
                                            value={values?.description}
                                            helperText={touched?.description ? errors?.description : ""}
                                            error={touched?.description ? errors?.description : ""}
                                            touched={touched?.description}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                    marginTop: 2
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('description')(value);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <AutoComplete setter={(val) => {
                                            if (val?.length > 0) {
                                                handleChange("technology")(val?.join(','))
                                            }
                                        }} />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Client Name"
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
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Company Name"
                                            fullWidth
                                            type="text"
                                            name="companyName"
                                            value={values?.companyName}
                                            helperText={touched?.companyName ? errors?.companyName : ""}
                                            error={touched?.companyName ? errors?.companyName : ""}
                                            touched={touched?.companyName}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('companyName')(value);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Project Name"
                                            fullWidth
                                            type="text"
                                            name="projectName"
                                            value={values?.projectName}
                                            helperText={touched?.projectName ? errors?.projectName : ""}
                                            error={touched?.projectName ? errors?.projectName : ""}
                                            touched={touched?.projectName}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('projectName')(value);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Project Duration"
                                            fullWidth
                                            type="text"
                                            name="email"
                                            value={values?.projectDuration}
                                            helperText={touched?.projectDuration ? errors?.projectDuration : ""}
                                            error={touched?.projectDuration ? errors?.projectDuration : ""}
                                            touched={touched?.projectDuration}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('projectDuration')(value);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box>
                                            <input
                                                id="uploadFile"
                                                name="uploadFile"
                                                type="file"
                                                onChange={(event) => {
                                                    setFieldValue('uploadFile', event?.currentTarget?.files[0]);
                                                }}
                                                onBlur={() => setFieldTouched('uploadFile', true)}
                                            />
                                            {touched?.uploadFile && errors?.uploadFile && (
                                                <div style={{ color: '#d32f2f', fontSize: '12px' }}>{errors?.uploadFile}</div>
                                            )}
                                        </Box>
                                    </Grid>


                                    {/* {((userEditData && userEditData.fullName && !loadingProjects && userEditData.isAdmin == false) || !userEditData.fullName) ? (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Autocomplete
                                                value={projects}
                                                multiple
                                                limitTags={5}
                                                onChange={(event, newValue) => {
                                                    setProjects(newValue)
                                                }}
                                                id="setProjects"
                                                isOptionEqualToValue={(option, value) => option.projectName === value.projectName}
                                                options={projectOptions}
                                                getOptionLabel={(option) => option.projectName}
                                                filterSelectedOptions
                                                sx={{ width: '100%', borderRadius: "10px", }}
                                                renderInput={(params) => (
                                                    <>
                                                        <TextField {...params} label="Select Projects" />
                                                    </>
                                                )}
                                            />
                                        </Grid>
                                    ) : <></>}

                                    {((userEditData && userEditData.fullName && !loadingDocuments && userEditData.isAdmin == false) || !userEditData.fullName) ? (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Autocomplete
                                                value={documents}
                                                multiple
                                                limitTags={5}
                                                onChange={(event, newValue) => {
                                                    setDocuments(newValue)
                                                }}
                                                id="setDocuments"
                                                isOptionEqualToValue={(option, value) => option.title === value.title}
                                                options={documentOptions}
                                                getOptionLabel={(option) => option.title}
                                                filterSelectedOptions
                                                sx={{ width: '100%', borderRadius: "10px", }}
                                                renderInput={(params) => (
                                                    <>
                                                        <TextField {...params} label="Select Documents" />
                                                    </>
                                                )}
                                            />
                                        </Grid>
                                    ) : <></>} */}

                                    {/* <Grid item xs={12} sm={12} md={12}>
                                        <FormControlLabel
                                            label="Provide User Admin rights"
                                        // control={<Checkbox checked={isAdmin} onChange={handleIsAdminCheckbox} />}
                                        />
                                    </Grid> */}
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

export default TestimonialForm;