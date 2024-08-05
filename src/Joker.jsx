import React, { useState, useEffect } from "react";
import axios from "axios";

function Joker() {
  const [joke, setJoke] = useState({ setup: "", punchline: "" , type : "" });
  const [loading, setLoading] = useState(true);

  const URL = "https://official-joke-api.appspot.com/random_joke";

  const getJokes = async () => {
    setLoading(true);
    try {
      let response = await axios.get(URL);
      setJoke(response.data);
    } catch (error) {
      console.error("Error fetching the joke:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect( () => {
     getJokes();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Here is The {joke.type} Joke</h2>
      <button
        onClick={getJokes}
        style={{
          padding: "10px 20px",
          margin: "20px 0",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? "Loading..." : "Click Here"}
      </button>
      <h3>{joke.setup}</h3>
      <h3>{joke.punchline}</h3>
    </div>
  );
}

export default Joker;
