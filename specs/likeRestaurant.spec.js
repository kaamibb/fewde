/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  // Widget untuk menyukai Restoran ditampilkan
  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  // Widget menyukai Restoran ditekan oleh pengguna dan
  // Restoran ditambahkan ke daftar Restoran yang disukai
  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    document.querySelector('#likeButtonContainer').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({
      id: 1,
    });

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // Ternyata restoran sudah disukai
  // tidak perlu menyimpan kembali
  it('should not add a restaurant again when it is already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    await FavoriteRestaurantIdb.putRestaurant({
      id: 1,
    });

    document.querySelector('#likeButtonContainer').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([
      {
        id: 1,
      },
    ]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // Data restoran tidak memiliki ID
  // Sistem tidak memproses penyimpanan
  // Sistem tidak gagal
  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector('#likeButtonContainer').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
  });

  // Skenario Notifikasi
  it('should show a notification when adding a restaurant to favorites', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    document.querySelector('#likeButtonContainer').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getRestaurant(1)).toBeTruthy();
    const notification = document.querySelector('.notification');
    expect(notification.textContent).toContain('Restoran berhasil ditambahkan ke daftar favorit');
  });

  // Skenario Notifikasi
  it('should show a notification when removing a restaurant from favorites', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({
      id: 1,
    });

    document.querySelector('#likeButtonContainer').dispatchEvent(new Event('click'));
    document.querySelector('#likeButtonContainer').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
    const notification = document.querySelector('.notification');
    expect(notification.textContent).toContain('Restoran berhasil dihapus dari daftar favorit');
  });
});
