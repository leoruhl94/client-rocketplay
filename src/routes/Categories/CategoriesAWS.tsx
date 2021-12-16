import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import { Icon } from "../../components/Icon/Icon";

interface CategoryState {
  categoryName: string;
  categoryId: number;
  channelId: number;
  isprivate: boolean;
  categoryStatus: string;
  channelName: string;
}

export const CategoriesAWS: React.FC = () => {
  let params: any = useParams();
  let id = params.channel.split("---")[1];
  const [categoryState, setCategoryState] = useState<CategoryState[]>([]);

  useEffect(() => {
    axios
      .get(
        `${URL_BASE}/category/bychannel?schemaName=${params.schema}&channelId=${id}`
      )
      .then((r) => {
        let array: any[] = [];
        // console.log(r.data)
        r.data.map((el) => {
          let obj = {
            categoryName: el.catName,
            categoryId: el.catId,
            channelId: el.chaId,
            isprivate: el.isprivate,
            categoryStatus: el.categoryStatus,
            channelName: el.chaName,
          };
          array.push(obj);
        });
        setCategoryState(array);
      });
  }, []);
  return (
    <MenuToggleContainer>
      <div className="Categories">
        <h2 className="Categories_title"> Categories </h2>
        <div className="Categories_group">
          {categoryState.length > 0 ? (
            categoryState.map((el) => {
              return (
                <Link
                  key={el.categoryId}
                  to={`/home/${params.schema}/${el.channelName}/${el.categoryId}`}
                  className="Categories-link"
                >
                  <div className="Categories__item">
                    <div>{el.categoryName}</div>
                    <span className="singleChannelArrow">
                      <Icon svg="goNext"/>
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </MenuToggleContainer>
  );
};
