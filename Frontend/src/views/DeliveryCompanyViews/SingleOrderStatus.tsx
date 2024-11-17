import { Box, Button, Card, CardContent, Checkbox, CircularProgress, Grid, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePutData from "../../hooks/usePutData";
import OrderPDF from "../../exportdata/ExportTopdf";

const StatusItem = ({ text, variable, bg }: { text: string; variable: string, bg: string }) => {
    return (
        <div style={{ textAlign: 'center', width: '250px' }}>
            <Card
                style={{
                    background: variable === 'jasmin' ? `linear-gradient(to right, #c7c3b6 50%, #fbc64b 50%)` : `${bg}`,
                    borderRadius: '50px',
                    height: '12px',
                    margin: '5px'
                }}
            ></Card>
            <Typography variant="body1" textAlign='right' margin="10px" >{text}</Typography>
        </div>
    );
}

export default function SingleOrderStatus() {
    const params = useParams()
    const [buttonText, setButtonText] = useState('')
    const { data: order } = useFetchData(`http://localhost:3000/orders/order/${params.id}`) as any
    const { putData: editStatus, loading } = usePutData(`http://localhost:3000/orders/order_status/${params.id}`) as any
    const { data: orderStatus } = useFetchData(`http://localhost:3000/orders/order_status_tracking`) as any
    const [check, setCheck] = useState(false)

    const statuses = [
        {
            id: '1',
            name: 'تأكيد الطلب'
        },
        {
            id: '2',
            name: 'قيد المعالجة'
        },
        {
            id: '3',
            name: 'قيد الشحن'
        },
        {
            id: '4',
            name: 'تم التوصيل'
        },
        {
            id: '5',
            name: 'تم التسليم'
        }
    ]
    useEffect(() => {
        if (order?.order?.status) {
            const index = statuses.findIndex(status => status.name === order?.order?.status)
            setButtonText(index !== -1 ? statuses[index + 1]?.name : order?.order?.status)
        }
    }, [order])
    const updateStatus = async () => {
        const index = statuses.findIndex(status => status.name === order?.order?.status)
        const nextStatus = statuses[index + 1]?.name;

        try {
            if (order?.order?.status === "فشل التسليم") {
                const response = await editStatus({ status: "تم الإرجاع" })
            } else {
                const response = await editStatus({ status: check ? "فشل التسليم" : nextStatus })
            }

            // console.log(response);
            location.reload()
        } catch (error) {
            console.log(error);

        }
    }
    const processingTime = 1;
    const shippingTime = 2;
    const currentDate = new Date();
    const expectedShippingDate = new Date(currentDate.getTime() + (processingTime + shippingTime) * 24 * 60 * 60 * 1000);
    console.log(orderStatus?.orders?.filter((item: any) => item.order_id == params.id));
    const orderStatusTracking = orderStatus?.orders?.filter((item: any) => item.order_id == params.id)

    return (
        <MiniDrawer>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card>
                        <CardContent>
                            التقدم
                            <Box sx={{ display: 'flex' }}>
                                {statuses.map((status, index) => (
                                    <StatusItem
                                        key={status.id}
                                        text={status?.name}
                                        bg={
                                            status?.name === order?.order?.status && status?.name !== 'تم التسليم'
                                                ? 'linear-gradient(to right, #c7c3b6 50%, #fbc64b 50%)'
                                                : status?.name === order?.order?.status && 'تم التسليم' ? "#18ae4f"
                                                    : index < statuses.findIndex(s => s.name === order?.order?.status)
                                                        ? '#18ae4f'
                                                        : '#c7c3b6'
                                        }
                                        variable=""
                                    />
                                ))}
                            </Box>
                        </CardContent>
                        {order?.order?.status === 'فشل التسليم' || order?.order?.status === 'تم الإرجاع' ? <div></div> : (<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}  >
                                <Button
                                    // fullWidth
                                    variant="contained"
                                    size="large"
                                    // color="info"
                                    disabled={loading || order?.order?.status === 'تم التسليم'}
                                    className='m-3'
                                    sx={{
                                        backgroundColor: '#4b49ac', '&:hover': {
                                            backgroundColor: '#46489c'
                                        }
                                    }
                                    }
                                    onClick={updateStatus}
                                >

                                    {loading ? <CircularProgress size={24} color="inherit" /> : `اضغط هنا لجعلها جاهزة لعملية ${buttonText === undefined ? '' : buttonText}`}
                                </Button>
                            </Box>
                            <Button
                                // fullWidth
                                // variant=""

                                size="large"
                                // disabled={loading}
                                className='m-3'
                                // sx={{
                                //     backgroundColor: '#4b49ac', '&:hover': {
                                //         backgroundColor: '#46489c'
                                //     }
                                // }
                                // }
                                // onClick={login}
                                sx={{ border: '1px solid #c7c3b6' }}
                            >
                                {orderStatusTracking?.find((item: any) => item.status === 'تم التسليم') ? <div className="d-flex">
                                    <Typography variant="body2" color="#7b7a79" marginLeft={2}>تم التسليم بتاريخ </Typography>
                                    <Typography color="#7b7a79" fontWeight="bold">{orderStatusTracking?.find((item: any) => item.status === 'تم التسليم')?.timestamp.slice(0, 10)}</Typography>
                                </div> : <div className="d-flex">
                                    <Typography variant="body2" color="#7b7a79" marginLeft={2}>التاريخ المتوقع لعملية التسليم : </Typography>
                                    <Typography color="#7b7a79" fontWeight="bold">{expectedShippingDate.toLocaleDateString()}</Typography>
                                </div>}

                            </Button>
                        </Box>)}

                    </Card>
                    {order?.order?.status === 'تم التسليم' ? <></> : <Card className="mt-4">
                        <CardContent>
                            {order?.order?.status === 'تم الإرجاع' ? <div></div> : <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                <Checkbox value={check} onChange={() => setCheck(!check)} />  <Typography>حدث خلل أثناء عملية التسليم</Typography>
                                {check && <Button
                                    // fullWidth
                                    variant="contained"
                                    size="large"
                                    // color="info"
                                    // disabled={loading || order?.order?.status === 'تم التسليم'}
                                    className='m-3'
                                    sx={{
                                        backgroundColor: '#4b49ac', '&:hover': {
                                            backgroundColor: '#46489c'
                                        }
                                    }
                                }
                                    onClick={updateStatus}
                                >

                                    {loading ? <CircularProgress size={24} color="inherit" /> : `اضغط هنا لتغيير حالة الشحنة الى فشل التسليم`}
                                </Button>
                                }
                            </Box>}

                        </CardContent>
                    </Card>}

                    <Card className="mt-4">
                        <CardContent>
                            {order?.order?.status === 'فشل التسليم' ? <div>عملية تسليم فاشلة
                                <Button
                                    // fullWidth
                                    variant="contained"
                                    size="large"
                                    // color="info"
                                    // disabled={loading || order?.order?.status === 'تم التسليم'}
                                    className='m-3'
                                    sx={{
                                        backgroundColor: '#4b49ac', '&:hover': {
                                            backgroundColor: '#46489c'
                                        }
                                    }
                                    }
                                    onClick={updateStatus}
                                >

                                    {loading ? <CircularProgress size={24} color="inherit" /> : `اضغط هنا في حال تم إرجاع الطلبية إلى مصدرها `}
                                </Button>

                            </div> : (
                                <div className="timeline-container">
                                    <ul className="tl">
                                        {orderStatusTracking?.map((item: any, index: number) => (
                                            <li key={index}>
                                                <div className="item-icon"></div>
                                                <div className="item-text">
                                                    <div className="item-title">{item.status}</div>
                                                    {item.status === 'فشل التسليم' ? <></> :
                                                        <div className="item-detail">تم {item.status} بنجاح</div>

                                                    }
                                                </div>
                                                <div className="item-timestamp">
                                                    {item.timestamp.slice(0, 10)}<br /> {item.timestamp.slice(10)}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">الدفع</Typography>
                            <Box display="flex" justifyContent="space-between" marginTop="10px">
                                <Typography variant="body1" color="#8D8D8D">المجموع</Typography>
                                <Typography variant="body2" color="#8D8D8D">{order?.order?.total_amount - order?.order?.customer?.city?.shipping_fees} ₪</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" marginTop="10px">
                                <Typography variant="body1" color="#8D8D8D">رسوم التوصيل</Typography>
                                <Typography variant="body2" color="#8D8D8D">{order?.order?.customer?.city?.shipping_fees}₪</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" marginTop="10px">
                                <Typography variant="body1" color="#8D8D8D" fontWeight="bold">المجموع الكلي</Typography>
                                <Typography variant="body2" color="#8D8D8D">{order?.order?.total_amount} ₪</Typography>
                            </Box>

                        </CardContent>
                    </Card>
                    <Card className="mt-1">
                        <CardContent>
                            <OrderPDF orderData={order} />
                        </CardContent>
                    </Card>
                    <Card className="mt-4">
                        <CardContent>
                            <Typography variant="h5">معلومات المستلم</Typography>

                            <Typography variant="body1" color="#8D8D8D" marginTop="15px">{order?.order?.customer?.name}</Typography>
                            <Typography variant="body2" color="#8D8D8D" marginTop="15px">{order?.order?.customer?.email}</Typography>
                            <Typography variant="body1" color="#8D8D8D" marginTop="15px">{order?.order?.customer?.phone_number}</Typography>
                            {/* <Typography variant="body2" color="#8D8D8D" marginTop="15px">العنوان</Typography> */}
                            <Typography variant="body1" color="#8D8D8D" fontWeight="bold" marginTop="15px">{order?.order?.customer?.city?.name}</Typography>
                            <Typography variant="body2" color="#8D8D8D" marginTop="15px">{order?.order?.customer?.area?.name}</Typography>
                            {/* <Typography variant="body2" color="#8D8D8D" marginTop="15px">شارع مدريد</Typography> */}


                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </MiniDrawer>

    )
}