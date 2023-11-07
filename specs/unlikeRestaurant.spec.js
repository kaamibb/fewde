/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    // positif
    it('should display unlike widget when the restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
    });

    it('should not display like widget when the restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
    });

    // positif
    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
    });

    // negatif
    it('should show an error message when the unliked restaurant is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        await FavoriteRestaurantIdb.deleteRestaurant(1);

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
        expect(document.querySelector('.error-message')).toBeTruthy();
    });

    // negatif
    it('should retry to unlike the restaurant after server error is resolved', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        spyOn(FavoriteRestaurantIdb, 'deleteRestaurant').and.returnValue(Promise.reject('Server error'));

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        expect(FavoriteRestaurantIdb.deleteRestaurant).toHaveBeenCalledTimes(2);
    });

    // negatif
    it('should notify the user that the operation failed and retry when the connection is restored', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

        spyOn(window, 'alert');
        spyOn(window.navigator, 'get').and.returnValue({ onLine: false });

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        expect(window.alert).toHaveBeenCalledWith('Operation failed. Check your internet connection.');

        spyOn(window.navigator, 'get').and.returnValue({ onLine: true });

        expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
    });
});
