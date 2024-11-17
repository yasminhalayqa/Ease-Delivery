import { Box, Button, Grid, InputLabel, TextField, Card, CardContent, CircularProgress, FormControl, Typography, Select, MenuItem } from "@mui/material"
import MiniDrawer from "../../components/Sidebar"
import { useState } from "react"
import usePostData from "../../hooks/usePostData"
import { useNavigate } from "react-router-dom"
import useFetchData from "../../hooks/useFetchData"

const Input = ({ name, handler, value }: { name: string, value: any, handler: any }) => {
    return (
        <Grid xs={12} margin={1}>
            <InputLabel sx={{ right: '0', color: 'black' }}> {name} </InputLabel>
            <TextField size="small" fullWidth value={value} onChange={handler} />
        </Grid>
    )
}
export default function AddArea() {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const navigate = useNavigate()
    const delivery_company_id = sessionStorage.getItem('id')
    const data = {
        "name": name,
        "city_id": city,
        "delivery_company_id": delivery_company_id
    }

    const { postData, loading } = usePostData('http://localhost:3000/areas/area')
    const { data: cities } = useFetchData('http://localhost:3000/cities/cities') as any

    const handleAddArea = () => {
        try {
            const response = postData(data)
            console.log(response);
            navigate('/areas')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent>
                    <Typography fontWeight="bolder" fontSize="20px">
                        إضافة منطقة جديدة
                    </Typography>
                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardContent>
                    <Grid className="d-flex justify-content-space" container columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
                        <Input name="الاسم" value={name} handler={(e: any) => setName(e.target.value)} />
                        <FormControl fullWidth className="m-1">
                            <Typography fontSize='1.1rem' className="border-bottem-0 mt" color='grey'>
                                المدينة
                            </Typography>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Age"
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                // className="w-75" 
                                size="small"
                            >
                                {cities?.cities?.map((item: any, index: number) => (
                                    <MenuItem value={item.city_id} key={index}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '10px' }}>
                        <Button variant="contained"
                            onClick={handleAddArea}
                            sx={{
                                backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                    backgroundColor: '#46489c'
                                }
                            }}
                        >{loading ? <CircularProgress color="secondary" /> : <>  إضافة منطقة</>}

                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </MiniDrawer>
    )
}
