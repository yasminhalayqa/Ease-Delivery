import { Box, Button, Grid, InputLabel, TextField, Card, CardContent, CircularProgress, Typography, Select, MenuItem } from "@mui/material"
import MiniDrawer from "../../components/Sidebar"
import { useState } from "react"
import usePostData from "../../hooks/usePostData"
import { useNavigate } from "react-router-dom"
import useFetchData from "../../hooks/useFetchData"

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
export default function CreateTicket() {
    const [isEmpty, setIsEmpty] = useState(false) // State to track if any input is empty
    const navigate = useNavigate()
    const store_id = sessionStorage.getItem('id')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState(false);

    const { data: stores } = useFetchData('http://localhost:3000/users/store') as any
    const store = stores?.stores?.find((item: any) => item.id == store_id)
    console.log(store);

    const data = {
        "title": title,
        "description": description,
        "store_id": store_id,
        "delivery_company_id": store?.delivery_company_id
    }
    const handleSubmit = () => {
        if (!description) {
            setDescriptionError(true);
            return;
        }

    };

    const { postData, loading } = usePostData('http://localhost:3000/tickets/ticket')

    const handleTicket = () => {

        try {
            const response = postData(data)
            console.log(response);
            navigate('/store/dashboard')

        } catch (error) {
            console.log(error);
        }
    }
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
                        <Input name="العنوان" value={title} handler={(e: any) => setTitle(e.target.value)} error={isEmpty && title.trim() === '' }/>
                        <Input name="الشركة" value={store?.name} handler  error={isEmpty && store?.name.trim() === ''}/>
                        <Grid item xs={12} md={12} margin={1}>

                            <Typography variant="h6">
                                الوصف
                            </Typography>

                            <Input  value={description} handler={(e: any) => setDescription(e.target.value)} error={isEmpty && description.trim() === ''} name={""}/>

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
                        >{loading ? <CircularProgress color="secondary" /> : <> إنشاء</>}

                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </MiniDrawer>
    )
}
