import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import axios from "axios";
import Select from "react-select";
import "leaflet/dist/leaflet.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherMap = ({ darkMode }) => {
    const [weather, setWeather] = useState(null);
    const [position, setPosition] = useState(null);
    const [searchOptions, setSearchOptions] = useState([]);
    const [error, setError] = useState(null);

    // Get current geolocation and fetch weather
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords;
                    setPosition({ lat: latitude, lon: longitude });
                    fetchWeather(latitude, longitude);
                },
                () => setError("Geolocation permission denied. Search for a location instead."),
                { enableHighAccuracy: true }
            );
        }
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            setWeather(response.data);
            setError(null);
        } catch (error) {
            setError("Failed to fetch weather data. Try again.");
            setWeather(null);
        }
    };

    const handleSearch = async (input) => {
        if (!input.trim()) return;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${input.trim()}&limit=5&appid=${API_KEY}`
            );
            const options = response.data.map(city => ({
                value: { lat: city.lat, lon: city.lon },
                label: `${city.name}, ${city.country}`
            }));
            setSearchOptions(options);
        } catch (error) {
            setError("Failed to fetch city data. Try again.");
        }
    };

    const handleSelectCity = (selectedOption) => {
        if (!selectedOption) return;
        const { lat, lon } = selectedOption.value;
        setPosition({ lat, lon });
        fetchWeather(lat, lon);
    };

    function LocationMarker() {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition({ lat, lon: lng });
                fetchWeather(lat, lng);
            }
        });
        return position ? <Marker position={[position.lat, position.lon]}><Popup>Selected Location</Popup></Marker> : null;
    }

    return (
        <div style={{ display: "flex", height: "100vh", flexDirection: "row", background: darkMode ? "#222" : "#f8f8f8", color: darkMode ? "#fff" : "#000" }}>
            {/* Map */}
            <div style={{ flex: 1, height: "100vh" }}>
                <MapContainer center={position ? [position.lat, position.lon] : [20, 0]} zoom={position ? 10 : 2} style={{ height: "100%" }}>
                    <TileLayer
                        url={darkMode ? "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />
                    {position && (
                        <Marker position={[position.lat, position.lon]}>
                            <Popup>Your Location</Popup>
                        </Marker>
                    )}
                    <LocationMarker />
                </MapContainer>
            </div>

            {/* Weather Info Panel */}
            <div style={{
                width: "300px",
                height: "100vh",
                background: darkMode ? "#333" : "#f8f8f8",
                color: darkMode ? "#fff" : "#000",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                overflowY: "auto"
            }}>
                {/* Search Bar */}
                <div style={{ marginBottom: "20px" }}>
                <Select
    options={searchOptions}
    onInputChange={(value) => handleSearch(value)}
    onChange={handleSelectCity}
    placeholder="Search for a city..."
    filterOption={(candidate, input) => {
        const inputStr = typeof input === "string" ? input : "";
        return candidate.label.toLowerCase().includes(inputStr.toLowerCase());
    }}
    styles={{
        control: (provided) => ({
            ...provided,
            background: darkMode ? "#444" : "#fff", // Dark or Light background
            color: darkMode ? "#fff" : "#000", // Dark or Light text color
            borderRadius: "8px", // Rounded corners
            padding: "5px 10px", // Padding inside the input
            borderColor: darkMode ? "#555" : "#ccc", // Border color based on theme
            boxShadow: darkMode ? "0px 0px 8px rgba(255, 255, 255, 0.1)" : "0px 0px 8px rgba(0, 0, 0, 0.1)", 
            fontSize: "14px", 
            transition: "all 0.3s ease", 
        }),
        singleValue: (provided) => ({
            ...provided,
            color: darkMode ? "#fff" : "#000", 
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? (darkMode ? "#555" : "#ddd") : state.isFocused ? (darkMode ? "#666" : "#f0f0f0") : "",
            color: darkMode ? "#fff" : "#000",
            padding: "10px",
            cursor: "pointer",
            transition: "background-color 0.3s ease", 
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: darkMode ? "#fff" : "#000", 
        }),
        clearIndicator: (provided) => ({
            ...provided,
            color: darkMode ? "#fff" : "#000", 
        }),
        input: (provided) => ({
            ...provided,
            color: darkMode ? "#fff" : "#000",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: darkMode ? "#aaa" : "#888", 
        }),
    }}
/>

                </div>

                {/* Weather Details */}
                <h2>Weather Details</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {weather ? (
                    <div>
                        <p><strong>Location:</strong> {weather.name || "Unknown"}</p>
                        <p><strong>Temperature:</strong> {Math.round(weather.main.temp)}°C</p>
                        <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            style={{ width: "100px", height: "100px" }}
                        />
                    </div>
                ) : (
                    <p>Search for a city or click on the map to get weather data.</p>
                )}
            </div>
        </div>
    );
};

export default WeatherMap;
