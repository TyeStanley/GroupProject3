import React from 'react';
import { useDispatch } from 'react-redux';
import { selectRestaurants,selectUserHearts } from '../../reducers';
import './index.scss';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Auth from '../../utils/auth';
//import useMutation and useQuery from '@apollo/client';
import { useMutation } from '@apollo/client';
import { REMOVE_HEART,ADD_HEART } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
//import useEffect from react
import { useEffect} from 'react';

function SmallRestCard() { 
  
  // initialize dispatch - dispatches actions to the store - this is how we update the store
  const dispatch = useDispatch();
  // if user is logged in then try QUERY_ME and save data to variable
  let userData;
  
    const { data } = useQuery(QUERY_ME);
    userData = data?.me;

    useEffect(() => {
      if (userData) {
        // map the _id's of the user's favorite restaurants to a new array
        const userHeartsQuery = userData.favRests.map((rest) => rest._id); 
        dispatch({ type: 'userHearts/setUserHearts', payload: userHeartsQuery });
      }
    }, [data, dispatch]);

  // setup state for current page - this is how we access the current store state
  const restaurants = useSelector(selectRestaurants);
  // setup up const for userHeart count using selectUserHears from the reducer
  const userHearts = useSelector(selectUserHearts);
  // mutations for adding and removing hearts
  const [addHeart] = useMutation(ADD_HEART);
  const [removeHeart] = useMutation(REMOVE_HEART);

 
  const handleHeartClick = (e,_id) =>{ 
    console.log(_id)
   
    const restId = _id;
    // Check to see if user has already hearted the restaurant from global state
     const userHearted = userHearts.includes(restId); 
  //  // init updatedUserHearts variable
    let updatedUserHearts;
    const targetType = 'rest'
    const heartId = restId;
    // if the user has not hearted the restaurant then add the restaurant id to the userHearts array
      if(!userHearted) {
      updatedUserHearts = [...userHearts, _id];
      addHeart({ variables: { restId} });
    } else {
      updatedUserHearts = userHearts.filter((heart) => heart !== _id);
      removeHeart({ variables: { heartId,targetType } });
    }
    dispatch({ type: 'userHearts/setUserHearts', payload: updatedUserHearts });

    const updatedRests = restaurants.map((rest) => {
      if (rest._id === _id && !userHearted) {
        // if user has not hearted the restaurant then A
        return {
          ...rest,
          heartsCount: rest.heartsCount + 1, 
          userHearts: updatedUserHearts,
        };
      }
      else if (rest._id === _id  && userHearted && userHearts.includes(rest._id)) {
        return {
          ...rest,
          heartsCount: rest.heartsCount - 1,
        };
      }
      else {
        return rest;
      }
    });
    dispatch({ type: 'restaurant/setRestaurants', payload: updatedRests });
    
    
  };
  
  const handleHasLiked = (restId) => {  
    return userHearts.includes(restId);
  };
  
  if (restaurants) {
    return (
      <div className="rest-card-container">
        {restaurants.map(({ restName, restPhotos, heartsCount, _id }, index) => (
          <div className="rest-card" key={_id}>
            <Carousel>
              {restPhotos.map(({photoUrl}, i) => (
                <Carousel.Item key={i}>
                  <img src={photoUrl} alt="" />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="rest-card-info d-flex flex-row align-items-start pt-2">
              <h2 className="rest-card-title col-md-8">{restName}</h2>
              <div className="rest-card-details rest-card-hearts col-md-4">
            
              {Auth.loggedIn() ? (
                        <div className={`rest-card-hearts d-flex ${handleHasLiked(_id) ? "red" : "white"}`}>
                          <i className="fas fa-heart col-sm-10  px-2 " onClick={(e) => handleHeartClick(e, _id)}></i>
                          <p className='heart-count-p col-sm-2 '>{heartsCount}</p>
                         
                      </div>
                      
                    ) : (
                        <div className="rest-card-hearts d-flex white">
                          <i className="fas fa-heart col-sm-10  px-2 "></i> 
                          <p className='heart-count-p col-sm-2 p-1'>{heartsCount}</p>
                        </div>
                    )}
  
            
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
  
  }

export default SmallRestCard;
