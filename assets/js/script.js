document.addEventListener("DOMContentLoaded", function() {
  const apiKey = '45d1a4871d88462a92bee29bda179636';
  const topGamesUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=5`;
  const year = new Date().getFullYear();
  const recentGamesUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=${year}-01-01,${year}-12-31&ordering=-added&page_size=5`;

  // Fetch and display top games
  axios.get(topGamesUrl)
      .then(response => {
          const games = response.data.results;
          const gameList = document.getElementById('game-list');

          games.forEach(game => {
              const gameCard = document.createElement('a');
              gameCard.classList.add('game-card');
              gameCard.href = `game-details.html?id=${game.id}`;

              gameCard.innerHTML = `
                  <img src="${game.background_image}" alt="${game.name}">
                  <div class="game-info">
                      <h3>${game.name}</h3>
                      <p>Rating: ${game.rating}</p>
                      <p>Released: ${game.released}</p>
                  </div>
              `;

              gameList.appendChild(gameCard);
          });
      })
      .catch(error => {
          console.error('Error fetching top games from RAWG API:', error);
      });

  // Fetch and display recent games
  axios.get(recentGamesUrl)
      .then(response => {
          const games = response.data.results;
          const recentGamesList = document.getElementById('recent-games-list');

          games.forEach(game => {
              const gameCard = document.createElement('a');
              gameCard.classList.add('game-card');
              gameCard.href = `game-details.html?id=${game.id}`;

              gameCard.innerHTML = `
                  <img src="${game.background_image}" alt="${game.name}">
                  <div class="game-info">
                      <h3>${game.name}</h3>
                      <p>Rating: ${game.rating}</p>
                      <p>Released: ${game.released}</p>
                  </div>
              `;

              recentGamesList.appendChild(gameCard);
          });
      })
      .catch(error => {
          console.error('Error fetching recent games from RAWG API:', error);
      });
});
