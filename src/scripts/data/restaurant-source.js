// restaurant-source.js

import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async listRestaurant() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  static async postRestaurantReview(data) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const responseText = await fetch(API_ENDPOINT.POST_REVIEW, options);
      return responseText.json();
    } catch (error) {
      return {
        error: true,
        message: `${error.message}! Review not successfully added!\nPlease check your internet connection!`,
      };
    }
  }
}

export default RestaurantSource;
