import MiniDrawer from "../../components/Sidebar"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Item from "../../components/DashboardCard";
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DateRangeIcon from '@mui/icons-material/DateRange';
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
import { Line } from 'react-chartjs-2';
import useFetchData from "../../hooks/useFetchData";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import usePostData from "../../hooks/usePostData";
import { useNavigate } from "react-router-dom";

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



const StoreDashboard = () => {
    const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any
    const { data: cities } = useFetchData('http://localhost:3000/cities/cities') as any
    const { data: stores } = useFetchData('http://localhost:3000/users/store') as any
    const { data: tickets } = useFetchData('http://localhost:3000/tickets/tickets') as any


    const { postData: addReceiptRequest } = usePostData('http://localhost:3000/orders/generate-collection-receipts') as any
    const { postData: createTicket } = usePostData('http://localhost:3000/tickets/ticket') as any


    const [dialog1, setDialog1] = useState(false)

    const storeID = sessionStorage.getItem('id')

    const item = [
        {
            name: 'قيد الانتظار',
            count: orders?.orders?.filter((item: any) => item.store_id == storeID).filter((order: any) => order.status == 'تأكيد الطلب')?.length,
            icon: <PendingOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
        {
            name: 'قيد المعالجة ',
            count: orders?.orders?.filter((item: any) => item.store_id == storeID).filter((order: any) => order.status == 'قيد المعالجة')?.length,
            icon: <RepeatOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
        {
            name: 'قيد الشحن',
            count: orders?.orders?.filter((item: any) => item.store_id == storeID).filter((order: any) => order.status == 'قيد الشحن')?.length,
            icon: <LocalShippingOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
        {
            name: 'تم التسليم',
            count: orders?.orders?.filter((item: any) => item.store_id == storeID).filter((order: any) => order.status == 'تم التسليم')?.length,
            icon: <PlaylistAddCheckOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
    ];


    ;

    const cityData = cities?.cities?.map((item: any) => {
        const cityOrderCount = orders?.orders?.filter((order: any) => order.store_id === storeID && order?.customer?.city?.city_id === item.city_id)?.length ?? 0;
        return {
            name: item.name,
            orderCounts: cityOrderCount
        }
    })
    const cityName = cityData?.map((city: any) => city.name)
    const cityOrderCount = cityData?.map((city: any) => city.orderCounts)


    const cityDatas = {
        labels: cityName,
        datasets: [
            {
                label: 'الشحنات حسب المدينة',
                data: cityOrderCount,
                // fill: true,
                backgroundColor: [
                    '#554ec3',
                    '#10bfac'
                ],
                borderColor: '#f6f6f8', tension: 0.1
            }
        ]
    }

    const deliveredOrders = orders?.orders?.filter((order: any) => order.store_id == storeID && order.status == 'تم التسليم')

    // console.log(deliveredOrders);

    const store = stores?.stores?.find((store: any) => store.id == storeID);
    const delivery_company_id = store ? store.delivery_company_id : null;

    console.log(deliveredOrders);

    const generateCollectionReceipt = async () => {

        try {
            const receipt_request = {
                "order_ids": deliveredOrders.map((item: any) => item.order_id),
                "delivery_company_id": delivery_company_id,
                "store_id": storeID
            }

            const response = await addReceiptRequest(receipt_request)
            const response2 = await createTicket({
                "title": "طلب تحصيل",
                "delivery_company_id": delivery_company_id,
                "store_id": storeID,
                "description": "طلب استلام تحصيل"
            })
            console.log(response);

            setDialog1(false)
        } catch (error) {
            console.log(error);
        }

    }

    const navigate = useNavigate()
    return (
        <MiniDrawer>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {item.map((it, index) => (
                        <Item name={it.name} number={it.count} icon={it.icon} key={index} />
                    ))}
                    {/* <Grid xs={3} md={6}>
                        <Card style={{ height: '350px', width: '100%' }} className="d-flex justify-content-center align-items-center">
                            <CardContent className="w-75">
                                <Bar data={storeDatas} options={{
                                    scales: {
                                        y: {
                                            suggestedMin: 0,
                                            suggestedMax: 100
                                        }
                                    }
                                }
                                } />
                            </CardContent>
                        </Card>
                    </Grid> */}
                    <Grid xs={3} md={8}>
                        <Card style={{ height: '500px', width: '100%' }} className="d-flex justify-content-center align-items-center">
                            <CardContent className="w-100">
                                <Line data={cityDatas} options={{
                                    scales: {
                                        y: {
                                            suggestedMin: 0,
                                            suggestedMax: 10
                                        }
                                    }
                                }
                                } />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={3} md={4}>
                        <Card>
                            <CardContent sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '30px' }}>
                                <Button size="large" sx={{
                                    backgroundColor: '#28a0aa', color: 'white', '&:hover': {
                                        backgroundColor: '#127f89'
                                    }, width: '180px', borderRadius: '20px', padding: '10px'
                                }}
                                    onClick={() => setDialog1(true)}
                                >
                                    طلب استلام تحصيل
                                </Button>

                            </CardContent>
                        </Card>
                        <Card sx={{ marginTop: '20px', height: '400px', overflowY: 'scroll' }}>
                            <CardContent >
                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant="h5" textAlign="right">الدعم الفني</Typography>
                                    <Button onClick={() => navigate('/create_ticket')}> <AddIcon /></Button>
                                </Box>

                                {tickets?.tickets?.filter((item: any) => item.store_id == storeID)?.map((ticket: any) => (
                                    <Box border="1px solid #dddddd" padding="10px" marginTop="10px" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/ticket/${ticket.ticket_id}`)}>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="h6" textAlign="right" fontSize="17px">{ticket.title}</Typography>
                                            <Typography variant="h6" textAlign="right" fontSize="17px">{ticket.status}</Typography>
                                        </Box>
                                        <DateRangeIcon />{ticket.createdAt?.slice(11)} | {ticket.createdAt.slice(0, 10)}
                                    </Box>
                                ))}


                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>


            <Dialog open={dialog1} onClose={() => setDialog1(false)} sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "450px",
                    },
                },
            }}>
                <DialogTitle>طلب استلام تحصيل</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#00cfe8', margin: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>
                        طلب استلام تحصيل
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                        sx={{
                            backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                backgroundColor: '#46489c'
                            }
                            , margin: '20px'
                        }}
                        onClick={generateCollectionReceipt}
                    >
                        تأكيد
                    </Button>
                    <Button variant="contained"
                        onClick={() => setDialog1(false)}
                        sx={{
                            backgroundColor: '#ea5455', color: 'white', '&:hover': {
                                backgroundColor: '#ea5455'
                            }
                        }}
                    >
                        إلغاء
                    </Button>
                </DialogActions>
            </Dialog>

        </MiniDrawer>
    )
}

export default StoreDashboard;
