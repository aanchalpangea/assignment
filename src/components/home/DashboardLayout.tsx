import React, { useState } from 'react';
import {
    Box,
    Toolbar,
    Typography,
    Button,
    Modal,
    TextField,
    MenuItem,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SideNavbar from './SideNavbar';
import DashboardPage from './Dashboardpage';
import { useAppDispatch } from '../../hooks';
import { addProduct } from '../../redux/productslice';

const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setName('');
        setCategory('');
        setPrice('');
        setStock('');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    width: collapsed ? '5vw' : '20vw',
                    transition: 'width 0.3s ease',
                }}
            >
                <SideNavbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: collapsed ? '95vw' : '80vw',
                    transition: 'width 0.3s ease',
                    p: 3,
                    fontSize: '1.25rem',
                }}
            >
                <Toolbar />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography variant="h2" fontWeight={700}>
                        Dashboard
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontSize: '1.125rem',
                        }}
                        onClick={handleOpen}
                    >
                        + Add Product
                    </Button>
                </Box>

                <DashboardPage />

                {/* Modal */}
                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 5,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 3,
                            }}
                        >
                            <Typography variant="h5" fontWeight={700}>
                                Add New Product
                            </Typography>
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize="medium" />
                            </IconButton>
                        </Box>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={3}
                        >
                            Create a new product to add to your inventory.
                        </Typography>

                        <TextField
                            fullWidth
                            label="Product Name"
                            variant="outlined"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-input': { fontSize: '1.1rem' },
                                '& .MuiInputLabel-root': { fontSize: '1rem' },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Category"
                            select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            sx={{
                                mb: 3,
                                '& .MuiInputBase-input': { fontSize: '1.1rem' },
                                '& .MuiInputLabel-root': { fontSize: '1rem' },
                            }}
                        >
                            <MenuItem value="">Select a category</MenuItem>
                            <MenuItem value="accessories">Accessories</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="clothing">Clothing</MenuItem>
                            <MenuItem value="beauty">Beauty</MenuItem>
                            <MenuItem value="HomeNKitchen">
                                Home & Kitchen
                            </MenuItem>
                        </TextField>

                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <TextField
                                label="Price ($)"
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '1.1rem',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '1rem',
                                    },
                                }}
                            />
                            <TextField
                                label="Stock"
                                type="number"
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: '1.1rem',
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '1rem',
                                    },
                                }}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ fontSize: '1.1rem', py: 1.25 }}
                            onClick={() => {
                                if (!name || !category || !price || !stock)
                                    return;

                                dispatch(
                                    addProduct({
                                        id: Date.now().toString(),
                                        name,
                                        category,
                                        price: parseFloat(price),
                                        stock: parseInt(stock),
                                        revenue: 0,
                                        added: new Date().toLocaleDateString(),
                                    })
                                );

                                handleClose();
                            }}
                        >
                            Add Product
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
