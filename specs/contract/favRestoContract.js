/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  describe('Favorite Restaurant Contract Test Implementation', () => {
    // Alur Menyukai Restoran
    describe('When a restaurant has been liked', () => {
      beforeEach(async () => {
        await favoriteRestaurant.putRestaurant({ id: 1 });
        await favoriteRestaurant.putRestaurant({ id: 2 });
      });

      afterEach(async () => {
        await favoriteRestaurant.deleteRestaurant(1);
        await favoriteRestaurant.deleteRestaurant(2);
      });

      it('should be able to add restaurant to favorites', async () => {
        expect(await favoriteRestaurant.getRestaurant(1))
          .toEqual({ id: 1 });
        expect(await favoriteRestaurant.getRestaurant(2))
          .toEqual({ id: 2 });
        expect(await favoriteRestaurant.getRestaurant(3))
          .toEqual(undefined);
      });

      it('should not be able to add invalid restaurant to favorites', async () => {
        const invalidRestaurantId = 0; // Contoh ID restoran yang tidak valid
        try {
          await favoriteRestaurant.putRestaurant({ id: invalidRestaurantId });
        } catch (error) {
          expect(error.message).toEqual('Restaurant not found');
        }
      });
    });

    // Alur Membatalkan Menyukai Restoran
    describe('When a restaurant has been unliked', () => {
      beforeEach(async () => {
        await favoriteRestaurant.putRestaurant({ id: 1 });
        await favoriteRestaurant.putRestaurant({ id: 2 });
      });

      afterEach(async () => {
        await favoriteRestaurant.deleteRestaurant(1);
        await favoriteRestaurant.deleteRestaurant(2);
      });

      it('should be able to remove restaurant from favorites', async () => {
        await favoriteRestaurant.deleteRestaurant(1);
        expect(await favoriteRestaurant.getAllRestaurant())
          .toEqual([{ id: 2 }]);
      });

      it('should not be able to remove non-liked restaurant from favorites', async () => {
        const nonLikedRestaurantId = 3; // Contoh ID restoran yang tidak pernah disukai sebelumnya
        try {
          await favoriteRestaurant.deleteRestaurant(nonLikedRestaurantId);
        } catch (error) {
          expect(error.message).toEqual('Restaurant not found in favorites');
        }
      });
    });

    // Alur dan skenario tambahan
    describe('Additional Scenario', () => {
      it('should handle network issues during adding to favorites', async () => {
        // Skenario "Penyimpanan gagal karena masalah jaringan"
        spyOn(favoriteRestaurant, 'putRestaurant').and.callFake(() => {
          throw new Error('Network error');
        });

        try {
          await favoriteRestaurant.putRestaurant({ id: 4 });
        } catch (error) {
          expect(error.message).toEqual('Network error');
        }
      });

      it('should handle server issues during removing from favorites', async () => {
        // Skenario "Terjadi masalah server saat menghapus"
        spyOn(favoriteRestaurant, 'deleteRestaurant').and.callFake(() => {
          throw new Error('Server error');
        });

        try {
          await favoriteRestaurant.deleteRestaurant(1);
        } catch (error) {
          expect(error.message).toEqual('Server error');
        }
      });

      it('should handle connection issues during removing from favorites', async () => {
        // Skenario "Pengguna kehilangan koneksi saat menghapus dari favorit"
        spyOn(window, 'alert');
        spyOn(navigator, 'onLine', 'get').and.returnValue(false);

        try {
          await favoriteRestaurant.deleteRestaurant(2);
        } catch (error) {
          expect(window.alert).toHaveBeenCalledWith('Operation failed. Check your internet connection.');
        }
      });
    });
  });
};

export { itActsAsFavoriteRestaurantModel };
