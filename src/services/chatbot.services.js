import instance from "./api.instance";

export const chatApi = async (message, projectEndPoint, token = '') => {
    let msg = message.reverse()[0].user;
    try{
        const searchParams = token ? `&token=${token}` : '';
        const res = await instance.post(`${projectEndPoint}/api/get-answers/?question=${msg}${searchParams}`)

        if (!res) {
            throw new Error(
              `HTTP error! Status: ${res.status}, Error: ${JSON.stringify(
                res
              )}`
            );
        }

        return res?.data;
    }catch(err){
        console.error("Fetch error:", err);
    }
}

export const uploadPDFForData = async (formData, projectEndPoint, fileName, token = '') => {
  try{
    const searchParams = token ? `?token=${token}` : '';
    const res = await instance.post(`${projectEndPoint}/upload/${searchParams}`, formData)
    return res
  }catch(err){
    console.log('Fetch error: ', err)
  }
}