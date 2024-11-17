import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
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

export default function StoreInquiryConsignee() {

    // const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState(false); // Add state for phone error
    const { data: customers } = useFetchData('http://localhost:3000/customers/customer') as any;
    const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any;
    const [deliveredOrdersCount, setDeliveredOrdersCount] = useState('')
    const [UndeliveredOrdersCount, setUnDeliveredOrdersCount] = useState('')
    const [emptyData, setEmptyData] = useState(false)

    const search = () => {
        if (!phone) {
            setPhoneError(true);
            return;
        }
        setPhoneError(false);

        const customer = customers?.customers?.find((item: any) => item.phone_number === phone);
        const customerOrders = orders?.orders?.filter((item: any) => item.customer_id === customer?.customer_id);
        setDeliveredOrdersCount(customerOrders?.filter((item: any) => item.status === 'تم التسليم')?.length ?? 0)
        setUnDeliveredOrdersCount(customerOrders?.filter((item: any) => item.status === 'فشل التسليم')?.length ?? 0)
    }

    const data = {
        labels: [' تم النسليم', 'فشل التسليم',],
        datasets: [
            {
                label: 'Sales',
                data: [deliveredOrdersCount, UndeliveredOrdersCount],
                // fill: true,
                backgroundColor: [
                    '#554ec3',
                    '#10bfac'
                ],
                borderColor: '#f6f6f8', tension: 0.1
            }
        ]
    };
    useEffect(() => {
        if (!deliveredOrdersCount && !UndeliveredOrdersCount) {
            setEmptyData(true);
        } else {
            setEmptyData(false);
        }
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
                    <TextField size="small" fullWidth value={phone} onChange={(e) => { setPhone(e.target.value) }}
                        required
                        error={phoneError}
                        helperText={phoneError ? 'يجب ادخال رقم الهاتف ' : ''} />
                    <Button
                        // fullWidth
                        variant="contained"
                        // size="large"
                        // disabled={loading}
                        sx={{
                            backgroundColor: '#4b49ac', '&:hover': {
                                backgroundColor: '#46489c'
                            }, marginRight: '5px'
                        }
                        }
                        onClick={search}
                    >
                        <SearchOutlinedIcon />
                    </Button>
                </CardContent>
            </Card>
            <Card className="mt-3">
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    {emptyData ? <div>لا يوجد بيانات لعرضها</div> : <div style={{ width: '300px' }}>
                        <Doughnut data={data} />
                    </div>}
                </CardContent>
            </Card>
        </MiniDrawer>
    )
}