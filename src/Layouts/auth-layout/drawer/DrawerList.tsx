import { List, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { logoutMenu, profileMenu } from '@/src/router/navigation/menu/AppbarMenu';
import { CustomMenuItem } from './CustomMenuItem';
import { SubMenuItemProp, verticalMenu, VerticalMenuItemProp } from '../../../router/navigation/vertical/vertical-menu';
import { getMenus } from '@/src/utilities/storage';
import { useLogin } from '@/src/hooks/auth/useLoginHandler';
import { Span, DrawerListItem } from './StyledDrawer';

const DrawerList = (props: DrawerListProps) => {
  const { open, theme, handleNavigate, listButtonSelected } = props;
  const { onLogout } = useLogin();
  const { t } = useTranslation();
  const loggedMenus = getMenus();
  const filtteredMenus = verticalMenu.filter((menu: VerticalMenuItemProp) => {
    if (loggedMenus?.findIndex((m: any) => m.name === menu.id) !== -1) {
      const finalMenu = menu;
      const finalSubMenus = finalMenu.subMenus?.filter((subMenu: SubMenuItemProp) => {
        if (loggedMenus?.some((loggedMenu: any) => loggedMenu.name === `${menu.id}/${subMenu.id}`)) return subMenu;
        return null;
      });
      finalMenu.subMenus = finalSubMenus as SubMenuItemProp[] | null;
      return finalMenu;
    }
    return null;
  });
  return (
    <List>
      {filtteredMenus.map((menuItem) => (
        <CustomMenuItem
          key={menuItem.id}
          menuItem={menuItem}
          drawerOpened={open}
          theme={theme}
          handleNavigate={handleNavigate}
          listButtonSelected={listButtonSelected}
        />
      ))}
      <DrawerListItem open={open}>
        <Span>{t('settings')}</Span>
      </DrawerListItem>
      <CustomMenuItem
        key={profileMenu.id}
        menuItem={profileMenu}
        drawerOpened={open}
        theme={theme}
        handleNavigate={handleNavigate}
        listButtonSelected={listButtonSelected}
      />
      <CustomMenuItem
        key={logoutMenu.id}
        menuItem={logoutMenu}
        drawerOpened={open}
        theme={theme}
        handleNavigate={() => onLogout()}
        listButtonSelected={listButtonSelected}
      />
    </List>
  );
};

interface DrawerListProps {
  open: boolean;
  theme: Theme;
  handleNavigate: (listItem: any) => void;
  listButtonSelected: string;
}

export default DrawerList;
