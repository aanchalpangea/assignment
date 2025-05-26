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
import DashboardPage from './DashboardPage';
import { useAppDispatch } from '../../hooks';
import { addProduct } from '../../redux/productslice';
import {
    layoutBox,
    sidebarBox,
    mainContentBox,
    headerBox,
    addButtonStyle,
    modalBox,
    modalHeader,
    descriptionText,
    textFieldStyle,
    dualInputBox,
    submitButton,
} from '../../styled/DashboardLayoutStyles';

const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [customCategories, setCustomCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setName('');
        setCategory('');
        setPrice('');
        setStock('');
    };

    const handleCategoryModalClose = () => {
        setCategoryModalOpen(false);
        setNewCategory('');
    };

    return (
        <Box sx={layoutBox}>
            <Box sx={sidebarBox(collapsed)}>
                <SideNavbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Box>

            <Box component="main" sx={mainContentBox(collapsed)}>
                <Toolbar />
                <Box sx={headerBox}>
                    <Typography variant="h2" fontWeight={700}>
                        Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            sx={addButtonStyle}
                            onClick={() => setCategoryModalOpen(true)}
                        >
                            Category
                        </Button>
                        <Button
                            variant="contained"
                            sx={addButtonStyle}
                            onClick={handleOpen}
                        >
                            + Add Product
                        </Button>
                    </Box>
                </Box>

                <DashboardPage />

                {/* Add Product Modal */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={modalBox}>
                        <Box sx={modalHeader}>
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
                            sx={descriptionText}
                        >
                            Create a new product to add to your inventory.
                        </Typography>

                        <TextField
                            fullWidth
                            label="Product Name"
                            variant="outlined"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            sx={textFieldStyle}
                        />

                        <TextField
                            fullWidth
                            label="Category"
                            select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            sx={textFieldStyle}
                        >
                            <MenuItem value="">Select a category</MenuItem>
                            <MenuItem value="accessories">Accessories</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="clothing">Clothing</MenuItem>
                            <MenuItem value="beauty">Beauty</MenuItem>
                            <MenuItem value="HomeNKitchen">
                                Home & Kitchen
                            </MenuItem>
                            {customCategories.map(cat => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Box sx={dualInputBox}>
                            <TextField
                                label="Price ($)"
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                fullWidth
                                sx={textFieldStyle}
                            />
                            <TextField
                                label="Stock"
                                type="number"
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                fullWidth
                                sx={textFieldStyle}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={submitButton}
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

                {/* Custom Category Modal */}
                <Modal
                    open={categoryModalOpen}
                    onClose={handleCategoryModalClose}
                >
                    <Box sx={modalBox}>
                        <Box sx={modalHeader}>
                            <Typography variant="h5" fontWeight={700}>
                                Add New Category
                            </Typography>
                            <IconButton onClick={handleCategoryModalClose}>
                                <CloseIcon fontSize="medium" />
                            </IconButton>
                        </Box>

                        <TextField
                            fullWidth
                            label="New Category Name"
                            variant="outlined"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                            sx={textFieldStyle}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={submitButton}
                            onClick={() => {
                                if (newCategory.trim()) {
                                    setCustomCategories(prev => [
                                        ...prev,
                                        newCategory.trim(),
                                    ]);
                                    handleCategoryModalClose();
                                }
                            }}
                        >
                            Add Category
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
