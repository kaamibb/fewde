class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="hero">
      <picture>
        <source media="(max-width: 600px)" srcset="./images/heros/hero-image_4-small.jpg">
        <img src="./images/heros/hero-image_4-large.jpg" 
             alt="hero image">
      </picture>
        <div class="hero_inner">
          <p>Experience the <span>culture</span> with a variety of great <span>restaurants</span></p>
        </div>
      </div>
    `;
  }
}

customElements.define('hero-section', HeroSection);
