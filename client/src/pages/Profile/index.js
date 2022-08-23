import './index.scss'
import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { Modal, Tab, Button } from 'react-bootstrap';
import RestaurantCard from '../../components/RestaurantCard';
import AddRestaurant from '../../components/AddRestaurant';
import EditProfile from '../../components/EditProfile';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';


const Profile= () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const { data } = useQuery(QUERY_ME)


  let faveRest =  data?.me.favRests;
  let profilePic = data?.me.profilepic;



  

  
  
    return (

      <main>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" xl="10">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#2C2f31fd', height: '250px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src= {profilePic}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '200px', zIndex: '1' }} />
                  <MDBBtn onClick={() => setShowModal2(true)} color="dark"  style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                  <Modal 
                  
              
                  size='lg'
        show={showModal2}
        onHide={() => setShowModal2(false)}
        aria-labelledby='edituser-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='edituser'>
          <Modal.Header closeButton>
            
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='edituser'>
                <EditProfile handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
          </Tab.Container>
      </Modal>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">McKinley Wiltz</MDBTypography>
                  <MDBCardText>Food is where the heart is</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


      <section class = 'container d-flex flex-row justify-content-between'>
      <div className='col-12 col-md-8 text-center d-flex flex-wrap' id='recent-uploads-div'>
        <h2>Favorite Restaurants</h2>
          {faveRest && <RestaurantCard faveRest={faveRest}></RestaurantCard>}
        </div>
        <div>
      <MDBBtn  color= "dark" style={{height: '36px', overflow: 'visible'}} onClick={() => setShowModal(true)}>
                    Add Restaurant
              </MDBBtn>
            </div>
            <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='restaurant-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='addrestaurant'>
          <Modal.Header closeButton>
            
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='addrestaurant'>
                <AddRestaurant handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
          </Tab.Container>
      </Modal>
   
</section>
</main>


  );
}


export default Profile;