import { BackButton } from "../../components/Buttons/BackButton/BackButton";
import React from "react";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import "./NavigationMobile.scss";
import { useHistory } from "react-router";

export const NavigationMobile: React.FC = () => {
  let history = useHistory();
  // const [menu, setMenu] = useState(false);
  // const resetPath = () => {
  //   setMenu(false);
  //   setOrderMenu(false);
  //   setFilterMenu(false);
  //   history.push("/home");
  // };
  // const openMenu = (value:any) => {
  //   setMenu(!value);
  // };
  const handleGoBack = (): void => {
    history.goBack();
  };

  return (
    <section className="NavigationMobile">
      <SuperButton icon="undo3" name={"button_undo"} handler={handleGoBack} />
      <SuperButton
        icon="homeSolid"
        name={"button_home"}
        classes="NavigationMobile__button-home"
        classIcon="NavigationMobile__icon"
        route="/"
      />
      <SuperButton icon="menu" name={"button_menu"}  />

      {/* <MenuMobile active={menu} /> */}
    </section>
  );
};
