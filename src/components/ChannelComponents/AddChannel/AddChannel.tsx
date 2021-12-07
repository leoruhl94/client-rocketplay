import React from 'react';
import './AddChannel.scss'

interface props{
    dep: boolean,
    handleAdd: any
}
export const AddChannel: React.FC<props> = ({dep, handleAdd}) => {
    return(
        <div className={"addChannel"+(!dep ? ' addChannel__dep' : '')}>
            <div className="addChannel__container">
                <h2 className='addChannel__title'>Add Channel</h2>
                <form className="addChannel__form">
                    <input type="text" className="addChannel__form-name addChannel__inputs" placeholder="Name"/>
                    <input type="textarea" className="addChannel__form-description addChannel__inputs" placeholder="Description"/>
                    <select className="addChannel__form-select">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <div className="addChannel__form-btns-cont">
                        <button type="button" className="addChannel__form-btn" onClick={handleAdd}>Back</button>
                        <button type="submit" className="addChannel__form-btn">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}