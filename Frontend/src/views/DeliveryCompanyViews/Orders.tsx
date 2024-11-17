import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import CustomButton from "../../components/CustomButton";
import Tabs from "../../components/Tabs";
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { handleExportToExcel } from "../../exportdata/ExportToExcel";
// import { handleExportToPDF } from "../../exportdata/ExportTopdf";
export default function Orders() {
    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState('الكل')
    const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any
    const { data: customers } = useFetchData('http://localhost:3000/customers/customer') as any
    const columns: GridColDef[] = [
        { field: 'order_id', headerName: 'ID', },
        { field: 'order_code', headerName: 'رقم التتبع', },
        { field: 'status', headerName: 'الحالة', },
        { field: 'customer_name', headerName: 'اسم المستلم', },
        { field: 'customer_phone', headerName: 'رقم هاتف المستلم', },
        // { field: 'customer_email', headerName: 'إيميل المستلم', },
        { field: 'city', headerName: 'مدينة المستلم', },
        { field: 'area', headerName: 'منطقة المستلم', },
        { field: 'source', headerName: 'المصدر ', },
        { field: 'store_name', headerName: 'الشركة المرسلة', },
        { field: 'total_amount', headerName: 'مبلغ التحصيل ', },
        // { field: 'qty', headerName: 'الكمية', },
        {
            field: 'view',
            headerName: 'عرض التفاصيل',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/order_details/${params.row.id}`)
                    }
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
                    // component={Link}
                    // to={`/edit_order_status/${params.row.id}`}
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/order_details_status/${params.row.id}`)
                    }
                >
                    تعديل الحالة
                </Button>
            ),
        },
    ];
    const delivery_company_id = sessionStorage.getItem('id')

    const rows = orders?.orders?.filter((item: any) => item.delivery_company_id == delivery_company_id && item.status != "قيد الانتظار").map((order: any) => ({
        ...order,
        id: order.order_id,
        customer_name: order.customer_id ? customers?.customers?.find((customer: any) => customer.customer_id === order.customer_id)?.name : '',
        customer_phone: order.customer_id ? customers?.customers?.find((customer: any) => customer.customer_id === order.customer_id)?.phone_number : '',
        customer_email: order.customer_id ? customers?.customers?.find((customer: any) => customer.customer_id === order.customer_id)?.email : '',
        city: order.customer_id ? customers?.customers?.find((customer: any) => customer.customer_id === order.customer_id)?.city : '',
        area: order.customer_id ? customers?.customers?.find((customer: any) => customer.customer_id === order.customer_id)?.area : '',


    })) ?? [];

    const handleTabChange = (selectedTab: any) => {
        setSelectedStatus(selectedTab)
    };
    const status = [
        "الكل",
        "تأكيد الطلب",
        "قيد المعالجة",
        "قيد الشحن",
        "تم التوصيل",
        "تم التسليم",
        "فشل التسليم",
        "تم الإرجاع",
    ]
    console.log(selectedStatus);
    // const handleNavigate = (params: any) => {
    //     const orderID = params.row.id
    //     navigate(`/order_details/${orderID}`)
    //     console.log(orderID);

    // }

    return (
        <MiniDrawer>
            <Grid container rowSpacing={2}>
                <Grid item xs={12} md={12} className="mb-3 mt-1">
                    <Card>
                        <CardContent className="d-flex justify-content-between align-items-center">
                            <Typography variant="h6">
                                الشحنات
                            </Typography>
                            <Box sx={{ display: 'flex' }}>
                                <CustomButton text='شحنة جديدة' bg='#23af62' hoverBg='#2bb569' onClick={() => navigate('/create_order')} />
                                {/* <CustomButton text='تصدير pdf ' bg='#4b49ac' hoverBg='#46489c' onClick={() => handleExportToPDF({ data: rows, fileName: 'orders' })} /> */}
                                <CustomButton text='تصدير إكسل ' bg='#4b49ac' hoverBg='#46489c' onClick={() => handleExportToExcel({ data: rows, fileName: 'orders' })} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>


                <Tabs labels={status ?? []} contents={[
                    <DataGrid
                        key="data-grid"
                        rows={selectedStatus === 'الكل' ? rows : rows.filter((item: any) => item.status === selectedStatus)}
                        columns={columns}
                    // onRowClick={handleNavigate}
                    />]
                    ?? []}
                    onTabChange={handleTabChange}
                    defualtValue='الكل'
                />
            </Grid>
        </MiniDrawer>
    )
}
