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
    TablePagination,
} from '@mui/material';
import { BarChart, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteProduct, selectProduct } from '../../redux/productslice';
import {
    paperStyle,
    headerBoxStyle,
    titleStyle,
    searchInputStyle,
    actionsBoxStyle,
} from '../../styled/ProductTableStyles';

const ProductTable: React.FC = () => {
    const products = useAppSelector(state => state.product.products);
    const dispatch = useAppDispatch();

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const filteredProducts = products
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.category.localeCompare(b.category));

    const paginatedProducts = filteredProducts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper sx={paperStyle}>
            <Box sx={headerBoxStyle}>
                <Typography variant="h5" sx={titleStyle}>
                    Products
                </Typography>
                <TextField
                    placeholder="Search products..."
                    size="small"
                    sx={searchInputStyle}
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
                    {paginatedProducts.map(p => (
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
                                <Box sx={actionsBoxStyle}>
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

            <TablePagination
                component="div"
                count={filteredProducts.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
            />
        </Paper>
    );
};

export default ProductTable;
