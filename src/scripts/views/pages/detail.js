import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import RestaurantDetail from '../templates/restaurant-detail';
import ReviewInitiator from '../../utils/review-initiator';

const Detail = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    return `
      <div class="loader-container" id="loader-container">
        <div id="loader"></div>
      </div>
      <div class="detail-title">
        <h2>Detail Restaurant</h2>
      </div>
      <div id="restaurant" class="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
      <section class="testimonial-area">
        <div class="sec-title white-title">
          <h2>Testimonials</h2>
          <p>What Client Say About Us?</p>
        </div>
        <div id="restaurant-review">${ReviewInitiator.eachCustomerReview(restaurant)}</div>
      </section>
      <div class="detail-title">
        <h2>Submit Your Review</h2>
      </div>
      <div id="customerReviewFormContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loaderContainer = document.getElementById('loader-container');
    const restaurantContainer = document.querySelector('#restaurant');

    try {
      loaderContainer.style.display = 'block';

      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      restaurantContainer.innerHTML = await RestaurantDetail.render(restaurant);

      const likeButtonContainer = document.querySelector('#likeButtonContainer');
      LikeButtonInitiator.init({
        likeButtonContainer,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          pictureId: restaurant.pictureId,
          description: restaurant.description,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });

      ReviewInitiator.init({
        customerReviewContainer: document.querySelector('#restaurant-review'),
        customerReviewFormContainer: document.querySelector('#customerReviewFormContainer'),
      });
    } catch (error) {
      console.error(error);
    } finally {
      loaderContainer.style.display = 'none';
    }
  },
};

export default Detail;
