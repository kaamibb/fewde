import CONFIG from '../../globals/config';

const FavCard = (restaurant) => `
  <div class="card">
    <div class="card-header">
    <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
    </div>
    <div class="card-body">
      <div class="info-container">
        <span class="tag" style="background-color: ${getRandomTagColor()}">${restaurant.city}</span>
        <span class="rating">Rating: ${restaurant.rating}</span>
      </div>
      <h3 class="restaurant-fav-title"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p class="description">${restaurant.description}</p>
    </div>
  </div>
`;

const getRandomTagColor = () => {
  const tagColors = ['#3d1d94', '#c62bcd', '#FF5733'];
  const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
  return randomColor;
};

export default FavCard;
