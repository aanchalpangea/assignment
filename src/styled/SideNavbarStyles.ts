const textColor = '#6b7280';
const expandedWidth = '20vw';
const collapsedWidth = '5vw';

export const getDrawerSx = (collapsed: boolean) => ({
    width: collapsed ? collapsedWidth : expandedWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: collapsed ? collapsedWidth : expandedWidth,
        boxSizing: 'border-box',
        backgroundColor: '#f9fafb',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
    },
});

export const getToolbarSx = (collapsed: boolean) => ({
    display: 'flex',
    justifyContent: collapsed ? 'center' : 'space-between',
    px: collapsed ? 0 : 2,
});

export const getIconButtonSx = (collapsed: boolean) => ({
    ml: collapsed ? 0 : 'auto',
});

export const listItemSx = {
    mb: 1,
    justifyContent: 'center',
};

export const getListItemButtonSx = (collapsed: boolean) => ({
    py: 1.5,
    px: collapsed ? 0 : 2,
    justifyContent: collapsed ? 'center' : 'flex-start',
    '&:hover': { backgroundColor: '#f3f4f6' },
});

export const getListItemIconSx = (collapsed: boolean) => ({
    color: textColor,
    minWidth: 'unset',
    mr: collapsed ? 0 : 2,
    justifyContent: 'center',
});

export const getListItemTextSx = () => ({
    fontSize: '1.15rem',
    fontWeight: 500,
    color: textColor,
});
