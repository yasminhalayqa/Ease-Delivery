import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Box, Button, CircularProgress, Grid, InputLabel, TextField, styled } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostData from '../../hooks/usePostData';

const FormGroup = styled(Box)`
  margin-bottom: 20px;
`;

const Label = styled(InputLabel)`
`;
const Input = ({ value, handler, error }: { value: any, handler: any, error: boolean }) => {
  return (
    <Grid xs={4} margin={1}>
      <TextField
        size="small"
        fullWidth
        value={value}
        onChange={handler}
        error={error}
        helperText={error ? "هذا الحقل مطلوب" : ""} // Display error message if input is empty
      />
    </Grid>
  )
}

export default function RequestToJoin() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [companyBranchesNum, setCompanyBranchesNum] = useState('')
  const [compnayOrderNum, setCompnayOrderNum] = useState('')
  // const [otherInformation, setOtherInformation] = useState('')

  const [isEmpty, setIsEmpty] = useState(false); // State to track if any input is empty
  const navigate = useNavigate()


  const data = {
    "name": name,
    "address": address,
    "phone_number": phoneNumber,
    "email": email,
    "compnay_branches_num": companyBranchesNum,
    "compnay_order_num": compnayOrderNum,
    "active": "false",
    "password": "123",
    "city_id": "1",
    "area_id": "1"
  }
  const { postData, loading } = usePostData('http://localhost:3000/users/delivery_company')

  const handleSubscribtionRequest = () => {
    // Check if any of the input fields are empty
    if (
      name.trim() === '' ||
      phoneNumber.trim() === '' ||
      email.trim() === '' ||
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
      navigate('/home')

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <><><Header />
      <Box className='wrapperForm'>
        <h1> انضم الينا </h1>
        <p>الرجاء ادخال المعلومات الخاصة بشركتم لتقديم طلب انضمام .</p>
        <Box className='FormContainerforform'>
          <Box className='FormContainer'>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '500px' }}>
                <FormGroup>
                  <Label className='formLabels'>اسم الشركة   *</Label><br />
                  <Input value={name} handler={(e: any) => setName(e.target.value)} error={isEmpty && name.trim() === ''} />
                </FormGroup>

                <FormGroup>
                  <Label className='formLabels'> العنوان  </Label><br />
                  <Input value={address} handler={(e: any) => setAddress(e.target.value)} error={isEmpty && address.trim() === ''} />
                </FormGroup>
                <FormGroup>
                  <Label className='formLabels'>الايميل  *</Label><br />
                  <Input value={email} handler={(e: any) => setEmail(e.target.value)} error={isEmpty && email.trim() === ''} />
                </FormGroup>

                <FormGroup>
                  <Label className='formLabels'> رقم الهاتف </Label><br />
                  <Input value={phoneNumber} handler={(e: any) => setPhoneNumber(e.target.value)} error={isEmpty && phoneNumber.trim() === ''} />
                </FormGroup>
              </Box>
              <Box sx={{ width: '500px' }}>
                <FormGroup>
                  <Label className='formLabels'> عدد افرع الشركة   </Label><br />
                  <Input value={companyBranchesNum} handler={(e: any) => setCompanyBranchesNum(e.target.value)} error={isEmpty && companyBranchesNum.trim() === ''} />
                </FormGroup>
                <FormGroup>
                  <Label className='formLabels'> عدد الطلبات المتوقع للشهر الواحد    </Label><br />
                  <Input value={compnayOrderNum} handler={(e: any) => setCompnayOrderNum(e.target.value)} error={isEmpty && compnayOrderNum.trim() === ''} />
                </FormGroup>
                <FormGroup  >
                  <Label className='formLabels'> معلومات اضافية </Label><br />
                  <Input value={undefined} handler={undefined} error={false} />

                </FormGroup>
              </Box>
            </Box>

            <Button variant="contained"
              onClick={handleSubscribtionRequest}
              sx={{ width: '150px', height: '55px', backgroundColor: '#4b49ac', color: 'white', fontSize: '20px', borderRadius: '5%', '&:hover': { backgroundColor: '#46489c' }, margin: '0 auto', display: 'block' }}
            >
              {loading ? <CircularProgress color="secondary" /> : <> طلب الانضمام</>}
            </Button>
          </Box>
        </Box>
      </Box>
    </><Footer /></>
  );
}
