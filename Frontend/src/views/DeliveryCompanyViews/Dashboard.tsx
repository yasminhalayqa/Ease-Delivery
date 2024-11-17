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
import { Bar, Line } from 'react-chartjs-2';
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

const Dashboard = () => {
    const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any
    const { data: stores } = useFetchData('http://localhost:3000/users/store') as any
    const { data: cities } = useFetchData('http://localhost:3000/cities/cities') as any
    const delivery_company_id = sessionStorage.getItem('id')



    const item = [
        {
            name: 'قيد الانتظار',
            count: orders?.orders?.filter((order: any) => order.delivery_company_id == delivery_company_id)?.filter((order: any) => order.status == 'قيد الانتظار')?.length,
            icon: <PendingOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
        {
            name: 'قيد المعالجة ',
            count: orders?.orders?.filter((order: any) => order.delivery_company_id == delivery_company_id)?.filter((order: any) => order.status == 'قيد المعالجة')?.length,
            icon: <RepeatOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
        {
            name: 'تم الشحن',
            count: orders?.orders?.filter((order: any) => order.delivery_company_id == delivery_company_id)?.filter((order: any) => order.status == 'قيد الشحن')?.length,
            icon: <LocalShippingOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
        {
            name: 'تم التسليم',
            count: orders?.orders?.filter((order: any) => order.delivery_company_id == delivery_company_id)?.filter((order: any) => order.status == 'تم التسليم')?.length,
            icon: <PlaylistAddCheckOutlinedIcon sx={{ color: "#f6f6f8" }} />
        },
    ];

    const storeData = stores?.stores?.map((item: any) => {
        const storeOrder = orders?.orders?.filter((order: any) => order.delivery_company_id == delivery_company_id).filter((order: any) => order.store_id == item.id)
        console.log(storeOrder);

        return {
            name: item.name,
            ordersCount: storeOrder?.length
        }

    })
    const storeNames = storeData?.map((store: any) => store.name);
    const ordersCount = storeData?.map((store: any) => store.ordersCount);


    const cityData = cities?.cities?.filter((city: any) => city.delivery_company_id == delivery_company_id)?.map((item: any) => {
        const cityOrderCount = orders?.orders?.filter((order: any) => order.delivery_company_id == delivery_company_id).filter((order: any) => order?.customer?.city?.city_id == item.city_id)?.length ?? 0;
        return {
            name: item.name,
            orderCounts: cityOrderCount
        }
    })
    const cityName = cityData?.map((city: any) => city.name)
    const cityOrderCount = cityData?.map((city: any) => city.orderCounts)

    console.log(cityData);

    const storeDatas = {
        labels: storeNames,
        datasets: [
            {
                label: 'الشحنات حسب الشركة التجارية',
                data: ordersCount,
                // fill: true,
                backgroundColor: [
                    '#554ec3',
                    '#10bfac'
                ],
                borderColor: '#f6f6f8', tension: 0.1
            }
        ]
    };
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
                borderColor: '#B8B8B8', tension: 0.1
            }
        ]
    }
    return (
        <MiniDrawer>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {item.map((it, index) => (
                        <Item name={it.name} number={it.count} icon={it.icon} key={index} />
                    ))}
                    <Grid xs={3} md={6}>
                        <Card style={{ height: '350px', width: '100%' }} className="d-flex justify-content-center align-items-center">
                            <CardContent className="w-100">
                                <Bar data={storeDatas} options={{
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
                    <Grid xs={3} md={6}>
                        <Card style={{ height: '350px', width: '100%' }} className="d-flex justify-content-center align-items-center">
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
                    {/* <Grid xs={3} md={12}>
                        <DataGrid rows={rows} columns={columns} sx={{ backgroundColor: 'white' }} hideFooterPagination hideFooter />
                    </Grid> */}
                </Grid>
            </Box>
        </MiniDrawer>
    )
}

export default Dashboard;
