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

const expandedWidth = '20vw';
const collapsedWidth = '5vw';
const textColor = '#6b7280';

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
        <Drawer
            variant="permanent"
            sx={{
                width: collapsed ? collapsedWidth : expandedWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: collapsed ? collapsedWidth : expandedWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#f9fafb',
                    transition: 'width 0.3s ease',
                    overflowX: 'hidden',
                },
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    px: collapsed ? 0 : 2,
                }}
            >
                {!collapsed && (
                    <Typography variant="h6" noWrap>
                        ShopAdmin
                    </Typography>
                )}
                <IconButton
                    onClick={handleToggle}
                    sx={{ ml: collapsed ? 0 : 'auto' }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            <Divider />

            <List>
                {navItems.map(item => (
                    <ListItem
                        key={item.text}
                        disablePadding
                        sx={{ mb: 1, justifyContent: 'center' }}
                    >
                        <ListItemButton
                            sx={{
                                py: 1.5,
                                px: collapsed ? 0 : 2,
                                justifyContent: collapsed
                                    ? 'center'
                                    : 'flex-start',
                                '&:hover': { backgroundColor: '#f3f4f6' },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: textColor,
                                    minWidth: 'unset',
                                    mr: collapsed ? 0 : 2,
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {!collapsed && (
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontSize: '1.15rem',
                                                fontWeight: 500,
                                                color: textColor,
                                            }}
                                        >
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
                <ListItem
                    disablePadding
                    sx={{ mb: 1, justifyContent: 'center' }}
                >
                    <ListItemButton
                        sx={{
                            py: 1.5,
                            px: collapsed ? 0 : 2,
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            '&:hover': { backgroundColor: '#f3f4f6' },
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: textColor,
                                minWidth: 'unset',
                                mr: collapsed ? 0 : 2,
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        {!collapsed && (
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{
                                            fontSize: '1.15rem',
                                            fontWeight: 500,
                                            color: textColor,
                                        }}
                                    >
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
