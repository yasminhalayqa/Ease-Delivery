import { Card, CardContent, Grid, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";


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
export default function StoreInvoiceDetails() {
    const params = useParams()
    const { data: invoice } = useFetchData(`http://localhost:3000/orders/invoice/${params.id}`) as any
    console.log(invoice);

    return (
        <MiniDrawer>
            <Grid container spacing={2}>
                <Grid item xs={3} >
                    <Card sx={{ position: 'fixed', width: '220px' }}>
                        <CardContent>
                            <Typography variant="h5">
                                الشحنة
                            </Typography>
                            {/* <Element text="yaso" detail="ID" /> */}
                            <Element text={invoice?.invoice?.order_id} detail="رقم الشحنة" />
                            <Element text={invoice?.invoice?.order?.total_amount} detail=" مبلغ التحصيل" />

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={9}>
                    <Card className="">
                        <CardContent>
                            <Typography variant="h5">
                                الفاتورة
                            </Typography>
                            <Element text={invoice?.invoice?.invoice_id} detail="ID" />
                            <Element text={invoice?.invoice?.invoice_id} detail="رقم الفاتورة" />
                            <Element text={invoice?.invoice?.payment_status} detail="الحالة" />
                            <Element text={invoice?.invoice?.order?.notes} detail="ملاحظات" />
                            <Element text={invoice?.invoice?.payment_status} detail="حالة التأكيد" />
                            <Element text={invoice?.invoice?.updatedAt} detail="تاريخ التأكيد" />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card>

            </Card>
        </MiniDrawer>
    )
}