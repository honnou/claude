/**
 * Poly People Printing Shopify Theme
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {

  // Product image gallery functionality
  initProductGallery();

  // Sort functionality for collections
  initCollectionSort();

  // Mobile menu toggle
  initMobileMenu();

});

/**
 * Product Gallery - Click thumbnails to change main image
 */
function initProductGallery() {
  const thumbnails = document.querySelectorAll('.product-thumbnail img');
  const featuredImage = document.getElementById('ProductFeaturedImage');

  if (thumbnails.length && featuredImage) {
    thumbnails.forEach(function(thumbnail) {
      thumbnail.addEventListener('click', function() {
        const newImageSrc = this.src.replace('_200x200', '_master');
        featuredImage.src = newImageSrc;

        // Update active state
        thumbnails.forEach(t => t.parentElement.classList.remove('active'));
        this.parentElement.classList.add('active');
      });
    });
  }
}

/**
 * Collection Sort Functionality
 */
function initCollectionSort() {
  const sortSelect = document.getElementById('sort-by');

  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });

    // Set current sort value from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sortBy = urlParams.get('sort_by');
    if (sortBy) {
      sortSelect.value = sortBy;
    }
  }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      this.classList.toggle('active');
    });
  }
}

/**
 * Add to Cart functionality
 */
document.addEventListener('submit', function(e) {
  if (e.target.classList.contains('product-form')) {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Show success message or update cart
      alert('Product added to cart!');
      // You can add more sophisticated cart updates here
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      alert('There was an error adding the product to cart.');
    });
  }
});

/**
 * Search form enhancement
 */
const searchForms = document.querySelectorAll('.search-form');
searchForms.forEach(form => {
  form.addEventListener('submit', function(e) {
    const input = this.querySelector('input[type="search"]');
    if (!input.value.trim()) {
      e.preventDefault();
      input.focus();
    }
  });
});
