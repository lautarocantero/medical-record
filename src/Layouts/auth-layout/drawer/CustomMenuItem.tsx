import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Collapse, List, Theme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubMenuItemProp, VerticalMenuItemProp } from '@/src/router/navigation/vertical/vertical-menu';
import { CustomListItem, DrawerMenuButton, DrawerSubmenuButton } from './StyledDrawer';

interface CustomMenuProps {
  drawerOpened: boolean;
  menuItem: VerticalMenuItemProp;
  theme: Theme;
  handleNavigate: (param: SubMenuItemProp | VerticalMenuItemProp) => void;
  listButtonSelected: string;
}

const ReturnExpandIcon = (open: boolean) => (open ? <ExpandLess /> : <ExpandMore />);

export const CustomMenuItem = ({
  drawerOpened,
  menuItem,
  theme,
  handleNavigate,
  listButtonSelected,
}: CustomMenuProps) => {
  const [open, setOpened] = useState(false);
  const { t } = useTranslation();
  const handleColapse = () => setOpened(!open);

  return (
    <CustomListItem dense disablePadding>
      <DrawerMenuButton
        theme={theme}
        justify={drawerOpened ? 'initial' : 'center'}
        pl={menuItem.subMenus ? '20px' : '25px'}
        selected={listButtonSelected.split('/')[0] === menuItem.title}
        onClick={() => (!menuItem.subMenus ? handleNavigate(menuItem) : handleColapse())}
      >
        <ListItemIcon
          className="icon"
          sx={{
            justifyContent: 'center',
            minWidth: 0,
            mr: drawerOpened ? 3 : 'auto',
          }}
        >
          <menuItem.icon fontSize="medium" sx={{ mr: menuItem.mr }} />
        </ListItemIcon>
        <ListItemText primary={t(menuItem.title, { ns: 'common' })} sx={{ opacity: drawerOpened ? 1 : 0 }} />
        {menuItem.subMenus && drawerOpened ? ReturnExpandIcon(open) : null}
      </DrawerMenuButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" dense disablePadding>
          {menuItem.subMenus &&
            drawerOpened &&
            menuItem.subMenus.map((subItem: SubMenuItemProp) => (
              <DrawerSubmenuButton
                theme={theme}
                pl={drawerOpened ? '35px' : '13px'}
                key={subItem.id}
                onClick={() => handleNavigate(subItem)}
                selected={listButtonSelected === `${menuItem.title}/${subItem.title.replace('_', '-')}`}
              >
                <ListItemIcon>
                  <subItem.icon
                    className="sub_icon"
                    sx={{
                      color: `${
                        listButtonSelected === `${menuItem.title}/${subItem.title.replace('_', '-')}` &&
                        theme.palette.primary.main
                      }`,
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={t(subItem.title, { ns: 'common' })} />
              </DrawerSubmenuButton>
            ))}
        </List>
      </Collapse>
    </CustomListItem>
  );
};
