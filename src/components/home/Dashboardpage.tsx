import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Dashboard from './Dashboard';
import {
    containerBox,
    gridBox,
    paperStyle,
    statHeader,
    iconContainer,
    statValue,
    statTrend,
} from '../../styled/DashboardPageStyles';

const stats = [
    {
        title: 'Total Revenue',
        value: '$7606.58',
        trend: '+12%',
        icon: <AttachMoneyIcon />,
    },
    {
        title: 'Total Orders',
        value: '401',
        trend: '+8%',
        icon: <ShoppingCartIcon />,
    },
    {
        title: 'Average Order Value',
        value: '$18.97',
        trend: '+3%',
        icon: <TrendingUpIcon />,
    },
    {
        title: 'Total Products',
        value: '5',
        trend: '',
        icon: <Inventory2Icon />,
    },
];

const DashboardPage: React.FC = () => {
    return (
        <Box sx={containerBox}>
            <Box sx={gridBox}>
                {stats.map(stat => (
                    <Paper key={stat.title} sx={paperStyle} elevation={3}>
                        <Box sx={statHeader}>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                noWrap
                            >
                                {stat.title}
                            </Typography>
                            <Box sx={iconContainer}>
                                {React.cloneElement(stat.icon, {
                                    sx: { color: '#0D47A1', fontSize: 24 },
                                })}
                            </Box>
                        </Box>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={statValue}
                        >
                            {stat.value}
                        </Typography>
                        {stat.trend && (
                            <Typography variant="body1" sx={statTrend}>
                                {stat.trend} vs last month
                            </Typography>
                        )}
                    </Paper>
                ))}
            </Box>
            <Dashboard />
        </Box>
    );
};

export default DashboardPage;
