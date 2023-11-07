// favorite.js
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import FavCard from '../templates/restaurant-fav-card';

const Favorite = {
    async render() {
        return `
        <div class="loader-container" id="loader-container">
            <div id="loader"></div>
        </div>
        <div class="detail-title">
    <h2>List Favorite</h2>
    </div>
            <div id="fav-list">
                <div id="restaurant" class="fav-list-cont"></div>
            </div>
        </div>
        `;
    },
    async afterRender() {
        const listContainer = document.querySelector('.fav-list-cont');
        const loaderContainer = document.getElementById('loader-container');

        try {
            loaderContainer.style.display = 'block';

            const data = await FavoriteRestaurantIdb.getAllRestaurant();

            if (data.length === 0) {
                listContainer.innerHTML = 'Tidak ada restaurant yang disukai:(';
            } else {
                data.forEach((restaurant) => {
                    listContainer.innerHTML += FavCard(restaurant);
                });
            }
        } catch (err) {
            console.error(err);

            listContainer.innerHTML = `Error: ${err.message}`;
        } finally {
            loaderContainer.style.display = 'none';
        }
    },
};



export default Favorite;
