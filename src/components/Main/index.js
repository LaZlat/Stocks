import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import {Container, Title, StocksWrap, StockLink} from '../Main/MainElements';
import {useGetCryptosQuery} from '../../services/cryptoAPI';
import {Stocks} from '../Stocks';


export const Homepage = () => {
    const {data, isFetching} = useGetCryptosQuery();
    const globalStats = data?.data?.stats;

    if(isFetching) return 'Loading...';

    return (
        <>
        <Container>
            <Title>Global Stock Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Stock Currencies" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total EXchanges" value="5" /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value="5" /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value="5" /></Col>
                <Col span={12}><Statistic title="Total Markets" value="5" /></Col>
            </Row>
            <StocksWrap>
                <Title>Top 10 stocks</Title>
                <StockLink to="/stocks">Daugiau...</StockLink>
            </StocksWrap>
            <Stocks simplified={true}/>
        </Container>
        </>
    )
}