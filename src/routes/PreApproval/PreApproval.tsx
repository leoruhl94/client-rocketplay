import React from 'react';
import { LoadingComponent } from '../../components/LoadingComponent/LoadingComponent';
import './PreApproval.scss'


export const PreApproval: React.FC = () => {
    
    return(
        <div className="preapproval" >
            <div className="preapproval__loading">
                <LoadingComponent/>
            </div>
        </div>
    )
}