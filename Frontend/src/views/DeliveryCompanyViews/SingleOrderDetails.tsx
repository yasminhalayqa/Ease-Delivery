import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import { useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
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
export default function SingleOrderDetails() {
    const params = useParams()
    const { data: order } = useFetchData(`http://localhost:3000/orders/order/${params.id}`) as any

    console.log(order?.order);

    const [showContent, setShowContent] = useState([true, false, false, false])

    const handleButtonClick = (index: number) => {
        setShowContent(showContent.map((_, i) => i === index));
    };

    const buttons = [
        { text: 'الشحنة', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        { text: ' معلومات المرسل', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        { text: ' معلومات المستلم', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        // { text: ' الدعم الفني', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },


    ];
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
                                    الشحنة
                                </Typography>
                                <Element text={order?.order?.order_id} detail="ID" />
                                <Element text={order?.order?.order_code} detail="رقم التتبع" />
                                <Element text={order?.order?.status} detail="الحالة" />
                                <Element text={order?.order?.notes} detail="ملاحظات" />
                                <Element text={order?.order?.total_amount} detail="الرسوم" />
                                <Element text={order?.order?.customer?.city?.shipping_fees} detail="رسوم التوصيل" />
                                <Element text={order?.order?.order_id} detail="الفاتورة" />
                            </>}
                            {showContent[1] && <>
                                <Typography variant="h5">
                                    معلومات المرسل
                                </Typography>
                                <Element text={order?.order?.store_name} detail="اسم الشركة" />
                                <Element text={order?.order?.store_phone} detail="رقم الهاتف" />
                                <Element text={order?.order?.source} detail="المكتب" />
                            </>}
                            {showContent[2] && <>
                                <Typography variant="h5">
                                    معلومات المستلم
                                </Typography>
                                <Element text={order?.order?.customer?.name} detail="اسم المستلم" />
                                <Element text={order?.order?.customer?.phone_number} detail="رقم الهاتف المستلم" />
                                <Element text={order?.order?.customer?.email} detail="إيميل المستلم" />
                                <Element text={order?.order?.customer?.city?.name} detail="المدينة" />
                                <Element text={order?.order?.customer?.area?.name} detail="المنطقة" />
                                <Element text={order?.order?.total_amount} detail="مبلغ التحصيل شامل التوصيل" />
                                {/* <Element text={customer?.response?.name} detail="المستلم أجنبي؟" /> */}
                            </>}
                            {/* {showContent[3] && <>
                                <Typography variant="h5">
                                    معلومات المستلم
                                </Typography>
                                <Element text="yaso" detail="اسم المستلم" />
                                <Element text="yaso" detail="رقم الهاتف المستلم" />
                                <Element text="yaso" detail="المدينة" />
                                <Element text="yaso" detail="المنطقة" />
                                <Element text="yaso" detail="مبلغ التحصيل شامل التوصيل" />
                                <Element text="yaso" detail="المستلم أجنبي؟" />
                            </>} */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card>

            </Card>
        </MiniDrawer>
    )
}