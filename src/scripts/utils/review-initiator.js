/* eslint-disable no-alert */
import RestaurantSource from '../data/restaurant-source';
import UrlParser from '../routes/url-parser';
import { createCustomerReviewFormTemplate, createCustomerReviewTemplate } from '../views/templates/cust-review';

const ReviewInitiator = {
  init({ customerReviewContainer, customerReviewFormContainer }) {
    this._customerReviewContainer = customerReviewContainer;
    this._customerReviewFormContainer = customerReviewFormContainer;
    this._renderForm();
  },

  _showModal(message, isSuccess) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content ${isSuccess ? 'success' : 'error'}">
            <span class="close">&times;</span>
            <p><i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${message}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
        document.body.removeChild(modal);
    };

    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    // Hide the modal after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
  },

  _renderForm() {
    this._customerReviewFormContainer.innerHTML = createCustomerReviewFormTemplate();
    const reviewFormElement = document.querySelector('#form-review');

    reviewFormElement.addEventListener('submit', async (e) => {
      e.preventDefault();

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const inputName = document.querySelector('#inputName');
      const inputReview = document.querySelector('#inputReview');
      const data = {
        id: url.id,
        name: inputName.value,
        review: inputReview.value,
      };

      const responseJSON = await RestaurantSource.postRestaurantReview(data);
      const { error, message } = responseJSON;

      if (!error) {
        const date = new Date();
        const newReviewTemplate = createCustomerReviewTemplate({
          id: data.id,
          name: data.name,
          review: data.review,
          date: `${date.getDate()} ${this._monthNamesCheck(date.getMonth())} ${date.getFullYear()}`,
        });

        this._customerReviewContainer.insertAdjacentHTML('beforeend', newReviewTemplate);

        inputName.value = '';
        inputReview.value = '';

        this._showModal('Review has been successfully added!', true);
      } else {
        this._showModal(`Error: ${message}`, false);
      }
    });
  },

  _monthNamesCheck(number) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return months[number] || 'Unknown';
  },

  eachCustomerReview({ customerReviews }) {
    if (!customerReviews) {
      return '';
    }

    const reviewChunks = customerReviews.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);

    const customerReviewsString = `
      <div class="testimonial-area">
        ${reviewChunks.map(chunk => `
          <div class="container-test">
            <div class="testimonial-content owl-carousel">
              ${chunk.map(review => `
                <div class="single-testimonial">
                  <div class="round-1 round"></div>
                  <div class="round-2 round"></div>
                  <p>${review.review}</p>
                  <div class="client-info">
                    <div class="client-details">
                      <h6>${review.name}</h6>
                      <span>${review.date}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return customerReviewsString;
  },
};

export default ReviewInitiator;
