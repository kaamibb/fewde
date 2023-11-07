class FootEr extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <footer>
      &copy; 2023 - Waroeng Petualang | Bima Arya Kurniawan
  </footer>
      `;
    }
  }
  
  customElements.define('foot-er', FootEr);
  