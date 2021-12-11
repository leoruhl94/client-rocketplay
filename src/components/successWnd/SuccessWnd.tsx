import React from 'react';
import { useHistory } from 'react-router';
import './SuccessWnd.scss'

interface props{
    text: string;
}
export const SuccessWnd: React.FC<props> = ({text}) => {
    const history = useHistory() 
    return (
        <div className="SuccessWnd__Screen">
            <div className="SuccessWnd__wnd">
                <span className="SuccessWnd__wnd--text">{text}</span>
                <div className="SuccessWnd__wnd--icon">
                    <div className='SuccessWnd__wnd--iconCheck--cont'>
                        <div className='SuccessWnd__wnd--iconCheck'/>
                    </div>
                </div>
                <button className='SuccessWnd__wnd--btn' onClick={e =>history.push('/home')}>
                    Accept
                </button>
            </div>
        </div>
    )
}