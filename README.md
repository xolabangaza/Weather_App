                                   ***START***

WeatherMap Demo App

A React-based interactive weather map application that displays real-time weather information based on geolocation, city search, or map clicks, this app demonstrates my front-end development skills, API integration, and interactive UI design.

Table of Contents

* Features

* Demo Info

* Screenshots

* Technologies Used

* Setup Instructions

* Usage

* Notes

* Author

Features

* 🌍 Geolocation-based weather: Automatically fetch weather for your current location.

* 🔎 City search: Search and select cities worldwide.

* 🗺️ Interactive map: Click anywhere on the map to view weather data for that location.

* 🌗 Dark & light mode: Switchable map and UI themes.

* 🌡️ Detailed weather information: Temperature, weather conditions, humidity, wind speed, and weather icon.

* ⚡ Real time API integration: Powered by OpenWeatherMap API and React-Leaflet for map rendering.

Demo Info

⚠️ For demo purposes, the OpenWeatherMap API key is included. No additional setup is required, the app works immediately after running npm install and npm start.

This allows you to run the project instantly without creating an API key.



Technologies Used

* React.js – Frontend library for building UI.

* Axios – For API requests to OpenWeatherMap.

* React-Leaflet – Interactive map integration.

* React-Select – City search dropdown.

* OpenWeatherMap API – Weather data.

* CSS & Inline Styles – Responsive UI and theming.

* Setup Instructions

 Follow these steps to run the project locally:

* Clone the repository

* git clone <repo-url>
* cd <project-folder>


* Install dependencies

* npm install


Environment variables

The .env file at the project root includes the OpenWeatherMap API key for demo purposes:

REACT_APP_WEATHER_API_KEY=your_actual_openweathermap_api_key


No additional setup is required — the project is plug-and-play for demonstration.

Start the application

npm start


The app will open at http://localhost:3000 in your default browser.

Usage

Search for a city: Use the search box on the right panel. Select from the dropdown to see weather data.

Click on the map: Click anywhere to fetch weather for that location.

Dark mode toggle: The map and side panel adjust automatically if dark mode is enabled.

Weather details: View temperature, condition, humidity, wind speed, and weather icon.

Notes

This project is for demo purposes only.

The API key is included so anyone can run the app immediately.

For production or public repos, never commit API keys. Use environment variables or backend proxies for security.

Geolocation requires browser permission. If denied, the map defaults to a global view, and you can search for cities instead.

                                             ***END***
