import { PricingDetailComponent } from "./PricingDetailComponent";
import React, { useEffect } from "react";
import './PricingComponent.scss'
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { storeState } from "../../redux/type";

// Componente about
const PricingComponent: React.FC = () => {
    const {plans} = useSelector((state: storeState) => state) 

    return (
            <div>
                <h1 className='pricingTitle'>Explore current top deals</h1>
                {/* <h5>See our products</h5> */}
                <div className='PricingContainer'>
                    {plans.map((x, i) => <PricingDetailComponent color={i} plan={x.name} price={x.price} description={x.description} />)}
                    {/* <PricingDetailComponent color='violet' plan='Basic' price={29} description='Es un plan Basico' />
                    <PricingDetailComponent color='blue' plan='Standard' price={39} description='Es un plan Standard' />
                    <PricingDetailComponent color='gold' plan='Premium' price={49} description='Es un plan Premium' /> */}
                </div>
                {/* Aquí va un componente que es un div . Mostrará data del paquete */}
                {/* Pricing component */}
                <NavigationMobile/>
        </div>
    )
} 

export default PricingComponent