import { Button, Card, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useFetchData from "../../hooks/useFetchData";

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

export default function InquiryConsignee() {
    // const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false); // Add state for phone error
    const { data: customers } = useFetchData('http://localhost:3000/customers/customer') as any;
    const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any;
    const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
    const [UndeliveredOrdersCount, setUndeliveredOrdersCount] = useState(0);
    const [emptyData, setEmptyData] = useState(true);
    const delivery_company_id = sessionStorage.getItem('id');

    const search = () => {
        if (!phone) {
            setPhoneError(true);
            return;
        }
        // setLoading(true);
        setPhoneError(false);

        const customer = customers?.customers
            ?.filter((item: any) => item.delivery_company_id == delivery_company_id)
            .find((item: any) => item.phone_number == phone);

        const customerOrders = orders?.orders
            ?.filter((item: any) => item.customer_id == customer?.customer_id);

        const deliveredCount = customerOrders?.filter((item: any) => item.status == 'تم التسليم')?.length ?? 0;
        const undeliveredCount = customerOrders?.filter((item: any) => item.status == 'فشل التسليم' || 'تم الإرجاع')?.length ?? 0;

        setDeliveredOrdersCount(deliveredCount);
        setUndeliveredOrdersCount(undeliveredCount);
        setEmptyData(deliveredCount == 0 && undeliveredCount == 0);
        // setLoading(false);
    };

    const data = {
        labels: ['تم التسليم', 'فشل التسليم'],
        datasets: [
            {
                label: 'Sales',
                data: [deliveredOrdersCount, UndeliveredOrdersCount],
                backgroundColor: ['#554ec3', '#10bfac'],
                borderColor: '#f6f6f8',
                tension: 0.1
            }
        ]
    };

    useEffect(() => {
        setEmptyData(deliveredOrdersCount == 0 && UndeliveredOrdersCount == 0);
    }, [deliveredOrdersCount, UndeliveredOrdersCount]);

    return (
        <MiniDrawer>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        إحصائيات عن رقم الهاتف
                    </Typography>
                </CardContent>
            </Card>
            <Card className="mt-3">
                <CardContent className="d-flex justify-content-between">
                    <TextField
                        size="small"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        error={phoneError}
                        helperText={phoneError ? 'يجب ادخال رقم الهاتف ' : ''}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#4b49ac',
                            '&:hover': { backgroundColor: '#46489c' },
                            marginRight: '5px'
                        }}
                        onClick={search}
                        // disabled={loading}
                    >
                       <SearchOutlinedIcon />
                    </Button>
                </CardContent>
            </Card>
            <Card className="mt-3">
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    {emptyData ? (
                        <Typography>لا يوجد بيانات لعرضها</Typography>
                    ) : (
                        <div style={{ width: '300px' }}>
                            <Doughnut data={data} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </MiniDrawer>
    );
}
