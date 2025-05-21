import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import * as d3 from 'd3';
import { revenueTrendData, bestSellingProducts } from '../../data';
import ProductTable from './ProductTable';
import ProductSales from './ProductSales';

const Dashboard: React.FC = () => {
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const container = chartRef.current.parentElement;
        const containerWidth = container?.getBoundingClientRect().width || 600;

        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = containerWidth - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        svg.attr('width', containerWidth).attr(
            'height',
            height + margin.top + margin.bottom
        );

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3
            .scalePoint()
            .domain(revenueTrendData.map(d => d.date))
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(revenueTrendData, d => d.revenue)!])
            .nice()
            .range([height, 0]);

        const line = d3
            .line<{ date: string; revenue: number }>()
            .x(d => x(d.date)!)
            .y(d => y(d.revenue))
            .curve(d3.curveMonotoneX);

        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append('g').call(d3.axisLeft(y));

        g.append('path')
            .datum(revenueTrendData)
            .attr('fill', 'none')
            .attr('stroke', '#1976d2')
            .attr('stroke-width', 2)
            .attr('d', line);

        const area = d3
            .area<{ date: string; revenue: number }>()
            .x(d => x(d.date)!)
            .y0(height)
            .y1(d => y(d.revenue))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(revenueTrendData)
            .attr('fill', 'rgba(25, 118, 210, 0.2)')
            .attr('d', area);
    }, []);

    return (
        <Box sx={{ p: 3, overflowX: 'hidden' }}>
            {/* Revenue Trend and Best Selling Products Side by Side */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                    mb: 3,
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {/* Revenue Trend Box */}
                <Paper sx={{ flex: '0 0 55%', p: 2 }}>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                        Revenue Trend
                    </Typography>
                    <svg ref={chartRef}></svg>
                </Paper>

                {/* Best Selling Products */}
                <Paper sx={{ flex: '0 0 40%', p: 2 }}>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                        Best Selling Products
                    </Typography>
                    {bestSellingProducts.map(product => (
                        <Box key={product.name} sx={{ mb: 2 }}>
                            <Typography fontWeight={500}>
                                {product.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                ${product.revenue.toFixed(2)} · {product.orders}{' '}
                                orders
                            </Typography>
                            <Box
                                sx={{
                                    height: 8,
                                    borderRadius: 5,
                                    backgroundColor: '#e0e0e0',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    sx={{
                                        height: '100%',
                                        width: `${product.percent}%`,
                                        backgroundColor: '#1976d2',
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Paper>
            </Box>

            {/* Product Table and Sales - Side by Side */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                }}
            >
                <ProductTable />
                <ProductSales />
            </Box>
        </Box>
    );
};

export default Dashboard;
