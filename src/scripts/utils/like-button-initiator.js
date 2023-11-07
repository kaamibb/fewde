import FavoriteRestaurantIdb from '../data/favoriterestaurant-idb';

const createLikeButtonTemplate = () => {
    return `
        <button aria-label="like this restaurant" id="likeButton" class="like">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
        </button>
    `;
};

const createLikedButtonTemplate = () => {
    return `
        <button aria-label="unlike this restaurant" id="likeButton" class="like">
            <i class="fa fa-heart" aria-hidden="true"></i>
        </button>
    `;
};

const LikeButtonInitiator = {
    async init({ likeButtonContainer, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;
        if (await this._isRestaurantExist(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExist(id) {
        const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();
        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createLikedButtonTemplate();
        const likeButton = this._likeButtonContainer.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
