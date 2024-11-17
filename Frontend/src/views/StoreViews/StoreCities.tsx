import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import axios from "axios";
import { useEffect, useState } from "react";

export default function StoreCities() {

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: 'المدينة ' },
        { field: 'shipping_fees', headerName: 'رسوم التوصيل ' },
    ]
    const [data, setData] = useState<any>([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cities/cities')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <MiniDrawer>
            <DataGrid rows={data?.cities?.map((item: any) => ({ ...item, id: item.city_id })) ?? []} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
        </MiniDrawer>
    )
}
