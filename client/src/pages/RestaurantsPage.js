import { useQuery } from '@apollo/client';
import { QUERY_RESTAURANTS } from '../utils/queries';
import RestaurantCard from '../components/RestaurantCard';

export default function Restaurants() {
  const { data } = useQuery(QUERY_RESTAURANTS)

  let restaurants =  data?.restaurants;
  let mostPop ='';

  if (restaurants?.length > 5) {
    const newRest = [...restaurants];
    mostPop = restaurants
    restaurants = newRest.splice(-5).reverse();
  } else {
    mostPop = restaurants
  };
                
  if (restaurants && mostPop) {       
    return (
      <>
        <div>
          {/* <CategorySearchBar></CategorySearchBar> */}
        </div>
        <section className='d-flex justify-content-center' id='restSection'>
          <section className='d-flex flex-column restaurant-containers mx-2'>
            <h2 className='col-12 text-center mt-5 flex-wrap'>All Restaurants</h2>
            {mostPop && <RestaurantCard restaurants={mostPop} />}
          </section>
          <section className='d-flex flex-column restaurant-containers'>
            <h2 className='col-12 text-center mt-5 flex-wrap'>Most Recent</h2>
            {restaurants && <RestaurantCard restaurants={restaurants} />}
          </section> 
        </section>
      </>
    )
  }
}