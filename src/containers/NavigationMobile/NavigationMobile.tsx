import React from "react";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import "./NavigationMobile.scss";
import { useHistory } from "react-router";

interface User {
  accessToken: '', 
  name: '',
  pic: ''
}

interface Props {
  back?: string;
}
export const NavigationMobile: React.FC<Props> = ({back = ''}) => {

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
    if(!back) return history.goBack();
    history.push(back)
  };

  return (
    <section className="NavigationMobile">
      <SuperButton name={"button_Back"} icon="arrowDown" classIcon="NavigationMobile__arrow" classes="NavigationMobile__botoncitito" handler={handleGoBack} />
      <SuperButton
        icon="homeSolid"
        name={"button_home"}
        classes="NavigationMobile__button-home"
        classIcon="NavigationMobile__icon"
        route="/home"
      />
      {/* <SuperButton icon="menu" name={"button_menu"}  /> */}

      {/* <MenuMobile active={menu} /> */}
    </section>
  );
};
