import React, { useState } from 'react';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Paper,
    Box,
} from '@mui/material';
import { BarChart, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteProduct, selectProduct } from '../../redux/productslice';

const ProductTable: React.FC = () => {
    const products = useAppSelector(state => state.product.products);
    const dispatch = useAppDispatch();

    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Paper sx={{ p: 2, flex: 1 }}>
            {/* Header with title and search field side by side */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    Products
                </Typography>
                <TextField
                    placeholder="Search products..."
                    size="small"
                    sx={{ width: '250px' }}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </Box>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Added</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts.map(p => (
                        <TableRow key={p.id}>
                            <TableCell>
                                <strong>{p.name}</strong>
                            </TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell>${p.price}</TableCell>
                            <TableCell>{p.stock}</TableCell>
                            <TableCell>${p.revenue.toFixed(2)}</TableCell>
                            <TableCell>{p.added}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex' }}>
                                    <IconButton
                                        onClick={() =>
                                            dispatch(selectProduct(p.id))
                                        }
                                    >
                                        <BarChart />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            dispatch(deleteProduct(p.id))
                                        }
                                    >
                                        <Delete color="error" />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ProductTable;
