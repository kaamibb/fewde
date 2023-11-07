class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav id="drawer" class="nav">
        <div class="logo-container">
          <a href="#/">
          <img src="images/logo.png" alt="Restaurant Logo" width="200" height="100">
          </a>
          <span class="logo-text">Waroeng Petualang</span>
        </div>       
        <button tabindex="0" class="menu-btn" id="menu" aria-label="Toggle Menu">
          <i class="fa fa-bars"></i>
        </button>
        <input type="checkbox" id="click">
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/favorite">Favorite</a></li>
          <li><a href="https://www.instagram.com/bimaryak_/" target="_blank" rel="noreferrer">About Us</a></li>
        </ul>
      </nav>
    `;

    const nav = this.querySelector('nav');
    const checkbox = this.querySelector('#click');
    const menuBtn = this.querySelector('.menu-btn');

    menuBtn.addEventListener('click', () => {
      checkbox.checked = !checkbox.checked;
    });

    menuBtn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        checkbox.checked = !checkbox.checked;
      }
    });

    function stickyNav() {
      if (window.scrollY > nav.offsetTop) {
        nav.classList.add('sticky');
      } else {
        nav.classList.remove('sticky');
      }
    }

    window.addEventListener('scroll', stickyNav);
  }
}

customElements.define('nav-bar', NavBar);
