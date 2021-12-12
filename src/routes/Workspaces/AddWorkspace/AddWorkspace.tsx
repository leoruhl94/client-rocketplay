import React, {useState} from 'react';
import './AddWorkspace.scss'
import { Icon } from '../../../components/Icon/Icon'

interface props{
    dep: boolean,
    handleAdd: any
}
export const AddWorkspace: React.FC<props> = ({dep, handleAdd}) => {
    const [search, setSearch] = useState('')
    const [result, setResult] = useState('Workspace')
    function handleSearch(e){
        e.preventDefault()
        setResult(search)
        console.log(search)
        
    }

    return(<>
        {dep ? <div className='addChannel__blackScreen' onClick={handleAdd}></div> : null}
        <div className={"addChannel"+(!dep ? ' addChannel__dep' : '')}>
            <div className="addChannel__container">
                <h2 className='addChannel__title'>Add Workspace</h2>
                <form className="addChannel__form" onSubmit={handleSearch}>
                    <input type="text" className="addChannel__form-name addChannel__inputs" value={search} onChange={e => setSearch(e.target.value)} placeholder="Workspace Code..."/>
                    <div className="addChannel__form-btns-cont">
                        <button type="button" className="addChannel__form-btn" onClick={handleAdd}>Back</button>
                        <button type="submit" className="addChannel__form-btn">Search</button>
                    </div>
                    {result ? <div className='addChannel__result'>
                        <div className='addChannel__result-icon-cont'>
                            <div className='addChannel__result-icon'><Icon svg='rocketColor'/></div>
                            <span className='addChannel__result-name'>{result}</span>
                        </div> 
                        <button className='addChannel__result-btn' type='button'>JOIN</button>
                    </div> : null}
                </form>
            </div>
        </div></>
    )
}