import instance from "./api.instance";
const server = 'http://103.204.52.51:8031/'

export const allVideos = async (search) => {
    const searchParam = search ? `?search=${search}` : ''
    const res = await instance.get(`/video/all${searchParam}`);
    return res?.data;
}

export const deleteVideo = async (videoId) => {
    const res = await instance.post(`/video/delete/${videoId}`,)
    return res
}



export const addVideo = async (formData, setVideoUploadProgress) => {
    try {
        let percentCompleted;
        const resp = await instance.post(`/video/upload`, formData, {
            onUploadProgress: (progressEvent) => {
                percentCompleted = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
                setVideoUploadProgress(percentCompleted);
            },
        });
        return { resp: resp, percentCompleted: percentCompleted };
    } catch (err) {
        console.log("Fetch error: ", err);
    }
};