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
import {
    paperStyle,
    headerStyle,
    toggleGroupStyle,
    statsContainer,
} from '../../styled/ProductSalesStyles';

type SalesData = {
    dateLabel: string;
    revenue: number;
    orders: number;
};

const ProductSales: React.FC = () => {
    const { selectedProduct } = useAppSelector(state => state.product);
    const chartRef = useRef<SVGSVGElement | null>(null);
    const [view, setView] = useState<'revenue' | 'orders' | 'stacked'>(
        'revenue'
    );

    useEffect(() => {
        if (!selectedProduct || !chartRef.current) return;

        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const width = 400;
        const height = 200;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };

        const sales = selectedProduct.sales;

        const today = new Date();
        const data: SalesData[] = sales.map((val, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (sales.length - 1 - i));
            return {
                dateLabel: `${date.getDate()}/${date.getMonth() + 1}`,
                revenue: val,
                orders: val / 10,
            };
        });

        const keys: (keyof SalesData)[] = ['revenue', 'orders'];
        const x = d3
            .scaleBand()
            .domain(data.map(d => d.dateLabel))
            .range([0, width])
            .padding(0.2);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.revenue + d.orders)!])
            .range([height, 0]);

        svg.attr('width', width + margin.left + margin.right).attr(
            'height',
            height + margin.top + margin.bottom
        );

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3
                    .axisBottom(x)
                    .tickValues(x.domain().filter((_, i) => i % 3 === 0))
            );

        g.append('g').call(d3.axisLeft(y));

        if (view === 'stacked') {
            const color = d3
                .scaleOrdinal<string>()
                .domain(keys)
                .range(['#1976d2', '#4caf50']);

            const stackedData = d3.stack<SalesData>().keys(keys)(data);

            g.selectAll('g.layer')
                .data(stackedData)
                .enter()
                .append('g')
                .attr('class', 'layer')
                .attr('fill', d => color(d.key)!)
                .selectAll('rect')
                .data(d => d)
                .enter()
                .append('rect')
                .attr('x', d => x(d.data.dateLabel)!)
                .attr('y', d => y(d[1]))
                .attr('height', d => y(d[0]) - y(d[1]))
                .attr('width', x.bandwidth());
        } else if (view === 'revenue') {
            const line = d3
                .line<SalesData>()
                .x((d: SalesData) => x(d.dateLabel)! + x.bandwidth() / 2)
                .y((d: SalesData) => y(d.revenue))
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
                .attr(
                    'cx',
                    (d: SalesData) => x(d.dateLabel)! + x.bandwidth() / 2
                )
                .attr('cy', (d: SalesData) => y(d.revenue))
                .attr('r', 3)
                .attr('fill', '#03A9F4');
        } else {
            g.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (d: SalesData) => x(d.dateLabel)!)
                .attr('y', (d: SalesData) => y(d.orders))
                .attr('width', x.bandwidth())
                .attr('height', (d: SalesData) => height - y(d.orders))
                .attr('fill', '#1976d2');
        }
    }, [selectedProduct, view]);

    if (!selectedProduct) return null;

    return (
        <Paper sx={paperStyle}>
            <Typography variant="h5" sx={headerStyle}>
                Sales for {selectedProduct.name}
            </Typography>
            <ToggleButtonGroup
                sx={toggleGroupStyle}
                exclusive
                value={view}
                onChange={(_, val) => val && setView(val)}
            >
                <ToggleButton value="revenue">Revenue</ToggleButton>
                <ToggleButton value="orders">Orders</ToggleButton>
                <ToggleButton value="stacked">Stacked</ToggleButton>
            </ToggleButtonGroup>
            <svg ref={chartRef}></svg>
            <Box sx={statsContainer}>
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
