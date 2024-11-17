import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
export default function OrderCard({ orderID }: { orderID: number }) {
    return (
        < Grid xs={3} md={3} >
            <Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontWeight="" className='opacity-50 m-1'>  رقم الطلب-{orderID} </Typography>
                    <Typography  className=' m-1'>  حالة الطلب : </Typography>
                </Box>

                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', }}>
                   
                    <Grid xs={9} md={9}>
                        <Typography component="div" variant="h6">
                            dkdkd
                        </Typography>
                        <Typography component="div" variant="body2">
                            939
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid >
    )
}