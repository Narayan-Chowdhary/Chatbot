import instance from "./api.instance";

export const allUsers = async (search) => {
    const searchParam = search ? `?search=${search}` : ''
    const res = await instance.get(`/user${searchParam}`);
    return res?.data;
}

export const update = async (body) => {
    const res = await instance.put('/user', { ...body })
    return res?.data;
}

export const addUser = async (body) => {
    const res = await instance.post('/user', {...body})
    return res?.data;
}
export const setAsRead = async (body) => {
    const res = await instance.post("/user/markRead", { ...body });
    return res?.data;
}