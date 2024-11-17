import { Button } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePutData from "../../hooks/usePutData";
import useFetchData from "../../hooks/useFetchData";

export default function Invoices() {
    const { data: stores } = useFetchData('http://localhost:3000/users/store') as any;
    const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'الرقم' },
        { field: 'invoice_id', headerName: 'رقم الفاتورة' },
        { field: 'store_name', headerName: 'اسم الشركة' },
        { field: 'total_amount', headerName: 'المجموع الكلي' },
        { field: 'payment_status', headerName: 'حالة التأكيد' },
        { field: 'updatedAt', headerName: 'تاريخ الإنشاء', width: 250 },
        {
            field: 'view',
            headerName: 'عرض تفاصيل الفاتورة',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate({ pathname: `/invoice_details/${params.row.id}` })}
                >
                    عرض التفاصيل
                </Button>
            ),
        },
        {
            field: 'edit',
            headerName: 'تعديل الحالة',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditInvoiceStatus(params.row.invoice_id)}
                >
                    تأكيد حالة الدفع
                </Button>
            ),
        },
    ];

    const [data, setData] = useState<any>([]);
    const [invoice_id, setInvoiceId] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/orders/invoices');
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getStoreNameById = (storeId: number) => {
        const store = stores?.stores?.find((store: any) => store.id === storeId);

        return store ? store?.name : 'Unknown Store';

    };
    const calculateTotalAmount = (invoiceID: number) => {
        const deliveredOrders = orders?.orders?.filter((order: any) => order.status === 'تم التسليم' && order.invoice_id === invoiceID);
        return deliveredOrders?.reduce((acc: number, cur: any) => acc + cur.total_amount, 0) || 0;
    };

    const { putData: editInvoiceStatus } = usePutData(`http://localhost:3000/orders/invoice_status/${invoice_id}`) as any;

    const handleEditInvoiceStatus = async (invoice_id: string) => {
        setInvoiceId(invoice_id);
        try {
            const response = await editInvoiceStatus({ payment_status: 'مغلق' });
            fetchData();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const delivery_company_id = sessionStorage.getItem('id');
    const rows = data?.invoices?.filter((item: any) => item.delivery_company_id == delivery_company_id)?.map((item: any) => ({
        ...item,
        id: item?.invoice_id,
        store_name: getStoreNameById(item?.store_id),
        total_amount: calculateTotalAmount(item?.invoice_id)
    })) ?? []
    return (
        <MiniDrawer>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{ backgroundColor: 'white' }}
                disableRowSelectionOnClick
            />
        </MiniDrawer>
    );
}
