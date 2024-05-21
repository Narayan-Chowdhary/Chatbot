import { React, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Grid,
    Button,
    TextField
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import AutoComplete from '../common/AutoComplete';
import { addDocuments } from '../../services/documents.service';

export default function DocumentForm(props) {
    const { isClick, setIsClick, handleClose, setIsLoading } = props

    const id = uuidv4();
    const [tags, setTags] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('')
    const [fileError, setFileError] = useState('')

    const handleDocumentAdd = async () => {
        setTitleError('');
        setFileError('');
        if(title == '' || selectedFile == undefined){
            if(title == '') setTitleError('Title is required')
            if(selectedFile == undefined) setFileError('File is required')
            setIsLoading(false)
        }else{
            const formData = new FormData()
            formData.append('pdf', selectedFile)
            formData.append('title', title)
            formData.append('type', "pdf")
    
            if (tags) {
                formData.append("tags", tags)
            }
            const res = await addDocuments(formData)
            handleClose()
        }
    };

    useEffect(() => {
        if (isClick) {
            let link = document?.getElementById('btn1');
            link?.click();
            setIsClick();
        }
    }, [isClick, setIsClick])


    const handleSubmit = async (e) => {
        e.preventDefault()
        handleDocumentAdd()
    }

    const handleFileSelection = async (event) => {
        setFileError('')
        setSelectedFile(event?.target?.files[0])
    };

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <Grid container rowSpacing={5} sx={{ px: 5 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    variant="standard"
                                    label="Enter Title"
                                    fullWidth
                                    type="text"
                                    name="title"
                                    value={title}
                                    helperText={titleError ? titleError : ""}
                                    error={titleError ? titleError : ""}
                                    touched={titleError}
                                    InputProps={{
                                        sx: {
                                            borderRadius: "10px",
                                        },
                                    }}
                                    onChange={(value) => {
                                        setTitle(value?.target?.value)
                                        setTitleError('')
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <input type='file' accept="application/pdf" onChange={handleFileSelection} />
                                {fileError ? <p style={{fontSize: 12, color: 'red'}}>{fileError}</p> : <></>}
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <AutoComplete setter={(val) => {
                                    if (val?.length > 0) {
                                        setTags(val?.join(','))
                                    }
                                }} />
                            </Grid>
                        </Grid>
                    </Box>
                    <Button style={{ display: 'none' }} id="btn1" type='submit'>Save</Button>
                </form>
            </Box>
        </>
    )
}