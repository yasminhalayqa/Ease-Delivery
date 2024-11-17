import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import { useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useFetchData from "../../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
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
export default function SingleTicket() {
    const params = useParams()
    const { data: ticket } = useFetchData(`http://localhost:3000/tickets/ticket/${params.id}`) as any
    const { data: stores } = useFetchData(`http://localhost:3000/users/store`) as any


    console.log(ticket?.ticket);

    const [showContent, setShowContent] = useState([true, false, false, false])

    const handleButtonClick = (index: number) => {
        setShowContent(showContent.map((_, i) => i === index));
    };

    const buttons = [
        { text: 'الدعم الفني', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        { text: ' معلومات الشركة', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        { text: 'مكتب الشركة', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> },
        // { text: ' الدعم الفني', icon: <ErrorOutlineIcon sx={{ width: '20px', marginLeft: '10px' }} /> }

    ];
    const storeID = sessionStorage.getItem('id')
    const store = stores?.stores?.find((item: any) => item.id == storeID)
    const navigate = useNavigate()
    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent className="d-flex">
                    <Typography variant="h5">{ticket?.ticket?.title}</Typography>
                    <Button variant="contained"
                        onClick={() => navigate(`/edit_ticket/${ticket?.ticket?.ticket_id}`)}
                        sx={{
                            backgroundColor: '#7367f0', color: 'white', marginRight: '20px', '&:hover': {
                                backgroundColor: '#6d5fe1'
                            }
                        }}
                    >
                        تعديل
                    </Button>
                </CardContent>
            </Card>
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
                                    الدعم الفني
                                </Typography>
                                <Element text={ticket?.ticket?.ticket_id} detail="ID" />
                                <Element text={ticket?.ticket?.title} detail="العنوان" />
                                <Element text={ticket?.ticket?.description} detail="الوصف" />
                                <Element text={ticket?.ticket?.status} detail="الحالة" />
                                <Element text={ticket?.ticket?.createdAt} detail="تاريخ الانشاء" />
                            </>}
                            {showContent[1] && <>
                                <Typography variant="h5">
                                    معلومات الشركة
                                </Typography>
                                <Element text={store?.name} detail="اسم الشركة" />
                                <Element text={store?.phone_number} detail="رقم الهاتف" />
                                <Element text={store?.address} detail="المكتب" />
                            </>}
                            {showContent[2] && <>
                                <Typography variant="h5">
                                    مكتب الشركة
                                </Typography>
                                <Element text={store?.city?.name} detail="مكتب الشركة" />

                            </>}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card>

            </Card>
        </MiniDrawer>
    )
}