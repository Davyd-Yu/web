
import React from 'react'
import Article from './Article'
import BannerImage from "../Asserts/header.png"
import { FiArrowRight } from "react-icons/fi"

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-image-section">
                    <img src={BannerImage} id="img_banner" alt="PLNTS.com Banner" /> {/* Додано alt */}
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                    Your online shop for houseplants and more!
                    </h1>
                    <p className="primary-text">
                    PLNTS.com is your one-stop shop for all plant related goodness.
                    It’s a place to learn how to become the best possible plant parent
                    and connect with other plant lovers throughout Europe
                    </p>
                    <button className="secondary-button">
                        Go to shop <FiArrowRight />{" "}
                    </button>
                </div>
            </div>
            <Article />
        </div>
    )
}

export default Home