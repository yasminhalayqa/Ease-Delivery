import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from '@mui/material/Link';

const phoneNumber = '1234567890'; // Replace with the actual phone number

const ContactUs = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: 'url("/assets/images/technicalSupport.jpg")', // Ensure the correct path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(75, 73, 172, 0.3)', // blue overlay with 30% opacity
        zIndex: 1, // between the background image and the content
      }
    }}>
      <Box sx={{ zIndex: 2 }}>
        <Header />
      </Box>
      <Box sx={{ flex: 1, zIndex: 2, padding: 5 ,marginBottom:10}}>
        <Container>
          <Typography variant="h1" align="center" gutterBottom sx={{ color: "white", fontSize: '3rem', textAlign: "right" }}>
            تواصل معنا
          </Typography>
          <Typography variant="h2" align="center" gutterBottom sx={{ color: "white", fontSize: '1.5rem', textAlign: "right" }}>
            يسعدنا أن تقوم بالتواصل معنا خلال ساعات العمل من الساعة 08:00 AM وحتى الساعة 04:30 PM من الأحد للخميس
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',
                height: '250px',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}>
                <CardContent>
                  <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}>
                  </Container >
                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <FontAwesomeIcon icon={faPhone} size="3x" style={{ marginBottom: '10px' }} />
                    <p style={{ fontSize: '24px', textAlign: 'center' }}>اتصل بنا</p>
                  </Container>
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                    إتصل بنا خلال ساعات العمل من الساعة 08:00 AM وحتى الساعة 04:30 PM من الأحد وحتى الخميس     
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                    807 525 0598
                    <br />
                    +972 525 807
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',
                height: '250px',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}>
                <CardContent>
                  <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}>
                  </Container>
                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <FontAwesomeIcon icon={faEnvelope} size="3x" style={{ marginBottom: '10px' }} />
                    <p style={{ fontSize: '24px', textAlign: 'center' }}>@ البريد الالكتروني</p>
                  </Container>
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                    لا تترد في طرح الأسئلة، وسنقوم بالرد عليك بأسرع وقت
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link
                      variant="body2"
                      href="https://mail.google.com/mail/"
                    >
                      EaseDelivery@gmail.com 
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',
                height: '250px',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}>
                <CardContent>
                  <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}>
                  </Container>
                  <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <FontAwesomeIcon icon={faWhatsapp} size="3x" style={{ marginBottom: '10px' }} />
                    <p style={{ fontSize: '24px', textAlign: 'center' }}>الدردشة الفورية</p>
                  </Container>
                  <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                    دردشة فورية خلال ساعات العمل بواسطة الواتساب
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link
                      variant="body2"
                      href={`https://wa.me/${phoneNumber}`}
                      target="_blank"
                    >
                      الدردشة الفورية على واتساب
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ zIndex: 2 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ContactUs;
