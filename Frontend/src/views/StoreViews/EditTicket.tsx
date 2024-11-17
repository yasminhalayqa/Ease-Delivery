import { Box, Button, Grid, InputLabel, TextField, Card, CardContent, CircularProgress, Typography, Select, MenuItem } from "@mui/material"
import MiniDrawer from "../../components/Sidebar"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useFetchData from "../../hooks/useFetchData"
import usePutData from "../../hooks/usePutData"

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
            helperText={error ? "هذا الحقل مطلوب " : ""} // Display error message if input is emp
            />
        </Grid>
    )
}
export default function EditTicket() {

    const [isEmpty, setIsEmpty] = useState(false); // State to track if any input is empty
    const navigate = useNavigate()
    const store_id = sessionStorage.getItem('id')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const params = useParams()
    const { data: ticket } = useFetchData(`http://localhost:3000/tickets/ticket/${params.id}`) as any
    const { data: store } = useFetchData(`http://localhost:3000/users/store/${store_id}`) as any

    const data = {
        "title": title,
        "description": description,
    }

    const { putData, loading } = usePutData(`http://localhost:3000/tickets/edit_ticket/${params.id}`)

    const handleTicket = () => {
        if (
            title.trim() === '' ||
            description.trim() === '' 
            
        ) {
            setIsEmpty(true); // Set isEmpty state to true if any input is empty
            return; // Exit the function if any input is empty
        }

        try {
            const response = putData(data)
            console.log(response);
            navigate('/store/dashboard')

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (ticket) {
            setTitle(ticket?.ticket?.title || '');
            setDescription(ticket?.ticket?.description || '');
        }
    }, [ticket])
    console.log(ticket);

    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent>
                    <Typography fontWeight="bolder" fontSize="20px">
                        الدعم الفني
                    </Typography>
                </CardContent>
            </Card>
            <Card className="mb-4">

                <CardContent>
                    <Grid className="d-flex justify-content-center" container columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
                        <Input name="العنوان" value={title} handler={(e: any) => setTitle(e.target.value)} error={isEmpty && title.trim() === ''}/>
                        <Input name="الشركة" value={store?.store?.name} handler error={false} />
                        <Grid item xs={12} md={12} margin={1}>

                            <Typography variant="h6">
                                الوصف
                            </Typography>

                            <Input name="" value={description} handler={(e: any) => setDescription(e.target.value)}error={isEmpty && description.trim() === ''} />

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card className="mb-4">
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Button variant="contained"
                            onClick={handleTicket}
                            sx={{
                                backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                    backgroundColor: '#46489c'
                                }
                            }}
                        >{loading ? <CircularProgress color="secondary" /> : <> تعديل</>}

                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </MiniDrawer>
    )
}
