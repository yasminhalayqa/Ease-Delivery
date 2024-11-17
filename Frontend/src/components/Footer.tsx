import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBIcon,
  MDBRow,
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <div>
      <MDBFooter className='text-center' color='white'>
        <section className='footer-section'>
          <MDBContainer className='text-center text-md-start'>
            <MDBRow className='text-end'>
              <MDBCol className='mt-3'>
                <h6 className='text-uppercase fw-bold mb-2'> اتصل بنا </h6>
                <div className='footer-content '>
                  <p>
                    <MDBIcon color='secondary' icon='home' /> فلسطين _ الخليل
                  </p>
                  <p>
                    <MDBIcon color='secondary' icon='envelope' /> abumadialaa@gmail.com
                  </p>
                  <p>
                    <MDBIcon color='secondary' icon='phone' /> 0569544795
                  </p>
                </div>
              </MDBCol>
              <MDBCol className='mt-4'>
                <h6 className='text-uppercase fw-bold mb-2'> مواقع التواصل الاجتماعي</h6>
                <div className='d-flex'>
                  <MDBBtn
                    floating
                    className='m-1 d-flex'
                    // style={{ backgroundColor: '#3b5998' }}
                    href='#!'
                    role='button'
                  >
                    <MDBIcon fab icon='facebook-f' />
                  </MDBBtn>

                  <MDBBtn
                    floating
                    className='m-1 d-flex'
                    style={{ backgroundColor: '#ac2bac' }}
                    href='#!'
                    role='button'
                  >
                    <MDBIcon fab icon='instagram' />
                  </MDBBtn>

                  <MDBBtn
                    floating
                    className='m-1 d-flex'
                    style={{ backgroundColor: '#0082ca' }}
                    href='#!'
                    role='button'
                  >
                    <MDBIcon fab icon='linkedin-in' />
                  </MDBBtn>
                </div>

                <div className=' footer-section mt-4'>
                  © 2024 Copyright:
                  <a className='text-white' href='https://mdbootstrap.com/'>Ease Delivery</a>
                </div>
              </MDBCol>
              <MDBCol className='mt-3'>
                <h6 className='text-uppercase fw-bold mb-2'> روابط مفيدة </h6>
                <div className='footer-content '>
                  <a href="#" className="text-white m-2">تتبع طلبك</a>
                  <br />
                  <a href="#" className="text-white m-2">الخدمات </a>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </MDBFooter>
    </div>
  );
}
