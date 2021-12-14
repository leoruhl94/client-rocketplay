import { PricingDetailComponent } from "./PricingDetailComponent";
import React, { useEffect } from "react";
import "./PricingComponent.scss";

import { useDispatch, useSelector } from "react-redux";
import { storeState } from "../../redux/type";
import { NavigationTop } from "../../containers/NavigationTop/NavigationTop";
import { pricingSelect } from "../../redux/actions";

const PricingComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { plans } = useSelector((state: storeState) => state);
  useEffect(() => {
    dispatch(pricingSelect(""));
  }, []);
  return (
    <div className="PricingComponent-container">
      <NavigationTop />
      <h1 className="pricingTitle">Explore current top deals</h1>

      <div className="PricingContainer">
        {plans.map((x, i) => (
          <PricingDetailComponent
            key={i}
            color={x.color}
            plan={x.name}
            price={x.price}
            description={x.description}
          />
        ))}
      </div>

    </div>
  );
};

export default PricingComponent;
