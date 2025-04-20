document.addEventListener('DOMContentLoaded', function() {
  console.log('Eiwaa Home website loaded successfully');
  
  // Add click event listeners to buttons
  const buttons = document.querySelectorAll('.cta-button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Thank you for your interest! This is a demo site.');
    });
  });

  // Handle SPA routing
  function handleRoute() {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      console.log('Handling route:', path);
      // You can implement specific route handling here
      // For now, we'll just ensure the main content is shown
      document.querySelector('main').style.display = 'block';
    }
  }

  // Run on page load
  handleRoute();

  // Handle browser navigation events
  window.addEventListener('popstate', handleRoute);
});