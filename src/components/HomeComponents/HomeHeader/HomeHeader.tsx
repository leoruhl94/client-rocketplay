import React, { useEffect } from "react";
import { Icon } from "../../../components/Icon/Icon";
import "./homeHeader.scss";

export const HomeHeader: React.FC = () => {
  let div: any = document.querySelector(".headerContainer");

  return (
    <div className="headerContainer">
      {" "}
      {/* Red container */}
      <div className="curve-bg">
        <svg
          className="bottom-curve"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1533.04 124.29"
        >
          <g data-name="Capa 2">
            <path
              d="M1533 124.29H0V98.77C254.45-4.85 453.76-9.46 592.09 7.49 807.91 33.94 923.81 118.79 1158 109.14c159.79-6.58 289.22-53.63 375-93.37z"
              fill="#22343c"
              data-name="Capa 1"
            />
          </g>
        </svg>
      </div>
      <div className="headerSubContainer">
        {/* Red sub container */}
        <div className="logo">
          {/* Logo div */}
          <Icon svg="logoDarkOutline" />
        </div>
        <div>
          {/* h1 and h2 */}
          <h1 className="title">Rocket Play</h1>
          <h2 className="subtitle">The best classroom in your hand</h2>
        </div>
        <div className="descriptionContainer">  
        {/* description */}
          <p>
            Rocket play provides the best tools for your enterprise in a single
            and compact platform.
          </p>
        </div>
      </div>
    </div>
  );
};
