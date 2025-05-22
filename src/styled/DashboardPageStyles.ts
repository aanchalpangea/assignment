export const containerBox = {
    p: 3,
};

export const gridBox = {
    display: 'grid',
    gridTemplateColumns: {
        xs: '1fr',
        sm: '1fr 1fr',
        md: 'repeat(4, 1fr)',
    },
    gap: 4,
    mb: 4,
};

export const paperStyle = {
    p: 4,
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
};

export const statHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
};

export const iconContainer = {
    backgroundColor: '#BBDEFB',
    borderRadius: '50%',
    width: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const statValue = {
    mb: 1,
};

export const statTrend = {
    color: 'success.main',
};
