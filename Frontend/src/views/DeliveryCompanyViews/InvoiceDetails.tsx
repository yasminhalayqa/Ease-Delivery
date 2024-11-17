import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import { useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const Element = ({ text, detail }: { text: string, detail: string }) => {
    return (
        <Card sx={{ boxShadow: '0', border: '1px solid #EBEBEB', marginTop: '10px' }}>
            <CardContent className="d-flex">
                <Typography fontWeight='bold' marginLeft='10px'>{detail} :</Typography>
                {text}
            </CardContent>
        </Card>
    )
}
export default function InvoiceDetails() {
    const params = useParams();
    const { data: invoice } = useFetchData(`http://localhost:3000/orders/invoice/${params.id}`) as any;
    const { data: stores } = useFetchData('http://localhost:3000/users/store') as any;
    const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any;
    const [showContent, setShowContent] = useState([true, false, false, false]);


    const handleButtonClick = (index: number) => {
        setShowContent(showContent.map((_, i) => i === index));
    };

    const buttons = [
        { text: 'الفاتورة', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        { text: ' معلومات الشركة', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        { text: 'الشحنات', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
    ];



    const deliveredOrders = orders?.orders?.filter((order: any) => order.status === 'تم التسليم' && order.invoice_id == params.id);
    const total_amount = deliveredOrders?.reduce((acc: number, cur: any) => acc + cur.total_amount, 0) || 0;
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'الرقم' },
        { field: 'order_code', headerName: 'رقم التتبع' },
        { field: 'order_id', headerName: 'رقم الفاتورة' },
        { field: 'store_name', headerName: 'اسم الشركة' },
        { field: 'status', headerName: 'الحالة' },
        { field: 'total_amount', headerName: 'المجموع الكلي' },
        { field: 'updatedAt', headerName: 'تاريخ الإنشاء', width: 250 },]

    return (
        <MiniDrawer>
            <Grid container spacing={2}>
                <Grid item xs={3} >
                    <Card>
                        <CardContent>
                            {buttons.map((button, index) => (
                                <Button
                                    key={index}
                                    fullWidth
                                    onClick={() => handleButtonClick(index)}
                                    sx={{
                                        backgroundColor: showContent[index] ? '#4b49ac' : '',
                                        color: showContent[index] ? 'white' : 'black',
                                        '&:hover': {
                                            backgroundColor: showContent[index] ? '#46489c' : '',
                                        }
                                    }}
                                >
                                    {button.icon}
                                    {button.text}
                                </Button>))}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={9}>
                    <Card className="">
                        <CardContent>
                            {showContent[0] && <>
                                <Typography variant="h5">
                                    الفاتورة
                                </Typography>
                                <Element text={invoice?.invoice?.invoice_id} detail="ID" />
                                <Element text={invoice?.invoice?.payment_status} detail="حالة الدفع" />
                                <Element text={invoice?.invoice?.createdAt} detail="تاريخ الانشاء" />
                                <Element text={invoice?.invoice?.notes} detail="ملاحظات" />
                                <Element text={total_amount} detail="الرسوم" />
                            </>}
                            {showContent[1] && <>
                                <Typography variant="h5">
                                    معلومات الشركة
                                </Typography>
                                <Element text={stores?.stores?.find((store: any) => store.id === invoice?.invoice?.store_id)?.name} detail="اسم الشركة" />
                                <Element text={stores?.stores?.find((store: any) => store.id === invoice?.invoice?.store_id)?.phone_number} detail="رقم الهاتف" />
                                <Element text={stores?.stores?.find((store: any) => store.id === invoice?.invoice?.store_id)?.address} detail="العنوان" />
                            </>}
                            {showContent[2] && <>
                                <Typography variant="h5">
                                    الشحنات
                                </Typography>
                                <DataGrid
                                    rows={deliveredOrders.map((order: any) => ({ ...order, id: order.order_id }))}
                                    columns={columns}
                                />
                            </>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </MiniDrawer>
    )
}
