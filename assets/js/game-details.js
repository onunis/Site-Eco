document.addEventListener("DOMContentLoaded", function() {
  const apiKey = '45d1a4871d88462a92bee29bda179636'; 
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');
  const gameDetailsUrl = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;

  // Fetch and display game details
  axios.get(gameDetailsUrl)
      .then(response => {
          const game = response.data;
          document.getElementById('game-title').innerText = game.name;
          document.getElementById('game-image').src = game.background_image || 'https://via.placeholder.com/400';
          document.getElementById('game-rating').innerText = game.rating;
          document.getElementById('game-release-date').innerText = game.released;
          document.getElementById('game-description').innerText = game.description_raw;

          // requisitos minimos
          const minRequirements = document.getElementById('min-requirements');
          const minReqs = game.platforms[0]?.requirements?.minimum;
          minRequirements.innerHTML = minReqs ? minReqs.split('\n').map(req => `<li>${req}</li>`).join('') : '<li>N/A</li>';

          // Display requisitos recomendados
          const recRequirements = document.getElementById('rec-requirements');
          const recReqs = game.platforms[0]?.requirements?.recommended;
          recRequirements.innerHTML = recReqs ? recReqs.split('\n').map(req => `<li>${req}</li>`).join('') : '<li>N/A</li>';

          // Display screenshots
          const screenshotsContainer = document.getElementById('screenshots-container');
          axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`)
              .then(screenshotResponse => {
                  screenshotResponse.data.results.forEach(screenshot => {
                      const img = document.createElement('img');
                      img.src = screenshot.image;
                      screenshotsContainer.appendChild(img);
                  });
              })
              .catch(error => console.error('Error fetching screenshots:', error));

          // Fetch and display user reviews (if available)
          const reviewsContainer = document.getElementById('reviews-container');
          if (game.reviews) {
              game.reviews.forEach(review => {
                  const reviewElement = document.createElement('div');
                  reviewElement.classList.add('user-review');
                  reviewElement.innerHTML = `
                      <p>${review.author} - ${review.rating}/5</p>
                      <p>${review.content}</p>
                  `;
                  reviewsContainer.appendChild(reviewElement);
              });
          } else {
              reviewsContainer.innerHTML = '<p>No user reviews available.</p>';
          }
      })
      .catch(error => {
          console.error('Error fetching game details from RAWG API:', error);
      });
});
