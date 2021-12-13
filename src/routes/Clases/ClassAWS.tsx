import axios from "axios";
import React, { useEffect, useState } from "react";
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
	likes: number;
}

export const ClassAWS: React.FC<Props> = ({ schemaName }) => {
    
	let params: any = useParams();

	const [categoryState, setCategoryState] = useState<CategoryState[]>([]);

	const getLikes = async () => {
		const allVideos = await axios.get(
			`${URL_BASE}/video/category?schemaName=${params.schema}&categoryId=${params.category}`
		);

		let array: any[] = [];

		for (const item of allVideos.data) {
			let likes = await axios.get(`${URL_BASE}/likes`, {
				params: { schemaName: params.schema, videoId: item.id },
			});

			let obj: any = {
				videoId: item.id,
				videoTitle: item.title,
				thumbnail: item.thumbnail,
				memberId: item.memberId,
				categoryId: item.categoryId,
				likes: likes.data.likes,
			};
			array.push(obj);
		}

		setCategoryState(array);
	};

	useEffect(() => {
		getLikes();
	}, []);

	return (
		<div className="class-super-container">
			<div className="class-title">
				<h1>Test AWS Category X</h1>
			</div>
			<div className="class-video-super-container">
				{categoryState.length > 0 ? (
					categoryState.map((el) => {
						return (
							<VideoFrameAWS
								schemaName={params.schema}
								videoTitle={el.videoTitle}
								thumbnail={el.thumbnail}
								likes={el.likes}
							/>
						);
					})
				) : (
					<div>Loading</div>
				)}
			</div>
		</div>
	);
};
