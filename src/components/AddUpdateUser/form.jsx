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

const UserForm = (props) => {
    const { isClick, setIsClick, handleClose, userEditData, setUserEditData } = props
    const [projects, setProjects] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [documentOptions, setDocumentsOptions] = useState([]);
    const [isAdmin, setIsAdmin] = useState(userEditData?.isAdmin)
    const [loadingProjects, setLoadingProjects] = useState(true)
    const [loadingDocuments, setLoadingDocuments] = useState(true)
    const isEdit = userEditData && userEditData?.fullName;
    const [editUserId, setUserId] = useState(userEditData?._id)

    const ChatBotSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("First Name is required"),
        password: Yup.string()
            .required("Password is required"),
        email: Yup.string()
            .transform(value => value?.trim())
            .required("Email is required")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
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

    const fetchDocumentForUser = async () => {
        setUserId(userEditData?._id)
        const res = await documentListByUserId(userEditData?._id)
        setLoadingDocuments(false)
        if (res && res?.data) {
            setDocuments(res?.data)
        }
    }

    const fetchProjectForUser = async () => {
        setUserId(userEditData?._id)
        const res = await projectListByUserId(userEditData?._id)
        setLoadingProjects(false)
        if (res && res?.data) {
            setProjects(res?.data)
        }
    }

    useEffect(() => {
        fetchProjectOption();
        fetchDocumentOption();

        if (userEditData && userEditData?.fullName && userEditData?._id) {
            fetchDocumentForUser()
            fetchProjectForUser()
        }
    }, [])

    useEffect(() => {
        if (isClick) {
            let link = document?.getElementById('btn1');
            link?.click();
            setIsClick();
        }
    }, [isClick, setIsClick])


    const handleSubmit = async (val) => {
        let temp = {
            ...val,
            isAdmin,
            project_id: projects.map((name) => name?._id),
            document_id: documents.map((name) => name?._id),
        }

        if (isEdit) {
            delete temp['password']
            await update({ ...temp, id: editUserId })
        } else {
            await addUser(temp)
        }
        handleClose()
    }

    const handleIsAdminCheckbox = (event) => {
        setIsAdmin(event?.target?.checked);
    };

    return (
        <>
            <Box>
                <Formik
                    initialValues={{
                        fullName: userEditData?.fullName,
                        password: userEditData && userEditData?.fullName ? 'hey' : '',
                        email: userEditData?.email,
                    }}
                    validationSchema={ChatBotSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        values = { ...values, email: values?.email?.trim() };
                        handleSubmit(values)
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
                                            label="Enter Full Name"
                                            fullWidth
                                            type="text"
                                            name="fullName"
                                            value={values?.fullName}
                                            helperText={touched?.fullName ? errors?.fullName : ""}
                                            error={touched?.fullName ? errors?.fullName : ""}
                                            touched={touched?.fullName}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('fullName')(value);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            variant="standard"
                                            label="Enter Email"
                                            fullWidth
                                            type="text"
                                            name="email"
                                            value={values?.email}
                                            helperText={touched?.email ? errors?.email : ""}
                                            error={touched?.email ? errors?.email : ""}
                                            touched={touched?.email}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: "10px",
                                                },
                                            }}
                                            onChange={(value) => {
                                                handleChange('email')(value);
                                            }}
                                        />
                                    </Grid>

                                    {!isEdit ? (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <TextField
                                                variant="standard"
                                                label="Enter Password"
                                                fullWidth
                                                type="text"
                                                name="password"
                                                value={values?.password}
                                                helperText={touched?.password ? errors?.password : ""}
                                                error={touched?.password ? errors?.password : ""}
                                                touched={touched?.password}
                                                InputProps={{
                                                    sx: {
                                                        borderRadius: "10px",
                                                    },
                                                }}
                                                onChange={(value) => {
                                                    handleChange('password')(value);
                                                }}
                                            />
                                        </Grid>
                                    ) : <></>}

                                    {((userEditData && userEditData?.fullName && !loadingProjects && userEditData?.isAdmin == false) || !userEditData?.fullName) ? (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Autocomplete
                                                value={projects}
                                                multiple
                                                limitTags={5}
                                                onChange={(event, newValue) => {
                                                    setProjects(newValue)
                                                }}
                                                id="setProjects"
                                                isOptionEqualToValue={(option, value) => option?.projectName === value?.projectName}
                                                options={projectOptions}
                                                getOptionLabel={(option) => option?.projectName}
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

                                    {((userEditData && userEditData?.fullName && !loadingDocuments && userEditData?.isAdmin == false) || !userEditData?.fullName) ? (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Autocomplete
                                                value={documents}
                                                multiple
                                                limitTags={5}
                                                onChange={(event, newValue) => {
                                                    setDocuments(newValue)
                                                }}
                                                id="setDocuments"
                                                isOptionEqualToValue={(option, value) => option?.title === value?.title}
                                                options={documentOptions}
                                                getOptionLabel={(option) => option?.title}
                                                filterSelectedOptions
                                                sx={{ width: '100%', borderRadius: "10px", }}
                                                renderInput={(params) => (
                                                    <>
                                                        <TextField {...params} label="Select Documents" />
                                                    </>
                                                )}
                                            />
                                        </Grid>
                                    ) : <></>}

                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormControlLabel
                                            label="Provide User Admin rights"
                                            control={<Checkbox checked={isAdmin} onChange={handleIsAdminCheckbox} />}
                                        />
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

export default UserForm;