import { Box, Button, Grid, InputLabel, TextField, Card, CardContent, CardHeader, CircularProgress, FormControl, Typography, Select, MenuItem } from "@mui/material"
import MiniDrawer from "../../components/Sidebar"
import { CloudUpload } from "@mui/icons-material"
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
export default function EditStore() {
    const params = useParams()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyBranchesNum, setCompanyBranchesNum] = useState('')
    const { data: cities } = useFetchData('http://localhost:3000/cities/cities') as any
    const { data: areas } = useFetchData('http://localhost:3000/areas/areas') as any
    const [city, setCompnayCity] = useState('')
    const [area, setArea] = useState('')
    const [isEmpty, setIsEmpty] = useState(false); // State to track if any input is empty
    const navigate = useNavigate()
    const { data } = useFetchData(`http://localhost:3000/users/store/${params.id}`) as any
    const { putData, loading } = usePutData(`http://localhost:3000/users/store/${params.id}`)
    const update = () => {
        const newData = {
            "name": name,
            "address": address,
            "password": password,
            "phone_number": phoneNumber,
            "email": email,
            "compnay_branches_num": companyBranchesNum,
            // "compnay_order_num": compnayOrderNum,
            "area": area,
            "city": city
        }
        if (
            name.trim() === '' ||
            phoneNumber.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            address.trim() === '' ||
            companyBranchesNum.trim() === '' ||
            area.trim() === '' ||
            city.trim() === ''   
           ) {
            setIsEmpty(true); // Set isEmpty state to true if any input is empty
            return; // Exit the function if any input is empty
        }

        try {
            const response = putData(newData)
            console.log(response);
            navigate('/stores')

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (data) {
            setName(data?.store?.name || '');
            setAddress(data?.store?.address || '');
            setEmail(data?.store?.email || '');
            setPhoneNumber(data?.store?.phone_number || '');
            // setPassword(data?.store?.password || '');
            setCompanyBranchesNum(data?.store?.compnay_branches_num || '');
            // setCompnayOrderNum(data?.store?.compnay_order_num || '');
            setCompnayCity(data?.store?.city?.name || '');
            setArea(data?.store?.area?.name || '');

        }
    }, [data]);
    return (
        <MiniDrawer>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3px' }}>
                <Card sx={{ maxWidth: '850px' }}>
                    <CardHeader title=" تعديل بيانات الشركة " sx={{
                        backgroundColor: '#f8f8f8',
                        borderBottom: '1px solid #ccc',
                        padding: '3px',
                    }}
                        titleTypographyProps={{ variant: 'h6', margin: '4px' }}
                    />
                    <CardContent>
                        <Grid className="d-flex justify-content-center" container columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
                            <Input name="الاسم" value={name} handler={(e: any) => setName(e.target.value)} error={isEmpty && name.trim() === ''} />
                            <Input name="رقم الهاتف" value={phoneNumber} handler={(e: any) => setPhoneNumber(e.target.value)}error={isEmpty && phoneNumber.trim() === ''} />
                            <Input name="الإيميل" value={email} handler={(e: any) => setEmail(e.target.value)}error={isEmpty && email.trim() === ''} />
                            <Input name="كلمة المرور" value={password} handler={(e: any) => setPassword(e.target.value)} error={isEmpty && password.trim() === ''}/>
                            <Grid xs={4} margin={1}>
                                <FormControl sx={{ width: 370 }}>
                                    <Typography fontSize='1.1rem' className="border-bottem-0 mt" color='grey'>
                                        المدينة
                                    </Typography>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        label="Age"
                                        onChange={(e) => setCompnayCity(e.target.value)}
                                        value={city}
                                        className="w-75"
                                        size="small"
                                    >
                                        {cities?.cities?.map((item: any, index: number) => (
                                            <MenuItem value={item.city_id} key={index}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={4} margin={1}>
                                <FormControl sx={{ width: 370 }}>
                                    <Typography fontSize='1.1rem' className="border-bottem-0 " color='grey'>
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
                            </Grid>
                            <Input name="العنوان بالكامل" value={address} handler={(e: any) => setAddress(e.target.value)} error={isEmpty && address.trim() === ''}/>
                            <Input name="عدد أفرع الشركة" value={companyBranchesNum} handler={(e: any) => setCompanyBranchesNum(e.target.value)}error={isEmpty && companyBranchesNum.trim() === ''} />
                            {/* <Input name="عدد الطلبات الشهري المتوقع" value={compnayOrderNum} handler={(e: any) => setCompnayOrderNum(e.target.value)} /> */}
                            <Grid xs={8} >
                                <InputLabel sx={{ color: 'black' }}>الشعار</InputLabel>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUpload sx={{ marginLeft: '7px' }} />}
                                    className="m-2"
                                >
                                    Upload file
                                    <input type="file" className="upload-file-button" />
                                </Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained"
                                onClick={update}
                                sx={{
                                    backgroundColor: '#4b49ac', color: 'white', '&:hover': {
                                        backgroundColor: '#46489c'
                                    }
                                }}
                            >{loading ? <CircularProgress color="secondary" /> : <>  تعديل </>}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </MiniDrawer>
    )
}
