import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Gallery from '../../components/SlideShow';
import { faLaptopCode, faShippingFast, faShieldHalved, faMapLocationDot, faTruckArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Grid, Card, CardContent, CardActionArea, CardMedia, Container } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <Header />
      <Gallery />
      <Container sx={{ marginBottom: 5 , marginTop:4}}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "#4b49ac" }}>
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
                  تحصيل الايرادات المالية الخاصة بالشركات التجارية و تسليمها لهم .                 </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container className="howPage" sx={{ marginBottom: 5 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "#4b49ac" }}>
          من نحن ؟
        </Typography>
        <Card >
          <CardActionArea sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              height="350"
              width="500"
              image="../../public/assets/images/delivery1.jpg"
              alt="green iguana" />
            <CardContent sx={{ textAlign: "right" }}>
              {/* <Typography gutterBottom variant="h3" component="div" sx={{ color: "#4b49ac" }}>
                Ease Delivery

              </Typography> */}
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                نظام  يدير ويتابع عمليات الشحن بشكل كامل بداية من تسليم الطلبات للمندوب ومروراً بالسائقين ووصولاً إلى المستهلك صاحب الطلب، بحيث يسهيل عملية توزيع وإدارة الطرود، وتسجيل معلومات الطرود وإدارتها ومعلومات المستلم والمرسل وإدارة مناديب التوصيل للشركات .
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                بالتالي الموقع يمكن ان يخدم كل من شركات التوصيل  و الشركات التجارية التي تريد تحويل عملياتها الى الكترونية بشكل كامل .
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>




      <Footer />
    </>
  );
}
