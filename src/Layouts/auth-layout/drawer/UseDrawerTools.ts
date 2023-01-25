import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/src/context/AuthContext';
import { SubMenuItemProp, verticalMenu, VerticalMenuItemProp } from '@/src/router/navigation/vertical/vertical-menu';
import { getMenus } from '@/src/utilities/storage';
import { menuList } from '@/src/router/navigation/menu/AppbarMenu';

export const useDrawerTools = () => {
  const location = useLocation();
  const { user: userInfo } = useContext(AuthContext);

  const [listButtonSelected, setListButtonSelected] = useState('');
  const navigate = useNavigate();
  const handleNavigate = (listItem: any) => {
    const path = listItem.navLink.split('/');
    setListButtonSelected(path.length > 2 ? `${path[1]}/${listItem.title.replace('_', '-')}` : listItem.title);
    navigate(listItem.navLink);
  };
  const loggedMenus = getMenus();
  const filtteredMenus = verticalMenu.concat(menuList).filter((menu: VerticalMenuItemProp) => {
    if (
      loggedMenus?.findIndex(
        (m: any) =>
          m.name === menu.id || m.subMenus?.findIndex((subMenu: SubMenuItemProp) => subMenu.id === menu.id) !== -1,
      ) !== -1
    )
      return menu;
    return null;
  });

  useEffect(() => {
    const currentUrl = location.pathname.slice(1);
    const existsUrl = filtteredMenus.find((item) => {
      if (item.title === currentUrl) return item;
      if (item.subMenus) {
        return (
          item.subMenus?.find(
            (subMenu: SubMenuItemProp) => `${item?.title}/${subMenu?.title.replace('_', '-')}` === currentUrl,
          ) !== undefined
        );
      }
      return false;
    });
    setListButtonSelected(existsUrl ? currentUrl : loggedMenus[0].name);
  }, []);
  return {
    handleNavigate,
    listButtonSelected,
    userInfo,
  };
};
