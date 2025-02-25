import { Button, Typography } from '@mui/material';
import { Document, PDFDownloadLink, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const OrderPDF = ({ orderData }: { orderData: any }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#f0f0f0',
            padding: 20,
            fontFamily: 'Helvetica',
        },
        header: {
            marginBottom: 20,
            textAlign: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            textDecoration: 'underline',
        },
        section: {
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        text: {
            fontSize: 12,
            marginBottom: 3,
        },
        footer: {
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 10,
            color: '#888',
        },
    });

    const renderPDF = () => (
        <Document>
            <Page size="A5" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Invoice</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Order Code</Text>
                    <Text style={styles.text}>{orderData?.order?.order_code}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Customer Details</Text>
                    <Text style={styles.text}>Name: {orderData?.order?.customer?.name}</Text>
                    <Text style={styles.text}>Email: {orderData?.order?.customer?.email}</Text>
                    <Text style={styles.text}>Phone: {orderData?.order?.customer?.phone_number}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Order Status</Text>
                    <Text style={styles.text}>{orderData?.order?.status}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Total Amount</Text>
                    <Text style={styles.text}>{orderData?.order?.total_amount} ₪</Text>
                </View>
                <View style={styles.footer}>
                    <Text>Generated by Ease Delivery on {new Date().toLocaleDateString()}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <PDFDownloadLink document={renderPDF()} fileName="order.pdf">
            {({ loading }) => (loading ? 'Loading document...' : <Button
                sx={{ border: '1px solid #c7c3b6' }}

                size="small"
                className=''
            >
                <Typography color="#7b7a79" fontWeight="bold" fontSize="12px" padding="2px">تحميل الفاتورة</Typography>
            </Button>)}
        </PDFDownloadLink>
    );
};

export default OrderPDF;
