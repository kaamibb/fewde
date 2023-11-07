const createCustomerReviewFormTemplate = () => `
<form class="form" id="form-review">
    <div class="flex-column">
      <label>Name </label></div>
      <div class="inputForm">
        <input id="inputName" type="text" class="input" placeholder="Enter your Name">
      </div>
    
    <div class="flex-column">
      <label>Review </label></div>
      <div class="inputForm">
        <input id="inputReview" type="text" class="input" placeholder="Enter your Review">
      </div>
    </div>
    <button id="submitReview" type="submit" class="button-submit">Submit Review</button>
</form>
`;

const createCustomerReviewTemplate = (customerReview) => `
<div class="container-test" id="restaurant-review">
    <div class="testimonial-content owl-carousel">
        <div class="single-testimonial">
            <div class="round-1 round"></div>
            <div class="round-2 round"></div>
            <p>${customerReview.review}</p>
            <div class="client-info">
                <div class="client-details">
                    <h6>${customerReview.name}</h6>
                    <span>${customerReview.date}</span>
                </div>
            </div>
        </div>
    </div>
</div>

`;
export {
    createCustomerReviewTemplate,
    createCustomerReviewFormTemplate,
};
