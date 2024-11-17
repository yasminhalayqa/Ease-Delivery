import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default function Item ({ name, icon, number }: { name: string, icon: any, number: string }) {
    return (
        < Grid xs={3} md={3} >
            <Card>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Grid sx={{
                        background: 'linear-gradient(to right, #10bfac, #554ec3)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5%'
                    }}
                        xs={4} md={4}>
                        {icon}
                    </Grid>
                    <Grid xs={9} md={9}>
                        <Typography component="div" variant="h6">
                            {number}
                        </Typography>
                        <Typography component="div" variant="body2">
                            {name}
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid >
    )
}

