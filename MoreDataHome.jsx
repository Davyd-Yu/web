
import React from 'react'
import avatar from "../Asserts/EMMA.jpg"

const MoreDataHome = () => {
    const workInfoData = [
        {
            image: avatar,
            title: "Accessories",
            description:"Everything you need to keep your PLNTS looking their best, all in one place. Mix it, match them and ensure your PLNTS are dressed to slay, regardless of season. There really is no quicker (or cheaper) way of sprucing up corners of your home. Go on, you and your PLNTS have earned a little treat."
        },
    ];

    return (
        <div className="work-section-bottom">
            {workInfoData.map((data) => (
                <div className="work-section-info" key={data.title}>
                    <div className="info-boxes-img-container">
                        <img src={data.image} id="image_data" alt={data.title} /> {/* Додано alt */}
                    </div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
            ))}
        </div>
    )
}

export default MoreDataHome