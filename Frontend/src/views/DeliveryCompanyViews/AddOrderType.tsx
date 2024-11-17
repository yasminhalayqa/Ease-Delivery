import { Box, Button, Grid, InputLabel, TextField, Card, CardContent, CircularProgress, Typography } from "@mui/material"
import MiniDrawer from "../../components/Sidebar"
import { useState } from "react"
import usePostData from "../../hooks/usePostData"
import { useNavigate } from "react-router-dom"

const Input = ({ name, handler, value ,error}: { name: string, value: any, handler: any , error: boolean}) => {
    return (
        <Grid xs={12} margin={1}>
            <InputLabel sx={{ right: '0', color: 'black' }}> {name} </InputLabel>
            <TextField 
            size="small" 
            fullWidth 
            value={value} 
            onChange={handler} 
            error={error} 
            helperText={error ? "يجب ادخال نوع الشحنة    " : ""} // Display error message if input is emp
            />
        </Grid>
    )
}
export default function AddOrderType() {
    const [name, setName] = useState('')
    const [isEmpty, setIsEmpty] = useState(false); // State to track if any input is empty
    const navigate = useNavigate()
    const delivery_company_id = sessionStorage.getItem('id')

    const data = {
        "name": name,
        "delivery_company_id": delivery_company_id
    }

    const { postData, loading } = usePostData('http://localhost:3000/order_types/order_type')

    const handleAddOrderType = () => {
        if (
            name.trim() === '' 

        ) {
            setIsEmpty(true); // Set isEmpty state to true if any input is empty
            return; // Exit the function if any input is empty
        }
        try {
            const response = postData(data)
            console.log(response);
            navigate('/order_types')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent>
                    <Typography fontWeight="bolder" fontSize="20px">
                        إضافة نوع شحنة جديد
                    </Typography>
                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardContent>
                    <Grid className="d-flex justify-content-start" container columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
                        <Input name="الاسم" value={name} handler={(e: any) => setName(e.target.value)}error={isEmpty && name.trim() === ''} />
                    </Grid>

                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '10px' }}>
                        <Button variant="contained"
                            onClick={handleAddOrderType}
                            sx={{
                                backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                    backgroundColor: '#46489c'
                                }
                            }}
                        >{loading ? <CircularProgress color="secondary" /> : <>  إضافة نوع شحنة</>}

                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </MiniDrawer >
    )
}
