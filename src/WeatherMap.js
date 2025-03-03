import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

const WeatherMap = () => {
    const [weather, setWeather] = useState(null);
    const [position, setPosition] = useState(null);

    const MapClickHandler = () => {
        useMapEvents({
            click: async (e) => {
                const { lat, lng } = e.latlng;
                setPosition({ lat, lng });
                fetchWeather(lat, lng);
            },
        });
        return null;
    };

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
            );
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data", error);
            setWeather(null);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <MapContainer center={[20, 0]} zoom={2} style={{ flex: 1 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />
                {position && (
                    <Marker position={[position.lat, position.lng]}>
                        <Popup>Selected Location</Popup>
                    </Marker>
                )}
            </MapContainer>
            <div style={{ width: "300px", padding: "20px", background: "#f8f8f8" }}>
                <h2>Weather Details</h2>
                {weather ? (
                    <div>
                        <p><strong>Location:</strong> {weather.name || "Unknown"}</p>
                        <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                        <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                    </div>
                ) : (
                    <p>Click on the map to get weather data.</p>
                )}
            </div>
        </div>
    );
};

export default WeatherMap;
