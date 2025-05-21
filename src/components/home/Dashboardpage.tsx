import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Dashboard from './Dashboard';

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
        <Box sx={{ p: 3 }}>
            {/* Stats Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: 'repeat(4, 1fr)',
                    },
                    gap: 4,
                    mb: 4,
                }}
            >
                {stats.map(stat => (
                    <Paper
                        key={stat.title}
                        sx={{
                            p: 4,
                            minHeight: 150,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                        elevation={3}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                noWrap
                            >
                                {stat.title}
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#BBDEFB',
                                    borderRadius: '50%',
                                    width: 36,
                                    height: 36,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {React.cloneElement(stat.icon, {
                                    sx: { color: '#0D47A1', fontSize: 24 },
                                })}
                            </Box>
                        </Box>

                        <Typography variant="h4" fontWeight={700} mb={1}>
                            {stat.value}
                        </Typography>
                        {stat.trend && (
                            <Typography variant="body1" color="success.main">
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
