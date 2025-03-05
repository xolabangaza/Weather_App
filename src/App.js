import React, { useState } from "react";
import WeatherMap from "./WeatherMap";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div style={{ background: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Dark Mode Toggle Button */}
            <button 
                onClick={toggleDarkMode} 
                style={{
                    margin: "20px", 
                    padding: "10px 20px", 
                    cursor: "pointer", 
                    background: darkMode ? "#444" : "#fff", 
                    color: darkMode ? "#fff" : "#333", 
                    border:darkMode ? "1px solid #fff": " 1px solid #000", 
                    borderRadius: "30px", 
                    fontSize: "16px",
                    boxShadow: darkMode ? "0px 0px 8px rgba(255, 255, 255, 0.2)" : "0px 0px 8px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                    alignSelf: "center" // Centers the button
                }}
            >
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>

            {/* WeatherMap Component */}
            <WeatherMap darkMode={darkMode} />
        </div>
    );
};

export default App;
