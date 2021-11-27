import React from "react";
import "./SuperButton.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Icon } from "../../Icon/Icon";

interface IPayload {
  name: string;
  value: any;
}

interface Props {
  classes?: string;
  active?: boolean;
  icon?: string;
  text?: string;
  name: string;
  value?: any;
  action?(payload: IPayload): void;
  handler?(value: any): any;
  classIcon?: string;
  route?: string;
}
export const SuperButton: React.FC<Props> = ({
  classes,
  active = false,
  icon,
  text = "",
  name,
  value,
  action,
  handler,
  classIcon,
  route,
}) => {
  let dispatch = useDispatch();
  let history = useHistory();

  const handleOnClick = (e: any): void => {
    handler && handler(value);
    action && dispatch(action({ value, name }));
    route && history.push(route);
  };

  return (
    <button
      key={value}
      className={`SuperButton ${active ? "SuperButton__button--active" : ""}${
        classes ? classes : ""
      }`}
      type="button"
      value={value}
      name={name}
      onClick={handleOnClick}
    >
      {icon ? (
        <span className={` SuperButton__icon ${classIcon ? classIcon : ""}`}>
          <Icon svg={icon} /> {text}
        </span>
      ) : (
        <span className="SuperButton__text">{text}</span>
      )}
    </button>
  );
};
