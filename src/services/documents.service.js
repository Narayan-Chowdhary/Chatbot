import instance from "./api.instance";

export const allDocuments = async (search) => {
    const searchParam = search ? `?search=${search}` : ''
    const res = await instance.get(`/document${searchParam}`);
    return res?.data;
}

export const update = async (body, id) => {
    const res = await instance.patch('/project/' + id, { ...body })
    return res?.data;
}

export const addDocuments = async (body) => {
    const res = await instance.post('/document', body)
    return res
}

export const allDocumentList = async () => {
    const res = await instance.get(`/document/all`);
    return res?.data;
}

export const deleteDocument = async (documentId) => {
    try{
        const res = await instance.delete(`/document/${documentId}`)
        return res
    }catch(err){
        
    }
}

export const documentListByUserId = async (id) => {
    const res = await instance.get(`/document/user/${id}`)
    return res?.data
}