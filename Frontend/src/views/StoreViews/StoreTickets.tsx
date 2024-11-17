import { Card, CardContent, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";


export default function StoreTickets() {
    const { data: stores } = useFetchData('http://localhost:3000/users/store') as any
    const store_id = sessionStorage.getItem('id')
    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'title', headerName: 'العنوان' },
        { field: 'description', headerName: 'الوصف', width: 250 },
        { field: 'status', headerName: ' الحالة' },
        { field: 'store', headerName: 'الشركة' },
        { field: 'createdAt', headerName: 'تاريخ الإنشاء', width: 200 },

    ]
    const [data, setData] = useState<any>([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tickets/tickets')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    const rows = data?.tickets?.filter((item: any) => item.store_id == store_id)
        .map((item: any) => {
            const store = stores?.stores?.find((store: any) => store.id === item.store_id);
            return {
                ...item,
                id: item.ticket_id,
                store: store ? store.name : 'Unknown',
            };
        }) ?? [];
    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent>
                    <Typography>
                        الدعم الفني
                    </Typography>
                </CardContent>
            </Card>
            <DataGrid rows={rows} columns={columns} sx={{ backgroundColor: 'white' }} />

        </MiniDrawer>
    )
}
