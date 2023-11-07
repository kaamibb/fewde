import { itActsAsFavoriteRestaurantModel } from './contract/favRestoContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb'; // Pastikan nama file sesuai dengan lokasinya

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    const favoriteRestos = await FavoriteRestaurantIdb.getAllRestaurant();
    favoriteRestos.forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
