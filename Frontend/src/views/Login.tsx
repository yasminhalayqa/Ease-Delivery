// aimport React, { useState } from 'react';
// import { Container, Grid, Card, CardContent, Typography, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LockIcon from '@mui/icons-material/Lock';
// import usePostData from '../hooks/usePostData';
// import { useNavigate } from 'react-router-dom';
// import { CheckCircleOutline } from '@mui/icons-material';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const data = {
//     email: email,
//     password: password
//   };
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleOpenJoinForm = () => {
//     navigate('/join_us');
//   };
//   const { postData, loading } = usePostData('http://localhost:3000/auth/login');

//   const login = async () => {
//     try {
//       const response = await postData(data);
//       console.log(response.status);
//       if (response.status === 200) {
//         const token = response.data.token;
//         const id = response.data.id;
//         const name = response.data.name;
//         const role_id = response.data.role_id;
//         sessionStorage.setItem('token', token);
//         sessionStorage.setItem('id', id);
//         sessionStorage.setItem('name', name);
//         sessionStorage.setItem('role_id', role_id);
//         if (role_id === '1') {
//           navigate('/subscribers');
//         } else if (role_id === '2') {
//           navigate('/dashboard');
//         } else if (role_id === '4') {
//           navigate('/store/dashboard');
//         } else if (role_id === '3') {
//           navigate('/salesman_orders');
//         }
//       } else {
//         setOpen(true); // Open dialog when login fails
//       }

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <React.Fragment>
//       <IconButton onClick={handleClickOpen}>
//         <CheckCircleOutline color="success" />
//       </IconButton>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"عدم وجود صلاحية الدخول الى النظام "}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             "هذا الحساب غير موجود وليس لديه الصلاحيات للدخول الى النظام"
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}> موافق  </Button>
//           <Button onClick={handleOpenJoinForm}> الانضمام للنظام   </Button>

//         </DialogActions>
//       </Dialog>

//       <div className="bg-light min-vh-100 d-flex flex-row align-items-center" >
//         <Container>
//           <Grid container justifyContent="center">
//             <Grid item md={8}>
//               <Card>
//                 <CardContent>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="h4" align="center" gutterBottom>تسجيل الدخول</Typography>
//                       <Typography variant="body1" color="textSecondary" align="center" gutterBottom>تسجيل الدخول إلى حسابك</Typography>
//                       <TextField
//                         fullWidth
//                         label="الإيميل"
//                         margin="normal"
//                         variant="outlined"
//                         InputProps={{ startAdornment: <AccountCircleIcon className='m-2' /> }}
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                       <TextField
//                         fullWidth
//                         label="كلمة المرور"
//                         type="password"
//                         margin="normal"
//                         variant="outlined"
//                         InputProps={{ startAdornment: <LockIcon className='m-2' /> }}
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                       />
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         size="large"
//                         disabled={loading}
//                         className='mt-3'
//                         sx={{
//                           backgroundColor: '#4b49ac', '&:hover': {
//                             backgroundColor: '#46489c'
//                           }
//                         }
//                         }
//                         onClick={login}
//                       >
//                         {loading ? <CircularProgress size={24} color="inherit" /> : 'تسجيل الدخول'}
//                       </Button>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <img
//                         src="https://www.postgrid.com.au/wp-content/uploads/2021/04/Per-Piece-Tracking.png"
//                         alt="Login Image"
//                         style={{ width: '100%' }}
//                       />
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </Container>

//       </div >
//     </React.Fragment>
//   );
// }
import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import usePostData from '../hooks/usePostData';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutline } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const data = {
    email: email,
    password: password
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenJoinForm = () => {
    navigate('/join_us');
  };

  const { postData, loading } = usePostData('http://localhost:3000/auth/login');

  const login = async () => {
    // Reset errors
    setEmailError(false);
    setPasswordError(false);

    // Validate input fields
    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    // If either field is empty, return early
    if (email === '' || password === '') {
      return;
    }

    try {
      const response = await postData(data);
      console.log(response.status);
      if (response.status === 200) {
        const token = response.data.token;
        const id = response.data.id;
        const name = response.data.name;
        const role_id = response.data.role_id;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('role_id', role_id);
        if (role_id == '1') {
          navigate('/subscribers');
        } else if (role_id == '2') {
          navigate('/dashboard');
        } else if (role_id == '4') {
          navigate('/store/dashboard');
        } else if (role_id == '3') {
          navigate('/salesman_orders');
        }
      } else {
        setOpen(true); // Open dialog when login fails
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"عدم وجود صلاحية الدخول الى النظام "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            "هذا الحساب غير موجود وليس لديه الصلاحيات للدخول الى النظام"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> موافق  </Button>
          <Button onClick={handleOpenJoinForm}> الانضمام للنظام   </Button>
        </DialogActions>
      </Dialog>

      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <Container>
          <Grid container justifyContent="center">
            <Grid item md={8}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h4" align="center" gutterBottom>تسجيل الدخول</Typography>
                      <Typography variant="body1" color="textSecondary" align="center" gutterBottom>تسجيل الدخول إلى حسابك</Typography>
                      <TextField
                        fullWidth
                        label="الإيميل"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ startAdornment: <AccountCircleIcon className='m-2' /> }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        helperText={emailError ? ' الرجاء ادخال الإيميل ' : ''}
                      />
                      <TextField
                        fullWidth
                        label="كلمة المرور"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ startAdornment: <LockIcon className='m-2' /> }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? ' الرجاء ادخال كلمة المرور ' : ''}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        className='mt-3'
                        sx={{
                          backgroundColor: '#4b49ac', '&:hover': {
                            backgroundColor: '#46489c'
                          }
                        }}
                        onClick={login}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'تسجيل الدخول'}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <img
                        src="https://www.postgrid.com.au/wp-content/uploads/2021/04/Per-Piece-Tracking.png"
                        alt="Login Image"
                        style={{ width: '100%' }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}


