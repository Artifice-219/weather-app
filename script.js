    // Set current date
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dateString = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    document.querySelector('.date').textContent = dateString;

    // Loading indicator functions
    const loading = document.querySelector('.loading');
    const showLoading = () => { loading.style.display = 'block'; };
    const hideLoading = () => { loading.style.display = 'none'; };

    // Fetch weather on load
    fetchWeather('Manila');

    // Search functionality
    let button = document.querySelector('#search-btn');
    const searchInput = document.querySelector('#search-bar');

    button.addEventListener('click', function(){
      const query = searchInput.value.trim();
      if (query) {
        fetchWeather(query);
      }
    });

    // Allow search on Enter key
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          fetchWeather(query);
        }
      }
    });

    function fetchWeather(query) {
      showLoading();
      const key = "6a6ddbed41932564fd426074a1d0a2cc";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=imperial`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Location not found. Please try again.");
          }
          return response.json();
        })
        .then((data) => {
          // Update the UI with weather data
          document.querySelector('.location').textContent = data.name;
          document.querySelector('.temperature').textContent = `${Math.round(data.main.temp)}°F`;
          document.querySelector('.details').textContent = data.weather[0].description;
          document.querySelector('.feels-like').textContent = `${Math.round(data.main.feels_like)}°F`;
          document.querySelector('.wind-speed').textContent = `${data.wind.speed} mph`;
          document.querySelector('.wind-gust').textContent = data.wind.gust ? `${data.wind.gust} mph` : 'N/A';
          document.querySelector('.cloud-cover').textContent = `${data.clouds.all}%`;

          // Update weather icon
          const icon_id = data.weather[0].icon;
          const icon = document.querySelector('.weather-icon');
          icon.src = `https://openweathermap.org/img/wn/${icon_id}@2x.png`;
          
          hideLoading();
        })
        .catch((error) => {
          console.error("Error:", error);
          document.querySelector('.location').textContent = "Error";
          document.querySelector('.details').textContent = error.message;
          hideLoading();
        });
    }