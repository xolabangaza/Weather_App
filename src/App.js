import React from "react";
import WeatherMap from "./WeatherMap";

const App = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center", padding: "10px", background: "#282c34", color: "white" }}>
                Weather Map App
            </h1>
            <WeatherMap />
        </div>
    );
};

export default App;
