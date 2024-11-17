import { Box, Button, Card, CardContent, CircularProgress, Grid, Select, TextField, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePutData from "../../hooks/usePutData";

export default function ConfirmOrder() {
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [city, setCity] = useState('')
    const [area, setArea] = useState('')
    const [salesmanPhone, setSalesmanPhone] = useState('')
    const [salesmanID, setSalesmanID] = useState('')
    const [salesmanAddress, setSalesmanAddress] = useState('')


    const params = useParams()
    const navigate = useNavigate()
    const { putData: addOrder, loading } = usePutData(`http://localhost:3000/orders/order/${params.id}`) as any
    const { data: salesman } = useFetchData('http://localhost:3000/users/salesman') as any

    const { data: order } = useFetchData(`http://localhost:3000/orders/order/${params.id}`) as any

    const orderData = {
        "status": "تأكيد الطلب",
        "salesman_id": salesmanID,
        "salesman_phone": salesmanPhone,
    }
    const handleEditOrder = async () => {

        try {

            const response = await addOrder(orderData)
            console.log(response);

            navigate('/orders')
        } catch (error) {
            console.log(error);
        }
    }

    const handleSalesmanChange = (event: any) => {
        const selectedSalesmanID = event.target.value;
        setSalesmanID(selectedSalesmanID)
        const selectedSalesman = salesman.salesMen.find((item: any) => item.id === selectedSalesmanID)
        if (selectedSalesman) {
            setSalesmanPhone(selectedSalesman.phone_number)
            setSalesmanAddress(selectedSalesman.city.name)
        }
    }
    console.log(salesman);

    return (
        <MiniDrawer>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} className="mb-3 mt-1">
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    الشحنات
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant="h6" className="border-bottem-0" sx={{ borderBottom: "1px solid #ccc" }}>
                                            معلومات مندوب التوصيل
                                        </Typography>
                                        <Box className="d-flex justify-content-between ">
                                            <FormControl sx={{ m: 1, minWidth: 270 }} size="small">
                                                <Typography fontSize='1.1rem' className="border-bottem-0 " color='grey'>
                                                    الاسم
                                                </Typography>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    label="Age"
                                                    onChange={(e) => handleSalesmanChange(e)}
                                                    value={salesmanID}
                                                >
                                                    {salesman?.salesMen?.map((item: any, index: number) => (
                                                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Box>
                                                <Typography fontSize='1.1rem' className="border-bottem-0 mt-2" color='grey'>
                                                    رقم الهاتف
                                                </Typography>
                                                <TextField id="outlined-basic" variant="outlined" size="small" className=" w-100"
                                                    value={salesmanPhone}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography fontSize='1.1rem' className="border-bottem-0 mt-2" color='grey'>
                                                    العنوان
                                                </Typography>
                                                <TextField id="outlined-basic" variant="outlined" size="small" className=" w-100"
                                                    value={salesmanAddress} />
                                            </Box>
                                            <Box></Box>
                                        </Box>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant="h6" className="border-bottem-0" sx={{ borderBottom: "1px solid #ccc" }}>
                                            معلومات المستلم
                                        </Typography>

                                        <>
                                            <Box className="d-flex justify-content-between ">
                                                <Box>
                                                    <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                        الاسم
                                                    </Typography>
                                                    <TextField id="outlined-basic" variant="outlined" size="small" className=" w-100"
                                                        value={order?.order?.customer?.name}
                                                        required
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                        رقم الهاتف
                                                    </Typography>
                                                    <TextField id="outlined-basic" variant="outlined" size="small" className=" w-100"
                                                        value={order?.order?.customer?.phone_number}
                                                        required
                                                    />
                                                </Box>

                                                <Box>
                                                    <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                        المدينة
                                                    </Typography>
                                                    <TextField id="outlined-basic" variant="outlined" size="small" className=" w-100"
                                                        value={order?.order?.customer?.city?.name}
                                                        required
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                        المنطقة
                                                    </Typography>
                                                    <TextField id="outlined-basic" variant="outlined" size="small" className=" w-100"
                                                        value={order?.order?.customer?.area?.name}
                                                        required
                                                    />
                                                </Box>
                                            </Box>

                                        </>


                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12} >
                        <Card className="p-2">
                            <CardContent>
                                <Button variant="contained"
                                    onClick={handleEditOrder}
                                    sx={{
                                        backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                            backgroundColor: '#46489c'
                                        }
                                    }}
                                >{loading ? <CircularProgress color="secondary" /> : <>  تأكيد حالة الشحنة</>}

                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

            </Box>

        </MiniDrawer >
    )
}
