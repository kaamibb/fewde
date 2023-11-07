// home.js
import RestaurantSource from '../../data/restaurant-source';
import restoCard from '../templates/restaurant-card';

const Home = {
    async render() {
        return `
        <div class="loader-container" id="loader-container">
          <div id="loader"></div>
        </div>
        <hero-section></hero-section>
        <div id="restaurant-list" class="container">
        <div id="ex-title" class="ex-title">
        <h2 >Explore Restaurant</h2>
        </div id="list-rest">
            <div id="explore-restaurant" class="restaurant-list-container"></div>
        </div>
        `;
    },

    async afterRender() {
        const mainContainer = document.querySelector('#restaurant-list');
        const listContainer = document.querySelector('.restaurant-list-container');
        const loaderContainer = document.getElementById('loader-container');

        try {
            loaderContainer.style.display = 'block';

            const data = await RestaurantSource.listRestaurant();

            data.forEach((restaurant) => {
                listContainer.innerHTML += restoCard(restaurant);
            });

            mainContainer.style.display = 'block';
            loaderContainer.style.display = 'none';
        } catch (err) {
            console.error(err);

            mainContainer.style.display = 'none';
            listContainer.innerHTML = `Error: ${err.message}`;
            loaderContainer.style.display = 'none'; 
        }
    },
};

export default Home;
