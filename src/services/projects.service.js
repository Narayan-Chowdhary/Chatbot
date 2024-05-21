import instance from "./api.instance";

export const allProjects = async (search) => {
    const searchParam = search ? `?search=${search}` : ''
    const res = await instance.get(`/projects${searchParam}`);
    return res?.data;
}

export const update = async (body, id) => {
    const res = await instance.patch('/project/' + id, { ...body })
    return res?.data;
}

export const addChatBot = async (body) => {
    console.log("body", body);
    const res = await instance.post('/chatbot', { ...body })
    return res
}

export const addProject = async (body) => {
    const res = await instance.post('/project', { ...body })
    return res
}

export const allProjectList = async () => {
    const res = await instance.get(`/project/all`);
    return res?.data;
}

export const deleteProject = async (projectId) => {
    const res = await instance.delete(`/project/${projectId}`,)
    return res
}

export const projectListByUserId = async (id) => {
    const res = await instance.get(`/project/user/${id}`)
    return res?.data
}