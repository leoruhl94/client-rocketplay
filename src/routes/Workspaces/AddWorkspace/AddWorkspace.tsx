import React, { useState } from "react";
import "./AddWorkspace.scss";
import { Icon } from "../../../components/Icon/Icon";
import axios from "axios";
import { URL_BASE } from "../../../constants/constants";
import { useAuth } from "../../../auth/useAuth";

interface props {
  dep: boolean;
  handleAdd: any;
  refreshWorkspace?: any;
}
interface Result {
  found: object | null;
  message: String;
}
interface Found {
  id?: Number;
  name?: String;
  status?: String;
  code?: String;
  title?: String;
}

export const AddWorkspace: React.FC<props> = ({ dep, handleAdd, refreshWorkspace }) => {
  let found: Found = {};
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({ found: found, message: "" });
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("search", search);
    let res = await axios.get(`${URL_BASE}/workspace/find`, {
      params: { code: search.split(' ').join('')},
    });
    console.log('se busco: '+search.split(' ').join(''))
    setResult(res.data);
    console.log("result", res.data);
  };
  const handleJoin = async (e) => {
    e.preventDefault();
    console.log("code", result.found.name);
    console.log("email", auth?.user?.email);

    let res = await axios.post(`${URL_BASE}/workspace/join`, {
      schemaName: result.found.name,
      userEmail: auth?.user?.email,
      schemaTitle: result.found.title
    });
    console.log(res.data);

    
    if (res.status) {
      setSearch("");
      setResult({ found: found, message: "" });
      refreshWorkspace()
      handleAdd(dep);
    } 
  };
  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <>
      {dep ? (
        <div className="AddWorkspace__blackScreen" onClick={handleAdd}></div>
      ) : null}
      <div className={"AddWorkspace" + (!dep ? " AddWorkspace__dep" : "")}>
        <div className="AddWorkspace__container">
          <h2 className="AddWorkspace__title">Add Workspace</h2>
          <form className="AddWorkspace__form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="AddWorkspace__form-name AddWorkspace__inputs"
              value={search}
              onChange={(e) => handleSearch(e)}
              placeholder="Workspace Code..."
            />
            {result?.found?.title ? (
              <div className="AddWorkspace__result">
                <div className="AddWorkspace__result-icon-cont">
                  <div className="AddWorkspace__result-icon">
                    <Icon svg="rocketColor" />
                  </div>
                  <span className="AddWorkspace__result-name">
                    {result?.found?.title}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="AddWorkspace__form-btns-cont">
              <button
                type="button"
                className="AddWorkspace__form-btn"
                onClick={handleAdd}
              >
                Back
              </button>
              {result?.found?.name ? (
                <button
                  className="AddWorkspace__result-btn"
                  type="button"
                  onClick={handleJoin}
                >
                  JOIN
                </button>
              ) : (
                <button type="submit" className="AddWorkspace__form-btn">
                  Search
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
