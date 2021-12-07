import "./BottomBar.css";
import { sortGames, allFilters } from "../../redux/actions";
import { ButtonDispatch } from "../ButtonDispatch/ButtonDispatch";
import {
  ASC,
  DESC,
  FROM_ALL,
  FROM_API,
  FROM_DB,
  MAYOR,
  MINOR,
  RESET,
  FROM,
} from "../../constantes/constantes";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { MenuMobile } from "../MenuMobile/MenuMobile";
import { useState } from "react";
import { MenuButtonsFilters } from "../MenuButtonsFilters/MenuButtonsFilters";
import { MenuButtonsOrder } from "../MenuButtonsOrder/MenuButtonsOrder";

export const BottomBar = ({ filters }) => {
  const [order, from] = useSelector((state) => [state.order, state.filterFrom]);
  let history = useHistory();
  const [menu, setMenu] = useState(false);
  const [filterMenu, setFilterMenu] = useState(false);
  const [orderMenu, setOrderMenu] = useState(false);
  const resetPath = () => {
    setMenu(false);
    setOrderMenu(false);
    setFilterMenu(false);
    history.push("/home");
  };
  const openMenu = (value) => {
    setMenu(!value);
    setOrderMenu(false);
    setFilterMenu(false);
  };
  const openOrderMenu = (value) => {
    setMenu(false);
    setOrderMenu(!value);
    setFilterMenu(false);
  };
  const openFilterMenu = (value) => {
    setMenu(false);
    setOrderMenu(false);
    setFilterMenu(!value);
  };

  return (
    <section className="bottom_bar">
      {filters && (
        <>
          <ButtonDispatch
            classes="bar_group_1"
            icon="refresh"
            name={RESET}
            value={RESET}
            action={allFilters}
            active={false}
            handler={resetPath}
          />
          <ButtonDispatch
            classes="bar_group_4"
            icon="orderAZ"
            name={ASC}
            value={ASC}
            action={sortGames}
            active={order === ASC}
          />
          <ButtonDispatch
            classes="bar_group_4"
            icon="orderZA"
            name={DESC}
            value={DESC}
            action={sortGames}
            active={order === DESC}
          />
          <ButtonDispatch
            classes="bar_group_4"
            icon="order19"
            name={MINOR}
            value={MINOR}
            action={sortGames}
            active={order === MINOR}
          />
          <ButtonDispatch
            classes="bar_group_4"
            icon="order91"
            name={MAYOR}
            value={MAYOR}
            action={sortGames}
            active={order === MAYOR}
          />
          <ButtonDispatch
            classes="bar_group_3"
            text="ALL"
            name={FROM}
            value={FROM_ALL}
            action={allFilters}
            active={from === FROM_ALL}
          />
          <ButtonDispatch
            classes="bar_group_3"
            text="DB"
            name={FROM}
            value={FROM_DB}
            action={allFilters}
            active={from === FROM_DB}
          />
          <ButtonDispatch
            classes="bar_group_3"
            text="API"
            name={FROM}
            value={FROM_API}
            action={allFilters}
            active={from === FROM_API}
          />
          <ButtonDispatch
            classes="bar_group_2-1"
            icon="order"
            value={orderMenu}
            handler={openOrderMenu}
            active={orderMenu}
          />
          <ButtonDispatch
            classes="bar_group_2-2"
            icon="filterOutline"
            value={filterMenu}
            handler={openFilterMenu}
            active={filterMenu}
          />
        </>
      )}
      <ButtonDispatch
        icon="menu"
        value={menu}
        handler={openMenu}
        active={menu}
      />
      <MenuButtonsOrder active={orderMenu} />
      <MenuButtonsFilters active={filterMenu} />
      <MenuMobile active={menu} />
    </section>
  );
};
