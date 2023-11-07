/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
import { itActsAsFavoriteRestaurantModel } from './contract/favRestoContract';

let favoriteRestos = [];

const FavoriteRestoArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestos.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurant() {
    return favoriteRestos;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestos.push(restaurant);
  },

  deleteRestaurant(id) {
    // Menghapus resto berdasarkan id
    favoriteRestos = favoriteRestos.filter((restaurant) => restaurant.id !== id);
  },
};

describe('Favorite Restaurant Array Contract Test', () => {
  // Membersihkan favoriteRestos setelah setiap pengujian
  afterEach(() => favoriteRestos = []);

  itActsAsFavoriteRestaurantModel(FavoriteRestoArray);
});
