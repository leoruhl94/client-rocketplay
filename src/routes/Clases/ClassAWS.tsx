import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import { URL_BASE } from "../../constants/constants";
import { VideoFrameAWS } from "../Videos/VideoFrame/VideoFrameAWS";

interface Props {
    schemaName: string;
}

interface CategoryState {
    videoId: number;
    videoTitle: string;
    thumbnail: string;
    memberId: number;
    categoryId: number;
}

export const ClassAWS: React.FC<Props> = ({schemaName}) => {

    let params:any = useParams()

    const [categoryState, setCategoryState] = useState<CategoryState[]>([])

    useEffect(() => {
        axios.get(`${URL_BASE}/video/category?schemaName=${params.schema}&categoryId=${params.category}`)
        .then(r => {
            let array: any[] = []
            console.log(r.data)
            r.data.map(el => {
                let obj = {
                    videoId: el.id,
                    videoTitle: el.title,
                    thumbnail: el.thumbnail,
                    memberId: el.memberId,
                    categoryId: el.categoryId,
                }
                array.push(obj)
            })
            setCategoryState(array)
        })
    }, [])

    return (
        <div className="class-super-container">
            <div className="class-title">
                <h1>Test AWS Category X</h1>
            </div>
            <div className="class-video-super-container">
                {
                    categoryState.length > 0 ?
                    categoryState.map(el => {
                        return <VideoFrameAWS schemaName={params.schema} videoTitle={el.videoTitle} thumbnail={el.thumbnail} likes={23}/>
                    })
                    :
                    <></>
                }
            </div>
        </div>
    )
}