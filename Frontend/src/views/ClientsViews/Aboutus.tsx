import { Container, Typography, Card, CardActionArea, CardMedia, CardContent } from "@mui/material"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const AboutUs = () => {
    return (
        <><Header />

            <Container className="howPage" sx={{ marginBottom: 5, marginTop:4 }}>
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
    )
};
export default AboutUs;
