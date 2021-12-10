// Imports
import React from "react";

// Styling
import './Subscriptions.scss'
import { Icon } from '../../../../components/Icon/Icon';

// Component
export const Subscriptions : React.FC = () => {
    
    // TODO: Subscriptions plan section
    // TODO: The section must be yellow
    // TODO: The section must contain a button that will change the suscription plan
    // TODO: If the suscription plan upgrade, it will show 'overlay Continue change Plan'
    // TODO: If the suscription plan downgrade, it will show 'Danger zone premium to standard'
    
    // TODO: Data section
    // TODO: The section must be a soft grey
    // TODO: The section must contain credit & payment data such as credit cards and payments
    // TODO: The data container must show last 4 digits of the credit card
    // TODO: The data container must show the next payment day
    // TODO: The data container must be 5 extra options : ->
    // TODO: Opt 1 -> Edit payment information
    // TODO: Opt 2 -> Add a new credit Card
    // TODO: Opt 3 -> Cancel subscription
    // TODO: Opt 4 -> Change payment day
    // TODO: Opt 5 -> Redeem Code



    // Returned
    return (<article className="Subs__main-article">

        {/* ..... Subscription plan ..... */}
        <section className="">
            {/* ..... Subscriptions ..... */}
            <div className="Subs__div-switcher">
                <div>
                    <h2 className="Subs__margin-reset Subs__switcher-title">Your current plan is :</h2>
                    <p className="Subs__margin-reset Subs__switcher-name">Premium Plan</p>
                </div>
                {/* ..... Button ..... */}
                <div className="Subs__switcher-icon">
                    <Icon classes="Subs__icon" svg="arrowRight"></Icon>
                </div>
            </div>
            <div className="Subs__div-details">
                <div className="Subs__details-headers">
                    <h1 className="Subs__margin-reset">Credit Data</h1>
                </div>
                <div className="Subs__details-card">
                    <Icon classes="Subs__details-icon-card" svg="credit_card"></Icon>
                    <div>
                        <h2>
                        **** **** **** 0123
                        </h2>
                        </div>
                </div>
                <div className="Subs__payment-date">
                <h3 className="Subs__margin-reset">Next payment day : DD/MM/AA</h3>
                </div>
                <div className="Subs__functions-list">
                    <h3 className="Subs__margin-reset">Edit payment information</h3>
                    <h3 className="Subs__margin-reset">Add credit card</h3>
                    <h3 className="Subs__margin-reset">Cancel subscription</h3>
                    <h3 className="Subs__margin-reset">Change payment day</h3>
                    <h3 className="Subs__margin-reset">Redeem code</h3>
                </div>

            </div>
        </section>

    </article>)
}