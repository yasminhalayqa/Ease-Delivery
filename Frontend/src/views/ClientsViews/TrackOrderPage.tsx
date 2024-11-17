import React, { useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import useFetchData from '../../hooks/useFetchData';

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState(false);
  const { data: orderStatus } = useFetchData('http://localhost:3000/orders/order_status_tracking') as any;
  const { data: orders } = useFetchData('http://localhost:3000/orders/order') as any;

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTrackingNumber(event.target.value);
    if (event.target.value) {
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (!trackingNumber) {
      setError(true);
    } else {
      console.log('Tracking number submitted:', trackingNumber);
    }
  };

  const order = orders?.orders?.find((item: any) => item.order_code === trackingNumber);
  const order_id = orders?.orders?.find((item: any) => item.order_code === trackingNumber)?.order_id;

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
          padding: 2,
          backgroundColor: "#f5f5f5",
          marginBottom:'60px'
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: "white",
            boxShadow: 1,
            borderRadius: 2,
          height:'200px'

          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                width: 700,
                marginRight: 2,
                "& input": { textAlign: "right" },
              }}
              id="outlined-basic"
              label="  أدخل رقم الطرد للتتبع "
              variant="outlined"
              value={trackingNumber}
              onChange={handleChange}
              error={error}
              helperText={error ? "يجب ادخال رقم الطرد الخاص بك لتتبعه" : ''}
              required
            />
            <Button
              className="buttonTrack"
              variant="contained"
              sx={{
                margin:2,
                width: 150,
                height: 55,
                backgroundColor: "#4b49ac",
                color: "white",
                fontSize: 20,
                borderRadius: 1,
                "&:hover": { backgroundColor: "#46489c" },
              }}
              onClick={handleSubmit}
            >
              تتبع
            </Button>
          </Box>
        </Container>
      </Box>
      {trackingNumber && (
        <Container sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 4,
          padding: 1,
          boxShadow: 1,
          borderRadius: 2,
          marginBottom:4
        }}>
          <Box sx={{ width: '45%' }}>
            <Card sx={{ marginBottom: 3 }}>
              <CardContent>
                <Typography variant="h5">معلومات المستلم</Typography>
                <Typography variant="body1" color="#8D8D8D" marginTop={2}>{order?.customer?.name}</Typography>
                <Typography variant="body2" color="#8D8D8D" marginTop={2}>{order?.customer?.email}</Typography>
                <Typography variant="body1" color="#8D8D8D" marginTop={2}>{order?.customer?.phone_number}</Typography>
                <Typography variant="body1" color="#8D8D8D" fontWeight="bold" marginTop={2}>{order?.customer?.city?.name}</Typography>
                <Typography variant="body2" color="#8D8D8D" marginTop={2}>{order?.customer?.area?.name}</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5">الدفع</Typography>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Typography variant="body1" color="#8D8D8D">المجموع</Typography>
                  <Typography variant="body2" color="#8D8D8D">{order?.total_amount - order?.customer?.city?.shipping_fees} ₪</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Typography variant="body1" color="#8D8D8D">رسوم التوصيل</Typography>
                  <Typography variant="body2" color="#8D8D8D">{order?.customer?.city?.shipping_fees}₪</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" marginTop={2}>
                  <Typography variant="body1" color="#8D8D8D" fontWeight="bold">المجموع الكلي</Typography>
                  <Typography variant="body2" color="#8D8D8D">{order?.total_amount} ₪</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>تفاصيل الطلب</Typography>
            <div className="timeline-container">
              <ul className="tl">
                {orderStatus?.orders?.filter((item: any) => item.order_id === order_id)?.map((item: any, index: number) => (
                  <li key={index} className="timeline-item">
                    <div className="item-text">
                      <Typography variant="body1" className="item-title">{item.status}</Typography>
                      {item.status !== 'فشل التسليم' && (
                        <Typography variant="body2" className="item-detail">تم {item.status} بنجاح</Typography>
                      )}
                    </div>
                    <Typography variant="caption" className="item-timestamp m-2">
                      {item.timestamp.slice(0, 10)}<br /> {item.timestamp.slice(11)}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default TrackOrder;
