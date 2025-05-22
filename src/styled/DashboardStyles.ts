// styled/DashboardStyles.ts
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const DashboardContainer = styled(Box)({
    padding: '24px',
    overflowX: 'hidden',
});

export const ChartAndProductsWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));

export const RevenueBox = styled(Paper)({
    flex: '0 0 55%',
    padding: '16px',
});

export const BestSellingBox = styled(Paper)({
    flex: '0 0 40%',
    padding: '16px',
});

export const SectionTitle = styled(Typography)({
    fontWeight: 600,
    marginBottom: '16px',
});

export const ProductItem = styled(Box)({
    marginBottom: '16px',
});

export const ProductName = styled(Typography)({
    fontWeight: 500,
});

export const ProductInfo = styled(Typography)({
    color: 'text.secondary',
});

export const ProgressBar = styled(Box)({
    height: 8,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    overflow: 'hidden',
});

export const Progress = styled(Box)<{ percent: number }>(({ percent }) => ({
    height: '100%',
    width: `${percent}%`,
    backgroundColor: '#1976d2',
}));

export const BottomSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },
}));
