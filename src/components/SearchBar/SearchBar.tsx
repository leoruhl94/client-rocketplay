import "./SearchBar.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "../Icon/Icon";
import { useHistory } from "react-router";
import React from "react";

interface Props {
 
  handler?(value: any): any;
}
export const SearchBar:React.FC<Props> = ({
  handler
}) => {
  const [search, setSearch] = useState("");

  let history = useHistory();

  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handler && handler(search)
    setSearch("");
    history.push({search:`?name=${search}`})
  };

  return (
    <form onSubmit={onSubmit} className="searchbar">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onChange}
        className="searchbar_input"
      />
      <button type="submit" className="searchbar_button">
        <span className="searchbar_icon">
          <Icon svg="search"/>
        </span>
      </button>
    </form>
  );
};