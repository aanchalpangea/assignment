export const layoutBox = {
    display: 'flex',
};

export const sidebarBox = (collapsed: boolean) => ({
    width: collapsed ? '5vw' : '20vw',
    transition: 'width 0.3s ease',
});

export const mainContentBox = (collapsed: boolean) => ({
    flexGrow: 1,
    width: collapsed ? '95vw' : '80vw',
    transition: 'width 0.3s ease',
    p: 3,
    fontSize: '1.25rem',
});

export const headerBox = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
};

export const addButtonStyle = {
    textTransform: 'none',
    borderRadius: '10px',
    fontSize: '1.125rem',
};

export const modalBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 5,
};

export const modalHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
};

export const descriptionText = {
    mb: 3,
};

export const textFieldStyle = {
    mb: 3,
    '& .MuiInputBase-input': { fontSize: '1.1rem' },
    '& .MuiInputLabel-root': { fontSize: '1rem' },
};

export const dualInputBox = {
    display: 'flex',
    gap: 2,
    mb: 3,
};

export const submitButton = {
    fontSize: '1.1rem',
    py: 1.25,
};
