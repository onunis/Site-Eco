document.addEventListener("DOMContentLoaded", function() {
  const apiKey = '45d1a4871d88462a92bee29bda179636';
  const genresUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;
  const gamesUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=10`;

  const genreSelect = document.getElementById('genre-select');
  const gameList = document.getElementById('catalog-game-list');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  // Fetch and populate genres
  axios.get(genresUrl)
      .then(response => {
          const genres = response.data.results;
          genres.forEach(genre => {
              const option = document.createElement('option');
              option.value = genre.id;
              option.text = genre.name;
              genreSelect.appendChild(option);
          });
      })
      .catch(error => console.error('Error fetching genres from RAWG API:', error));

 
  function fetchGames(genreId = '', searchQuery = '') {
      let url = gamesUrl;
      if (genreId) {
          url += `&genres=${genreId}`;
      }
      if (searchQuery) {
          url += `&search=${searchQuery}`;
      }

      axios.get(url)
          .then(response => {
              const games = response.data.results;
              gameList.innerHTML = ''; // Clear the current list

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
          .catch(error => console.error('Error fetching games from RAWG API:', error));
  }

  // Initial fetch for all games
  fetchGames();

  // Fetch games based on selected genre
  genreSelect.addEventListener('change', function() {
      const selectedGenreId = genreSelect.value;
      fetchGames(selectedGenreId, searchInput.value);
  });

  // Fetch games based on search query
  searchButton.addEventListener('click', function() {
      const searchQuery = searchInput.value;
      fetchGames(genreSelect.value, searchQuery);
  });

  // Fetch games when pressing Enter in the search input
  searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          const searchQuery = searchInput.value;
          fetchGames(genreSelect.value, searchQuery);
      }
  });
});
