import MiniDrawer from "../../components/Sidebar"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

export default function StoreInvoices() {
    const store_id = sessionStorage.getItem('id')

    const columns: GridColDef[] = [
        { field: 'id', headerName: ' الرقم' },
        { field: 'invoice_id', headerName: ' رقم الفاتورة' },
        { field: 'store_name', headerName: 'اسم الشركة' },
        { field: 'total_amount', headerName: ' المجموع الكلي', },
        { field: 'payment_status', headerName: ' حالة التأكيد' },
        { field: 'updatedAt', headerName: 'تاريخ الإنشاء', width: 250 },
    ]
    const [data, setData] = useState<any>([]);
    const { data: store } = useFetchData(`http://localhost:3000/users/store/${store_id}`) as any
    const navigate = useNavigate()
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/orders/invoices')
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);
    const handleNavigate = (params: any) => {
        const id = params.row.id
        navigate(`/invoice_details/${id}`)
    }

    return (
        <MiniDrawer>
            <DataGrid rows={data?.invoices?.filter((item: any) => item.store_id == store_id)?.map((item: any) => ({
                ...item,
                id: item?.invoice_id,
                store_name: store?.store?.name,
                total_amount: "400"
            })) ?? []} columns={columns} sx={{ backgroundColor: 'white' }} onRowClick={handleNavigate} />
        </MiniDrawer>
    )
}
