import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { revenueTrendData } from '../../data';
import ProductTable from './ProductTable';
import ProductSales from './ProductSales';
import { useAppSelector } from '../../hooks';

import {
    DashboardContainer,
    ChartAndProductsWrapper,
    RevenueBox,
    BestSellingBox,
    SectionTitle,
    ProductItem,
    ProductName,
    ProductInfo,
    ProgressBar,
    Progress,
    BottomSection,
} from '../../styled/DashboardStyles';
import { Button, Box } from '@mui/material';

const Dashboard: React.FC = () => {
    const chartRef = useRef<SVGSVGElement | null>(null);
    const products = useAppSelector(state => state.product.products);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const enrichedProducts = [...products]
        .map(p => ({
            ...p,
            revenue:
                p.revenue === 0
                    ? Math.floor(Math.random() * 10000) + 1
                    : p.revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .map(p => ({
            name: p.name,
            revenue: p.revenue,
            orders: p.sales?.length || 0,
            percent: Math.min((p.revenue / 10000) * 100, 100),
        }));

    const totalPages = Math.ceil(enrichedProducts.length / itemsPerPage);
    const paginatedProducts = enrichedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
        <DashboardContainer>
            <ChartAndProductsWrapper>
                <RevenueBox>
                    <SectionTitle variant="h6">Revenue Trend</SectionTitle>
                    <svg ref={chartRef}></svg>
                </RevenueBox>
                <BestSellingBox>
                    <SectionTitle variant="h6">
                        Best Selling Products
                    </SectionTitle>
                    {paginatedProducts.map(product => (
                        <ProductItem key={product.name}>
                            <ProductName>{product.name}</ProductName>
                            <ProductInfo variant="body2" gutterBottom>
                                ${product.revenue.toFixed(2)} · {product.orders}{' '}
                                orders
                            </ProductInfo>
                            <ProgressBar>
                                <Progress percent={product.percent} />
                            </ProgressBar>
                        </ProductItem>
                    ))}
                    {totalPages > 1 && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            mt={2}
                            gap={2}
                        >
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    setCurrentPage(prev =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                            >
                                Prev
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                    setCurrentPage(prev =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </Box>
                    )}
                </BestSellingBox>
            </ChartAndProductsWrapper>

            <BottomSection>
                <ProductTable />
                <ProductSales />
            </BottomSection>
        </DashboardContainer>
    );
};

export default Dashboard;
