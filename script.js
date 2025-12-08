/* ============================================================
   GLOBAL ELEMENTS & CONSTANTS
============================================================ */
const cityInput = document.getElementById("city");
const btnSearch = document.getElementById("getWeather");
const loadingText = document.getElementById("loading");

const weatherCard = document.getElementById("weatherCard");
const weatherAnimation = document.getElementById("weatherAnimation");

const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const humidityDisplay = document.getElementById("humidity");
const windDisplay = document.getElementById("wind");
const feelsDisplay = document.getElementById("feels");

const suggestionsBox = document.getElementById("suggestions");

const hourlyContainer = document.getElementById("hourlyContainer");
const hourlyScroll = document.getElementById("hourlyScroll");

const API_KEY = "b1706952e49e652da5f5b369b672b4ad";


/* ============================================================
   SPLASH SCREEN
============================================================ */
window.addEventListener("load", () => {
    const splash = document.getElementById("splashScreen");

    setTimeout(() => {
        splash.style.opacity = "0";
        setTimeout(() => (splash.style.display = "none"), 500);
    }, 1300);
});


/* ============================================================
   WEATHER ANIMATION
============================================================ */
function applyWeatherAnimation(condition) {
    weatherAnimation.innerHTML = "";

    switch (true) {
        case condition.includes("clear"):
            createSun();
            break;

        case condition.includes("cloud"):
            createClouds();
            break;

        case condition.includes("rain"):
            createRain();
            break;
    }
}

function createSun() {
    const sun = document.createElement("div");
    sun.className = "sun";
    weatherAnimation.appendChild(sun);
}

function createClouds() {
    for (let i = 0; i < 3; i++) {
        const cloud = document.createElement("div");
        cloud.className = "cloud";
        cloud.style.top = 20 + i * 25 + "px";
        weatherAnimation.appendChild(cloud);
    }
}

function createRain() {
    for (let i = 0; i < 30; i++) {
        const drop = document.createElement("div");
        drop.className = "rain-drop";
        drop.style.setProperty("--x", `${Math.random() * 100}%`);
        weatherAnimation.appendChild(drop);
    }
}


/* ============================================================
   DISPLAY MAIN WEATHER
============================================================ */
function displayWeather(data) {
    const condition = data.weather[0].main.toLowerCase();

    locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
    temperatureDisplay.textContent = `${data.main.temp}°C`;
    descriptionDisplay.textContent = data.weather[0].description;
    feelsDisplay.textContent = `Feels like: ${data.main.feels_like}°C`;
    humidityDisplay.textContent = `Kelembapan: ${data.main.humidity}%`;
    windDisplay.textContent = `Angin: ${data.wind.speed} m/s`;

    applyWeatherAnimation(condition);

    weatherCard.classList.remove("hidden");
    weatherCard.classList.add("fade-in");
}


/* ============================================================
   HOURLY FORECAST
============================================================ */
async function fetchHourly(cityId) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.list.slice(0, 8); // 24 jam (3 jam interval)
}

function renderHourly(hourlyData) {
    hourlyScroll.innerHTML = "";
    hourlyContainer.classList.remove("hidden");

    hourlyData.forEach(entry => {
        const time = entry.dt_txt.split(" ")[1].slice(0, 5);
        const temp = Math.round(entry.main.temp);
        const icon = entry.weather[0].icon;

        const hourlyCard = document.createElement("div");
        hourlyCard.className = "hourly-item";

        hourlyCard.innerHTML = `
            <div class="hourly-time">${time}</div>
            <img class="hourly-icon" src="https://openweathermap.org/img/wn/${icon}.png">
            <div class="hourly-temp">${temp}°C</div>
        `;

        hourlyScroll.appendChild(hourlyCard);
    });
}


/* ============================================================
   FETCH MAIN WEATHER + HOURLY
============================================================ */
async function getWeather(city) {
    showLoading(true);
    weatherCard.classList.add("hidden");
    hourlyContainer.classList.add("hidden");

    try {
        const weatherURL = 
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const res = await fetch(weatherURL);
        if (!res.ok) throw new Error("Kota tidak ditemukan!");

        const data = await res.json();

        displayWeather(data);

        const cityId = data.id;
        const hourly = await fetchHourly(cityId);
        renderHourly(hourly);

        localStorage.setItem("lastCity", city);

    } catch (err) {
        alert(err.message);
    } finally {
        showLoading(false);
    }
}

function showLoading(show) {
    loadingText.classList.toggle("hidden", !show);
}


/* ============================================================
   AUTO-SUGGEST CITY SEARCH
============================================================ */
const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
};

async function fetchCitySuggestions(query) {
    if (query.length < 2) return hideSuggestions();

    const url =
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    renderSuggestions(data);
}

function renderSuggestions(list) {
    if (!list.length) return hideSuggestions();

    suggestionsBox.innerHTML = "";

    list.forEach(city => {
        const item = document.createElement("li");
        item.textContent = `${city.name}, ${city.state ? city.state + ", " : ""}${city.country}`;

        item.addEventListener("click", () => {
            cityInput.value = city.name;
            hideSuggestions();
            getWeather(city.name);
        });

        suggestionsBox.appendChild(item);
    });

    suggestionsBox.classList.remove("hidden");
}

function hideSuggestions() {
    suggestionsBox.classList.add("hidden");
}

cityInput.addEventListener("input", debounce(() => {
    fetchCitySuggestions(cityInput.value.trim());
}, 300));

document.addEventListener("click", (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== cityInput) {
        hideSuggestions();
    }
});


/* ============================================================
   HORIZONTAL SCROLL WITH MOUSE WHEEL
============================================================ */
hourlyScroll.addEventListener("wheel", e => {
    if (hourlyScroll.matches(":hover")) {
        e.preventDefault();
        hourlyScroll.scrollLeft += e.deltaY * 1.2;
    }
}, { passive: false });


/* ============================================================
   PARALLAX WEATHER CARD
============================================================ */
document.addEventListener("mousemove", e => {
    if (weatherCard.classList.contains("hidden")) return;

    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;

    weatherCard.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
});

document.addEventListener("mouseleave", () => {
    weatherCard.classList.add("leave");
    weatherCard.style.transform = "rotateX(0deg) rotateY(0deg)";

    setTimeout(() => weatherCard.classList.remove("leave"), 500);
});


/* ============================================================
   SEARCH EVENTS
============================================================ */
btnSearch.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) return alert("Masukkan nama kota!");
    if (!isNaN(city)) return alert("Nama kota tidak boleh angka!");

    getWeather(city);
});

cityInput.addEventListener("keyup", e => {
    if (e.key === "Enter") btnSearch.click();
});


/* ============================================================
   LAST CITY AUTO LOAD
============================================================ */
const lastCity = localStorage.getItem("lastCity");
if (lastCity) getWeather(lastCity);


/* ============================================================
   GEOLOCATION (optional)
============================================================ */
navigator.geolocation.getCurrentPosition(async pos => {
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${API_KEY}`;

        const res = await fetch(url);
        const data = await res.json();

        displayWeather(data);

        const hourly = await fetchHourly(data.id);
        renderHourly(hourly);

    } catch {
        console.warn("Geolocation failed.");
    }
});
