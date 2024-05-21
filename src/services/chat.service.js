import instance from "./api.instance";
export const getMessages = async (roomID) => {
  try {
    const res = await instance.get(`/user/getMessage/${roomID}`);
    return res?.data;
  } catch (err) {}
};
export const sendMessage = async (body) => {
  try {
    const res = await instance.post("/user/sendMessage", body);
    return res?.data;
  } catch (err) {}
};
export const getAllUsers = async (body) => {
  try {
    const res = await instance.get("/user/getAll", body);
    return res?.data;
  } catch (err) {}
};
