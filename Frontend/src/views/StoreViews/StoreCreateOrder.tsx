import { Box, Button, Card, CardContent, CircularProgress, Grid, Select, TextField, Typography } from "@mui/material";
import MiniDrawer from "../../components/Sidebar";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import usePostData from "../../hooks/usePostData";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StoreCreateOrder() {
    const [customerName, setCustomerName] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [city, setCity] = useState('')
    const [area, setArea] = useState('')
    const [type, setType] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [notes, setNotes] = useState('')
    const [qty, setQty] = useState('')
    const [newCustomer, setNewCustomer] = useState(false)
    const [customerID, setCustomerID] = useState('')

    const store_id = sessionStorage.getItem('id')


    const navigate = useNavigate()
    const { postData: addOrder, loading } = usePostData('http://localhost:3000/orders/order') as any
    const { postData: addCustomer } = usePostData('http://localhost:3000/customers/customer') as any
    const { data: store } = useFetchData(`http://localhost:3000/users/store/${store_id}`) as any
    const { data: cutomers } = useFetchData('http://localhost:3000/customers/customer') as any
    const { data: cities } = useFetchData('http://localhost:3000/cities/cities') as any
    const { data: areas } = useFetchData('http://localhost:3000/areas/areas') as any
    const { data: orderTypes } = useFetchData('http://localhost:3000/order_types/order_type') as any
    console.log(store?.store?.name);



    const orderCode = `${store?.store?.name?.slice(0, 4).toUpperCase()}${customerPhone?.slice(-3)}`
    useEffect(() => {
        const selectedCustomer = cutomers?.customers?.find((item: any) => item.phone_number === customerPhone)
        setCustomerID(selectedCustomer?.customer_id)
        setCity(selectedCustomer?.city_id)
    }, [customerPhone])

    // console.log(customerID);
    const shippingFees = cities?.cities?.find((item: any) => item.city_id === city)?.shipping_fees

    console.log(store_id);
    
    const orderData = {
        "order_code": orderCode,
        // "deliver_date": "2019-04-28T14:45:15",
        "status": "قيد الانتظار",
        "order_type_id": type,
        "source": store?.store?.address,
        "store_name": store?.store?.name,
        "total_amount": totalAmount,
        "notes": notes,
        "qty": qty,
        "store_id": store_id,
        "store_phone": store?.store?.phone_number,
        "customer_id": customerID,
        "shipping_fees": shippingFees,
        "delivery_company_id": store?.store?.delivery_company_id
    }
    console.log(orderData);

    const handleCreateOrder = async () => {
        try {
            if (newCustomer) {
                const customerData = {
                    name: customerName,
                    email: customerEmail,
                    phone_number: customerPhone,
                    city_id: city,
                    area_id: area
                }

                const newCustomerResponse = await addCustomer(customerData)
                console.log(newCustomerResponse.data);
                if (newCustomerResponse.status === 200) {
                    const customer_id = newCustomerResponse.data.customer.customer_id
                    console.log(customer_id);
                    orderData.customer_id = customer_id
                }
            }

            const response = await addOrder(orderData)
            console.log(response);
            navigate('/store/orders')
        } catch (error) {
            console.log(error);
        }
    }


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
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant="h6" className="border-bottem-0" sx={{ borderBottom: "1px solid #ccc" }}>
                                            معلومات المرسل
                                        </Typography>
                                        <Box className='d-flex flex-wrap'>
                                            <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                                                <Typography fontSize='1.1rem' className="border-bottem-0 " color='grey'>
                                                    الشركة
                                                </Typography>
                                                <TextField value={store?.store?.name} size="small" />
                                            </FormControl>
                                            <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                                                <Typography fontSize='1.1rem' className="border-bottem-0 " color='grey'>
                                                    عنوان الشركة
                                                </Typography>
                                                <TextField value={store?.store?.address} size="small" />
                                            </FormControl>
                                            <Box>
                                                <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                    رقم هاتف الشركة
                                                </Typography>
                                                <TextField id="outlined-basic" variant="outlined" size="small" className=" w-100"
                                                    value={store?.store?.phone_number} />
                                            </Box>
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
                                        <Box>
                                            <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                رقم الهاتف
                                            </Typography>
                                            <TextField id="outlined-basic" variant="outlined" size="small" className=" w-75"
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                value={customerPhone} />
                                            <Button variant="contained"
                                                onClick={() => setNewCustomer(true)}
                                                sx={{
                                                    backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                                        backgroundColor: '#46489c'
                                                    }, marginRight: '10px'
                                                }}
                                            >
                                                إضافة مستخدم جديد
                                            </Button>
                                        </Box>
                                        {
                                            newCustomer && (
                                                <>
                                                    <Box className="d-flex justify-content-between ">
                                                        <Box>
                                                            <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                                الاسم
                                                            </Typography>
                                                            <TextField id="outlined-basic" variant="outlined" size="small" className=" w-75"
                                                                onChange={(e) => setCustomerName(e.target.value)}
                                                                value={customerName} />
                                                        </Box>

                                                        <Box>
                                                            <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                                الإيميل
                                                            </Typography>
                                                            <TextField id="outlined-basic" variant="outlined" size="small" className=" w-75"
                                                                onChange={(e) => setCustomerEmail(e.target.value)}
                                                                value={customerEmail} />
                                                        </Box>
                                                        <Box>
                                                            <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                                رقم الهاتف
                                                            </Typography>
                                                            <TextField id="outlined-basic" variant="outlined" size="small" className=" w-75"
                                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                                value={customerPhone} />
                                                        </Box>
                                                    </Box>
                                                    <Box className='d-flex justify-content-between '>
                                                        <FormControl className="w-50">
                                                            <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                                المدينة
                                                            </Typography>
                                                            <Select
                                                                labelId="demo-simple-select-helper-label"
                                                                id="demo-simple-select-helper"
                                                                label="Age"
                                                                onChange={(e) => setCity(e.target.value)}
                                                                value={city}
                                                                className="w-75"
                                                                size="small"
                                                            >
                                                                {cities?.cities?.map((item: any, index: number) => (
                                                                    <MenuItem value={item.city_id} key={index}>{item.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl className="w-50">
                                                            <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                                                المنطقة
                                                            </Typography>
                                                            <Select
                                                                labelId="demo-simple-select-helper-label"
                                                                id="demo-simple-select-helper"
                                                                label="Age"
                                                                onChange={(e) => setArea(e.target.value)}
                                                                value={area}
                                                                className="w-75"
                                                                size="small"
                                                            >
                                                                {areas?.Areas?.map((item: any, index: number) => (
                                                                    item.city_id === city && (
                                                                        <MenuItem value={item.area_id} key={index}>{item.name}</MenuItem>
                                                                    )
                                                                ))}
                                                            </Select>
                                                        </FormControl>

                                                        <Box>
                                                        </Box>
                                                    </Box>
                                                </>
                                            )
                                        }
                                        <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='green'>
                                            مبلغ التحصيل شامل التوصيل
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" size="small" className="mt-2 w-50"
                                            onChange={(e) => setTotalAmount(e.target.value)}
                                            value={totalAmount} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Card >
                                    <CardContent>
                                        <Typography variant="h6" className="border-bottem-0" sx={{ borderBottom: "1px solid #ccc" }}>
                                            معلومات عامة
                                        </Typography>
                                        <Typography fontSize='1rem' className="border-bottem-0 mt-4" color='grey'>
                                            ملاحظات للتوصيل / محتويات الطرد
                                        </Typography>
                                        <textarea className="w-100 mt-1"
                                            onChange={(e) => setNotes(e.target.value)}
                                            value={notes} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card >
                            <CardContent>
                                <Typography variant="h6" className="border-bottem-0" sx={{ borderBottom: "1px solid #ccc" }}>
                                    معلومات الشحنة
                                </Typography>
                                <Box>
                                    <FormControl className="w-100">
                                        <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                            نوع الشحنة
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            label="Age"
                                            onChange={(e) => setType(e.target.value)}
                                            value={type}
                                            className="w-75"
                                            size="small"
                                        >
                                            {orderTypes?.orderTypes?.map((item: any, index: number) => (
                                                <MenuItem value={item.order_type_id} key={index}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                        الكمية
                                    </Typography>
                                    <TextField id="outlined-basic" variant="outlined" size="small" className="mt-2 w-75"
                                        onChange={(e) => setQty(e.target.value)}
                                        value={qty} />
                                    <Typography fontSize='1.1rem' className="border-bottem-0 mt-3" color='grey'>
                                        رقم التتبع
                                    </Typography>
                                    <TextField id="outlined-basic" variant="outlined" size="small" className="mt-2 w-75" value={orderCode} />
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Card className="p-2">
                            <CardContent>
                                <Button variant="contained"
                                    onClick={handleCreateOrder}
                                    sx={{
                                        backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                            backgroundColor: '#46489c'
                                        }
                                    }}
                                >{loading ? <CircularProgress color="secondary" /> : <>  إضافة شحنة</>}

                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

            </Box>

        </MiniDrawer >
    )
}
