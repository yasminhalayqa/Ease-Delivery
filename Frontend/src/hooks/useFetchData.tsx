import { useEffect, useState } from "react";
import axios from 'axios';

export default function useFetchData(url: string) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            const response = await axios.get(url)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setLoading(true)
        fetchData()
    }, [])
 
    return { data, loading }
}