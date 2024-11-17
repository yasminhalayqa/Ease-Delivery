import Header from "../../components/Header";
import Gallery from "../../components/SlideShow";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { faLaptopCode, faShieldHalved, faShippingFast, faTruckArrowRight, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  return (
    <>
      <Header />
      {/* <Gallery /> */}
      <Container sx={{ marginBottom: 5, marginTop:4 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ color: "#4b49ac" }}>
          خدماتنا
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                backgroundColor: "#b3b2db",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',  // Adjust width as needed
                height: '250px',  // Adjust height as needed
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CardContent>
                <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}
                >
                  <FontAwesomeIcon icon={faLaptopCode} size="3x" />
                </Container>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                  يساعد النظام على إدارة ومتابعة عمليات التوصيل بشكل كامل
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                backgroundColor: "#b3b2db",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',  // Adjust width as needed
                height: '250px',  // Adjust height as needed
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CardContent>
                <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}
                >
                  <FontAwesomeIcon icon={faShippingFast} size="3x" />
                </Container>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                  اخذ الطرود الخاصة منكم من باب الشركة وايصالها لباب منزل زبائنكم
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} justifyContent="center" alignItems="center">
            <Card sx={{
                backgroundColor: "#b3b2db",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',  // Adjust width as needed
                height: '250px',  // Adjust height as needed
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CardContent>
                <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}
                >
                  <FontAwesomeIcon icon={faShieldHalved} size="3x" />
                </Container>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                  الأمانة والسرية التامة في كافة معلومات التجار او الزبائن او الطرود
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{
          marginBottom: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                backgroundColor: "#b3b2db",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',  // Adjust width as needed
                height: '250px',  // Adjust height as needed
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CardContent>
                <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}
                >
                  <FontAwesomeIcon icon={faMapLocationDot} size="3x" />
                </Container>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                  متابعة جميع الطلبات و الحصول على معلومات كافية عنها
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                backgroundColor: "#b3b2db",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',  // Adjust width as needed
                height: '250px',  // Adjust height as needed
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CardContent>
                <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}
                >
                  <FontAwesomeIcon icon={faTruckArrowRight} size="3x" />
                </Container>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                  تتبع الطلبات و الطرود الخاصة بكم بكل سهولة
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
                backgroundColor: "#b3b2db",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',  // Adjust width as needed
                height: '250px',  // Adjust height as needed
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CardContent>
                <Container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "10px",
                    color: "#343378",
                  }}
                >
                  <FontAwesomeIcon icon={faTruckArrowRight} size="3x" />
                </Container>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '18px' }}>
                  تتبع الطلبات و الطرود الخاصة بكم بكل سهولة
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Services;
