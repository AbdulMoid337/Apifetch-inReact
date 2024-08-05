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
                const response = await axios.get("https://api.thecatapi.com/v1/images/search");
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

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h3>Random Cat Images API</h3>
            {loading ? (
                <p style={{ fontSize: "24px", color: "#007BFF" }}>Loading...</p>
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
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
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
