import axios from "axios";
import { useState } from "react";

interface ApiResponse {
    data?: any;
    message: string;
    error?: string;
    status?: number
    response?: any
}

export default function usePostData(url: string) {
    const [loading, setLoading] = useState(false);

    const postData = async (data: any): Promise<ApiResponse> => {
        setLoading(true);
        try {
            const response = await axios.post(url, data);
            setLoading(false);
            console.log(response);
            return { data: response.data, message: 'Data posted successfully', status: response.status }
        } catch (error) {
            setLoading(false);
            console.log(error);
            return { message: 'Error posting data' };
        }
    };

    return { postData, loading };
}
