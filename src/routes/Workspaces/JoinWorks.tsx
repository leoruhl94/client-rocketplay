import axios from "axios";
import React, { useState } from "react";
import { Icon } from "../../components/Icon/Icon";
import { useAuth } from "../../auth/useAuth";
import { URL_BASE } from "../../constants/constants";
import './JoinWorks.scss'

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

export const JoinWorks: React.FC = () => {
    let found: Found = {}; 
    const auth = useAuth()
    const [search, setSearch] = useState("");
    const [result, setResult] = useState({ found: found, message: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("search", search);
        let res = await axios.get(`${URL_BASE}/workspace/find`, {
            params: { code: search.split(" ").join("") },
        });
        console.log("se busco: " + search.split(" ").join(""));
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
            schemaTitle: result.found.title,
        });
        console.log(res.data);

        if (res.status) {
            setSearch("");
            setResult({ found: found, message: "" });
            auth?.refreshInfo();
        }
    };
    function handleSearch(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }
    return (
        <div className="Workspaces__joinworks__container">
                <h2 className="Workspaces__joinworks__title">Join a Workspace</h2>
                <form className="Workspaces__joinworks__form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="Workspaces__joinworks__form-name Workspaces__joinworks__inputs"
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Workspace Code..."
                  />
                  {result?.found?.title ? (
                    <div className="Workspaces__joinworks__result">
                      <div className="Workspaces__joinworks__result-icon-cont">
                        <div className="Workspaces__joinworks__result-icon">
                          <Icon svg="rocketColor" />
                        </div>
                        <span className="Workspaces__joinworks__result-name">
                          {result?.found?.title}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="Workspaces__joinworks__form-btns-cont">
                    {result?.found?.name ? (
                      <button
                        className="Settings__button Workspaces__joinworks__form-btn"
                        type="button"
                        onClick={handleJoin}
                      >
                        JOIN
                      </button>
                    ) : (
                      <button type="submit" className="Settings__button Workspaces__joinworks__form-btn">
                        Search
                      </button>
                    )}
                  </div>
                </form>
              </div>
    )
}