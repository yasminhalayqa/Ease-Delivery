import axios from "axios";
import { useState } from "react";

interface ApiResponse {
    data?: any;
    message: string;
    error?: string;
}

export default function usePutData(url: string) {
    const [loading, setLoading] = useState(false);

    const putData = async (data: any): Promise<ApiResponse> => {
        setLoading(true);
        try {
            const response = await axios.put(url, data);
            setLoading(false);
            return { message: 'Data posted successfully' };
        } catch (error) {
            setLoading(false);
            console.log(error);
            return { message: 'Error posting data' };
        }
    };

    return { putData, loading };
}
