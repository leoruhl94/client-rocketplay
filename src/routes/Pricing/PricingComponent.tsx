import { PricingDetailComponent } from "./PricingDetailComponent";
import React from "react";
import './PricingComponent.scss'
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";


// Componente about
const PricingComponent: React.FC = () => {
    // Caja de variables

    // ----- ----- ----- ----- -----
    return (
            <div>
                <h1 className='pricingTitle'>Explore current top deals</h1>
                {/* <h5>See our products</h5> */}
                <div className='PricingContainer'>
                    <PricingDetailComponent color='violet' plan='Basic' price={29} description='Es un plan Basico' />
                    <PricingDetailComponent color='blue' plan='Standard' price={39} description='Es un plan Standard' />
                    <PricingDetailComponent color='gold' plan='Premium' price={49} description='Es un plan Premium' />
                </div>
                {/* Aquí va un componente que es un div . Mostrará data del paquete */}
                {/* Pricing component */}
                <NavigationMobile/>
        </div>
    )
} 

export default PricingComponent