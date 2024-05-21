import instance from "./api.instance";

export const login = async (body) => {
    const res = await instance.post('/login', body);
    return res?.data
}   