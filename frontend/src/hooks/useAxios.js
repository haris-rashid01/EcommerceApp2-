import axiosInstance from "./axios";

const useAxios = () =>{
    const get = async (url, config, {}) => {
        const response = await axiosInstance.get(url, config)
        return response.data
    };
    const post = async (url, data, config = {}) =>{
        const response = await axiosInstance.post(url, data, config);
        return response.data
    }
    const put = async(url, data, config = {})=>{
        const response = await axiosInstance.put(url, data, config)
        return response.data
    }
    const remove = async (url, config ={}) =>{
        const response = await axiosInstance.delete(url, config)
        return response.data
    }
    return {get, post, put, remove}
}

export default useAxios