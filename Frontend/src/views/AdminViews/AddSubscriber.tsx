import { Box, Button, Grid, InputLabel, TextField, Card, CardContent, CardHeader, CircularProgress, Typography } from "@mui/material"
import MiniDrawer from "../../components/Sidebar"
import { CloudUpload } from "@mui/icons-material"
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
            helperText={error ? "هذا الحقل مطلوب " : ""} // Display error message if input is emp
            />
        </Grid>
    )
}
export default function AddSubscriber() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyBranchesNum, setCompanyBranchesNum] = useState('')
    const [compnayOrderNum, setCompnayOrderNum] = useState('')
    const [isEmpty, setIsEmpty] = useState(false); // State to track if any input is empty
    const navigate = useNavigate()

    // const formData = new FormData()
    // formData.append('name', name)
    // formData.append('address', address)
    // formData.append('phone_number', phoneNumber)
    // formData.append('email', email)
    // formData.append('password', password)
    // formData.append('compnay_branches_num', companyBranchesNum)
    // formData.append('compnay_order_num', compnayOrderNum)
    const data = {
        "name": name,
        "address": address,
        "password": password,
        "phone_number": phoneNumber,
        "email": email,
        "compnay_branches_num": companyBranchesNum,
        "compnay_order_num": compnayOrderNum,
        "active": "true"
    }

    const { postData, loading } = usePostData('http://localhost:3000/users/delivery_company')

    const handleAddSubscriber = () => {
        if (
            name.trim() === '' ||
            phoneNumber.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            address.trim() === '' ||
            companyBranchesNum.trim() === '' ||
            compnayOrderNum.trim() === ''
        ) {
            setIsEmpty(true); // Set isEmpty state to true if any input is empty
            return; // Exit the function if any input is empty
        }

        try {
            const response = postData(data)
            console.log(response);
            navigate('/subscribers')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <MiniDrawer>
            <Card className="mb-4">
                <CardContent>
                    <Typography fontWeight="bolder" fontSize="20px">
                        إضافة شركة توصيل جديدة
                    </Typography>
                </CardContent>
            </Card>
            <Card className="mb-4">
                <CardContent>
                    <Grid className="d-flex justify-content-center" container columnSpacing={{ xs: 1, sm: 2, md: 1 }} >
                    <Input name="الاسم" value={name} handler={(e: any) => setName(e.target.value)} error={isEmpty && name.trim() === ''} />
                            <Input name="رقم الهاتف" value={phoneNumber} handler={(e: any) => setPhoneNumber(e.target.value)} error={isEmpty && phoneNumber.trim() === ''} />
                            <Input name="الإيميل" value={email} handler={(e: any) => setEmail(e.target.value)} error={isEmpty && email.trim() === ''} />
                            <Input name="كلمة المرور" value={password} handler={(e: any) => setPassword(e.target.value)} error={isEmpty && password.trim() === ''} />
                            <Input name="العنوان" value={address} handler={(e: any) => setAddress(e.target.value)} error={isEmpty && address.trim() === ''} />
                            <Input name="عدد أفرع الشركة" value={companyBranchesNum} handler={(e: any) => setCompanyBranchesNum(e.target.value)} error={isEmpty && companyBranchesNum.trim() === ''} />
                            <Input name="عدد الطلبات الشهري المتوقع" value={compnayOrderNum} handler={(e: any) => setCompnayOrderNum(e.target.value)} error={isEmpty && compnayOrderNum.trim() === ''} />
                        {/* <Grid xs={4} >
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
                            </Grid> */}
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
                        >{loading ? <CircularProgress color="secondary" /> : <>  إضافة مشترك</>}

                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </MiniDrawer>
    )
}
