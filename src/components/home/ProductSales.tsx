import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import * as d3 from 'd3';
import { useAppSelector } from '../../hooks';

const ProductSales: React.FC = () => {
    const { selectedProduct } = useAppSelector(state => state.product);
    const chartRef = useRef<SVGSVGElement | null>(null);
    const [view, setView] = useState<'revenue' | 'orders'>('revenue');

    useEffect(() => {
        if (!selectedProduct || !chartRef.current) return;

        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const width = 400;
        const height = 200;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };

        const data = selectedProduct.sales;
        const xLabels = data.map((_, i) => `${i + 1}`);

        const x = d3.scaleBand().domain(xLabels).range([0, width]).padding(0.2);

        const yMax = d3.max(data)!;
        const y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

        svg.attr('width', width + margin.left + margin.right).attr(
            'height',
            height + margin.top + margin.bottom
        );

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Axes
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3
                    .axisBottom(x)
                    .tickValues(x.domain().filter((d, i) => i % 3 === 0))
            );

        g.append('g').call(d3.axisLeft(y));

        if (view === 'revenue') {
            // Line chart(Revenue)
            const line = d3
                .line<number>()
                .x((_, i) => x(`${i + 1}`)! + x.bandwidth() / 2)
                .y(d => y(d))
                .curve(d3.curveMonotoneX);

            g.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', '#03A9F4')
                .attr('stroke-width', 2)
                .attr('d', line);

            g.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (_, i) => x(`${i + 1}`)! + x.bandwidth() / 2)
                .attr('cy', d => y(d))
                .attr('r', 3)
                .attr('fill', '#03A9F4');
        } else {
            // Bar chart (Orders)
            g.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (_, i) => x(`${i + 1}`)!)
                .attr('y', d => y(d))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d))
                .attr('fill', '#1976d2');
        }
    }, [selectedProduct, view]);

    if (!selectedProduct) return null;

    return (
        <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h5" fontWeight={600}>
                Sales for {selectedProduct.name}
            </Typography>
            <ToggleButtonGroup
                sx={{ my: 2 }}
                exclusive
                value={view}
                onChange={(_, val) => val && setView(val)}
            >
                <ToggleButton value="revenue">Revenue</ToggleButton>
                <ToggleButton value="orders">Orders</ToggleButton>
            </ToggleButtonGroup>
            <svg ref={chartRef}></svg>
            <Box
                sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}
            >
                <Box>
                    <Typography variant="caption">Total Revenue</Typography>
                    <Typography variant="h6" fontWeight={600}>
                        ${selectedProduct.revenue.toFixed(2)}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="caption">Total Orders</Typography>
                    <Typography variant="h6" fontWeight={600}>
                        {selectedProduct.sales.length * 10}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProductSales;
