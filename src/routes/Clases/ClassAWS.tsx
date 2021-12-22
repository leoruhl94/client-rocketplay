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
	timestamp: string;
}

export const ClassAWS: React.FC<Props> = ({ schemaName }) => {
    
	let params: any = useParams();

	const [categoryState, setCategoryState] = useState<CategoryState[]>([]);
	const [categoryName, setCategoryName] = useState("Loading...")

	const getLikes = async () => {
		const allVideos = await axios.get(
			`${URL_BASE}/video/category?schemaName=${params.schema}&categoryId=${params.category}`
		);

		let array: any[] = [];

		for (const item of allVideos.data) {
			let likes = await axios.get(`${URL_BASE}/likes`, {
				params: { schemaName: params.schema, videoId: item.id },
			});
			let unformatedTimestamp = item.createdAt.split("T")[0]
			let split = unformatedTimestamp.split("-")
			let timestamp = `${split[2]}-${split[1]}-${split[0]}`
			let obj: any = {
				videoId: item.id,
				videoTitle: item.title,
				thumbnail: item.thumbnail,
				memberId: item.memberId,
				categoryId: item.categoryId,
				likes: likes.data.likes,
				timestamp: timestamp
			};
			array.push(obj);
		}

		setCategoryState(array);
	};

	useEffect(() => {
		getLikes();
		axios.get(`${URL_BASE}/category`, {params: {schemaName: params.schema, categoryId: params.category}})
		.then(r => setCategoryName(r.data[0].catName))
	}, []);

	return (
		<div className="class-super-container">
			<div className="class-title">
				<h1>{categoryName}</h1>
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
								timestamp={el.timestamp}
								key={el.videoId}
								videoId={el.videoId}
							/>
						);
					})
				) : (
					<div className="class-no-videos-found-div"><h4 className="class-no-videos-found">No videos were found...</h4></div>
				)}
			</div>
		</div>
	);
};
