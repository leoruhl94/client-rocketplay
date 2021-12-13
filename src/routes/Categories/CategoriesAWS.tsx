import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";

interface Props {
    schemaName: string;
}

interface CategoryState {
    categoryName: string;
    categoryId: number;
    channelId: number;
    channelName: string;
    description: string;
    isprivate: boolean;
}

export const CategoriesAWS: React.FC<Props> = ({schemaName}) => {

    let schemaName2 = "Marcos"

    const [categoryState, setCategoryState] = useState<CategoryState[]>([])

    useEffect(() => {
        axios.get(`${URL_BASE}/category?schemaName=${schemaName2}`)
        .then(r => {
            let array:any[] = []
            r.data.map(el => {
                let obj = {
                    categoryName: el.catName,
                    categoryId: el.catId,
                    channelId: el.chaId,
                    channelName: el.chaName,
                    description: el.description,
                    isprivate: el.isprivate,
                }
                array.push(obj)
            })
            setCategoryState(array)
        })
    }, [])

    return (
        <div>
            <div className="Categories">
                {
                    categoryState.length > 0 ?
                    categoryState.map(el => {
                        return (
                            <Link to={`/homeaws/${el.channelName}/${el.categoryId}`} className="Categories-link">
                                <div className="Categories__item">
                                    <div>{el.categoryName}</div>
                                    <div className="singleChannelArrow">
                                        <p>{">"}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    :
                    <></>
                }
            </div>
        </div>
    )
}