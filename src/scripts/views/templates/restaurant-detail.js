import CONFIG from '../../globals/config';

function getRatingIcon(rating) {
    const maxRating = 5;
    const fullStar = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const remainingStars = maxRating - Math.ceil(rating);
    
    let ratingIcons = '';
    
    for (let i = 0; i < fullStar; i++) {
        ratingIcons += '<i class="fa fa-star"></i>';
    }
    
    if (hasHalfStar) {
        ratingIcons += '<i class="fa fa-star-half-o"></i>';
    }
    
    for (let i = 0; i < remainingStars; i++) {
        ratingIcons += '<i class="fa fa-star-o"></i>';
    }
    
    return ratingIcons;
}

const RestaurantDetail = {
    async render(restaurant) {
        return `
            <div class="wrapper">
                <article class="movie">
                    <div class="movie_img">
                    <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
                        <div id="likeButtonContainer" class="like-button-container"></div>
                    </div>
                    <div class="movie_info">
                        <h1 class="movie_title">${restaurant.name}</h1>
                        <div class="movie_desc">${restaurant.description}</div>
                        <div class="movie_details">
                            <h2>Details</h2>
                            <article>
                                <h3>Rating:</h3>
                                <ul class="horizontal-list">
                                    ${getRatingIcon(restaurant.rating)} ${restaurant.rating}
                                </ul>
                            </article>
                            <article>
                                <h3>Kota:</h3>
                                <ul class="horizontal-list">
                                    ${restaurant.city}
                                </ul>
                            </article>
                            <article>
                                <h3>Alamat:</h3>
                                <ul class="horizontal-list">
                                    ${restaurant.address}
                                </ul>
                            </article>
                            ${
                                restaurant.menus && restaurant.menus.foods
                                    ? `<article>
                                        <h3>Foods:</h3>
                                        <ul class="horizontal-list">
                                            ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
                                        </ul>
                                    </article>`
                                    : ''
                            }
                            ${
                                restaurant.menus && restaurant.menus.drinks
                                    ? `<article>
                                        <h3>Drinks:</h3>
                                        <ul class="horizontal-list">
                                            ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
                                        </ul>
                                    </article>`
                                    : ''
                            }
                        </div>
                    </div>
                </article>
            </div>
        `;
    },
};

export default RestaurantDetail;
