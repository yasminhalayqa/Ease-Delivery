import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";

export default function StoreOrderTypes() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'name', headerName: 'النوع ' },
    ]
    const [data, setData] = useState<any>([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/order_types/order_type')
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
            <DataGrid rows={data?.orderTypes?.map((item: any) => ({ ...item, id: item.order_type_id })) ?? []} columns={columns} checkboxSelection sx={{ backgroundColor: 'white' }} />
        </MiniDrawer>
    )
}
