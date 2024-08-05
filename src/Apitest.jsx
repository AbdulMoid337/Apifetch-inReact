import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ApiTest() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        setLoading(true); // Start loading
        try {
            let imagesArray = [];
            for (let i = 0; i < 10; i++) {
                const response = await axios.get("https://dog.ceo/api/breeds/image/random");
                imagesArray.push(response.data.message);
            }
            setImages(imagesArray);
        } catch (error) {
            console.error("No data");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h3>Random Images API</h3>
            {loading ? (
                <div style={{ fontSize: "24px", color: "#007BFF" }}>Loading...</div>
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
                                alt="Random Dog"
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
