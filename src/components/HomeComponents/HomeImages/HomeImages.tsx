import React from "react";
import "./homeImages.scss"

export const HomeImages: React.FC = () => {
        return (
            <>
                <div className="aboutImgContainer">
                    <img className="aboutUsImg" src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/01/Top-10-Ranking-About-Us-Pages.png" alt="About Us" />
                    <h2>About Us</h2>
                </div>
                <div className="aboutImgContainer">
                    <img className="aboutUsImg" src="http://www.prexus.co/uploads/1/3/0/6/13063909/pricing_orig.png" alt="Pricing" />
                    <h2>Pricing</h2>
                </div>
            </>
        )
}