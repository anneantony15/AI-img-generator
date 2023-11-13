import React, { useState, useRef } from "react";
import './image.css';
import defaultImage from '../assets/default_image.svg';

const Image = () => {
    const [imageUrl, setImageUrl] = useState("/");
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            console.error("Input value is empty");
            return;
        }

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            });

            if (!response.ok) {
                console.error("Failed to fetch:", response.status, response.statusText);
                return;
            }

            const data = await response.json();
            console.log("API Response:", data);

            if (!Array.isArray(data.data) || data.data.length === 0 || !data.data[0].url) {
                console.error("Unexpected response structure:", data);
                return;
            }

            console.log("Image URL:", data.data[0].url);
            setImageUrl(data.data[0].url);
        } catch (error) {
            console.error("Error fetching image generation:", error);
        }
    };

    return (
        <div className='ai-image-generator'>
            <div className="header">
                AI image
                <span>
                    Generator
                </span>
                <div className="img-loading">
                    <div className="image"><img src={imageUrl === "/" ? defaultImage : imageUrl} alt="" /></div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className="search-input" placeholder="describe what do u want to see" />
                <div className="generate-btn" onClick={() => { imageGenerator() }}>GENERATE</div>
            </div>
        </div>
    );
}

export default Image;





