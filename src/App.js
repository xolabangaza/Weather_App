import React, { useState } from "react";
import WeatherMap from "./WeatherMap";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div style={{ background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", minHeight: "100vh" }}>
            {/* <h1 style={{ textAlign: "center", padding: "10px", background: darkMode ? "#111" : "#282c34", color: "white" }}>
                Weather Map App
            </h1> */}
            <button 
                onClick={toggleDarkMode} 
                style={{ margin: "10px", padding: "8px", cursor: "pointer", background: darkMode ? "#555" : "#ddd" }}
            >
                Toggle Dark Mode
            </button>
            <WeatherMap darkMode={darkMode} />
        </div>
    );
};

export default App;
