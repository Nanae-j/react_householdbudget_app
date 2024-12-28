import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface MenuItem {
  text: string;
  path: string;
  icon: React.ComponentType;
}

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}: SidebarProps) => {
  const MenuItems: MenuItem[] = [
    {
      text: 'Home',
      path: '/',
      icon: HomeIcon,
    },
    {
      text: 'Report',
      path: '/report',
      icon: SignalCellularAltIcon,
    },
  ];

  // <Drawer></Drawer>の中で表示している中身
  const drawer = (
    <div>
      <Toolbar />
      {/* ライン */}
      <Divider />
      {/* 項目 */}
      <List>
        {MenuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* モバイル用 */}
      {/* xs: 0px~ sm: 600px~ */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* PC用 */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideBar;
