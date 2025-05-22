import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    getDrawerSx,
    getToolbarSx,
    getIconButtonSx,
    listItemSx,
    getListItemButtonSx,
    getListItemIconSx,
    getListItemTextSx,
} from '../../styled/SideNavbarStyles';

const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Products', icon: <Inventory2Icon /> },
    { text: 'Analytics', icon: <BarChartIcon /> },
    { text: 'Customers', icon: <PeopleAltIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
];

interface SideNavbarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ collapsed, setCollapsed }) => {
    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Drawer variant="permanent" sx={getDrawerSx(collapsed)}>
            <Toolbar sx={getToolbarSx(collapsed)}>
                {!collapsed && (
                    <Typography variant="h6" noWrap>
                        ShopAdmin
                    </Typography>
                )}
                <IconButton
                    onClick={handleToggle}
                    sx={getIconButtonSx(collapsed)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            <Divider />

            <List>
                {navItems.map(item => (
                    <ListItem key={item.text} disablePadding sx={listItemSx}>
                        <ListItemButton sx={getListItemButtonSx(collapsed)}>
                            <ListItemIcon sx={getListItemIconSx(collapsed)}>
                                {item.icon}
                            </ListItemIcon>
                            {!collapsed && (
                                <ListItemText
                                    primary={
                                        <Typography sx={getListItemTextSx()}>
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <List>
                <ListItem disablePadding sx={listItemSx}>
                    <ListItemButton sx={getListItemButtonSx(collapsed)}>
                        <ListItemIcon sx={getListItemIconSx(collapsed)}>
                            <LogoutIcon />
                        </ListItemIcon>
                        {!collapsed && (
                            <ListItemText
                                primary={
                                    <Typography sx={getListItemTextSx()}>
                                        Logout
                                    </Typography>
                                }
                            />
                        )}
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SideNavbar;
