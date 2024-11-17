import { Box, Button, Grid, InputLabel, TextField, Card, CardContent, CircularProgress, FormControl, Typography, Select, MenuItem } from "@mui/material"
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
export default function AddSalesman() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [city, setCompnayCity] = useState('')
    const [area, setArea] = useState('')
    const [isEmpty, setIsEmpty] = useState(false); // State to track if any input is empty
    const navigate = useNavigate()
    const { data: cities } = useFetchData('http://localhost:3000/cities/cities') as any
    const { data: areas } = useFetchData('http://localhost:3000/areas/areas') as any
    // const formData = new FormData()
    // formData.append('name', name)
    // formData.append('address', address)
    // formData.append('phone_number', phoneNumber)
    // formData.append('email', email)
    // formData.append('password', password)
    // formData.append('compnay_branches_num', companyBranchesNum)
    // formData.append('compnay_order_num', compnayOrderNum)
    const delivery_company_id = sessionStorage.getItem('id')

    const data = {
        "name": name,
        "address": address,
        "password": password,
        "phone_number": phoneNumber,
        "email": email,
        "area_id": area,
        "city_id": city,
        "delivery_company_id": delivery_company_id

    }

    const { postData, loading } = usePostData('http://localhost:3000/users/salesman')

    const handleAddSubscriber = () => {
        if (
            name.trim() === '' ||
            address.trim() === '' ||
            phoneNumber.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            city.trim() === '' ||
            area.trim() === '' 
        ) {
            setIsEmpty(true); // Set isEmpty state to true if any input is empty
            return; // Exit the function if any input is empty
        }

        try {
            const response = postData(data)
            console.log(response);
            navigate('/salesman')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent>
                    <Typography fontWeight="bolder" fontSize="20px">
                        إضافة مندوب توصيل جديد
                    </Typography>
                </CardContent>
            </Card>
            <Card className="mb-4">
                {/* <CardHeader title="إضافة مندوب توصيل جديد " sx={{
                        backgroundColor: '#f8f8f8',
                        borderBottom: '1px solid #ccc',
                        padding: '3px',
                    }}
                        titleTypographyProps={{ variant: 'h6', margin: '4px' }}
                    /> */}
                <CardContent>
                    <Grid className="d-flex justify-content-center" container columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
                        <Input name="الاسم" value={name} handler={(e: any) => setName(e.target.value)} error={isEmpty && name.trim() === ''}/>
                        <Input name="رقم الهاتف" value={phoneNumber} handler={(e: any) => setPhoneNumber(e.target.value)} error={isEmpty && phoneNumber.trim() === ''}/>
                        <Input name="الإيميل" value={email} handler={(e: any) => setEmail(e.target.value)}error={isEmpty && email.trim() === ''} />
                        <Input name="كلمة   المرور" value={password} handler={(e: any) => setPassword(e.target.value)} error={isEmpty && password.trim() === ''}/>
                        <Grid xs={12} margin={1}>
                            <FormControl fullWidth>
                                <Typography fontSize='1.1rem' className="border-bottem-0 mt" color='grey'>
                                    المدينة
                                </Typography>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Age"
                                    onChange={(e) => setCompnayCity(e.target.value)}
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
                        <Grid xs={12} margin={1}>
                            <FormControl fullWidth>
                                <Typography fontSize='1.1rem' className="border-bottem-0 " color='grey'>
                                    المنطقة
                                </Typography>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="Age"
                                    onChange={(e) => setArea(e.target.value)}
                                    value={area}
                                    // className="w-75"
                                    size="small"
                                >
                                    {areas?.Areas?.map((item: any, index: number) => (
                                        item.city_id === city && (
                                            <MenuItem value={item.area_id} key={index}>{item.name}</MenuItem>
                                        )
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Input name="العنوان بالكامل" value={address} handler={(e: any) => setAddress(e.target.value)} error={isEmpty && address.trim() === ''} />

                    </Grid>

                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                        <Button variant="contained"
                            onClick={handleAddSubscriber}
                            sx={{
                                backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                    backgroundColor: '#46489c'
                                }
                            }}
                        >{loading ? <CircularProgress color="secondary" /> : <>  إضافة مندوب توصيل</>}

                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </MiniDrawer>
    )
}
