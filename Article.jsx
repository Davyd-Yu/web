import React, { useState } from 'react';

import Article1 from "../Asserts/foto1.png"
import Article2 from "../Asserts/foto2.png"
import Article3 from "../Asserts/foto3.jpg"

import MoreDataHome from './MoreDataHome';

const Article = () => {

    const [showMoreDataHome, setShowMoreDataHome] = useState(false);
    const workInfoData = [
        {
            image: Article1,
            name: " Houseplants",
            description:"Lorem ipsum doloMeet the newest member of your houseplants family. Houseplants come in all shapes, sizes and styles and we have a huge variety in our shop. So take a good look around and choose the indoor plants that will be the perfect additions to your home!r sit amet, consectetur adipiscing elit",
        },

        {
            image: Article2,
            name: "Cares",
            description:"We've got all of the care products you need to ensure your plants grow up to be healthy, happy and strong. Your green thumb worries will be a thing of the past with our super selection of curated plant health products. ipsum dolor sit amet, consectetur adipiscing elit",

        },
        {
            image: Article3,
            name: "Pots",
            description:"A suitable pot for every plant! In our online shop you will find the most beautiful plant pots for your indoor plant. In different styles and sizes, for every interior. Be inspired by our extensive collection and mix and match. The perfect flower pot shows off your plant to its fullest and ensures that your plant is happy and can grow well.",

        },
    
    ];
    const toggleMoreDataHome = () => {
        setShowMoreDataHome(!showMoreDataHome);
    };

    return (
        <div className="work-section-wrapper">
            <div className="work-section-top">
                <h1 className="primary-heading">Our Service</h1>
            </div>
            <div className="work-section-bottom">
                {workInfoData.map((data) => (
                    <div className="work-section-info" key={data.name}>
                        <div className="info-boxes-img-container">
                            <img src={data.image} id="image_data" alt={data.name} />
                        </div>
                        <h2>{data.name}</h2>
                        <p>{data.description}</p>
                    </div>
                ))}
                {showMoreDataHome && <MoreDataHome />}
            </div>

            <div className="about-buttons-container">
                <button
                    className="secondary-button_1"
                    onClick={() => {
                        setShowMoreDataHome(!showMoreDataHome);
                        toggleMoreDataHome();
                    }}
                >
                    {showMoreDataHome ? 'Hide' : 'View more'}
                </button>
            </div>
        </div>
    );
}

export default Article