import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ApiTest() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    try {
      let imagesArray = [];
      for (let i = 0; i < 10; i++) {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search"
        );
        imagesArray.push(response.data[0].url);
      }
      setImages(imagesArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const skeletonStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "10px",
    background:
      "linear-gradient(to right, #3c3c3c 8%, #2c2c2c 38%, #3c3c3c 54%)",
    backgroundSize: "1000px 100%",
    animation: "shimmer 1.5s infinite",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px",
    position: "relative",
  };

  const shimmerStyle = `
        @keyframes shimmer {
            0% {
                background-position: -1000px 0;
            }
            100% {
                background-position: 1000px 0;
            }
        }
    `;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Random Cat Images API</h3>
      <style>{shimmerStyle}</style>{" "}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                style={skeletonStyle} 
              ></div>
            ))}
        </div>
      ) : (
        <>
          <button
            onClick={fetchImages}
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
            Click to Generate Images
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt="Random Cat"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
