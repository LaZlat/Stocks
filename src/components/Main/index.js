import React from 'react';
import millify from 'millify';
import {Row, Col} from 'antd';
import {Container, Title, StocksWrap, StockLink, Greeting, Text, Divide} from '../Main/MainElements';
import {useGetCryptosQuery} from '../../services/cryptoAPI';
import {Cryptos} from '../Cryptos';
import {Stocks} from '../Stocks';
import {News} from '../News';
import Loader from '../Loader';


export const Homepage = () => {
    const {data, isFetching} = useGetCryptosQuery();

    const globalStats = data?.data?.stats;

    if(isFetching) return <Loader />;



    return (
        <>
        <Container>
            <Greeting>Sveiki, {localStorage.getItem("name")},</Greeting>
            

            <Divide />
            <Title>Įvadas į  mokomąją sistemą Elektroniniai mainai</Title>

            <Divide />
            <Row>
                <Col xs={24} sm={12} lg={6} span={12}>
                    <Title>Bendra rinkos virtualių valiutų vertė</Title>
                    <Text>{millify(globalStats.totalMarketCap)} USD</Text>
                </Col>
                <Col xs={24} sm={12} lg={6} span={12}>
                    <Title>Bendra rinkos vertybinių popierių vertė</Title>
                    <Text>{millify(83530000000000)} USD</Text>
                </Col>
                <Col xs={24} sm={12} lg={6} span={12}>
                    <Title>Paskutinių 24 valandų parduotų virtualių valiutų kiekis</Title>
                    <Text>{millify(globalStats.total24hVolume)}</Text>
                </Col>
                <Col xs={24} sm={12} lg={6} span={12}>
                    <Title>24 valandų parduotų NASDAQ vertybinių popierių kiekis</Title>
                    <Text>{millify(6301122730)}</Text>
                </Col>
            </Row>

            <Divide />

            <StocksWrap>
                <Title>Top 10 virtualių valiutų</Title>
            </StocksWrap>
            <Cryptos simplified={true}/>
            <StockLink to="/cryptos">Daugiau...</StockLink>

            <Divide />
            
            <StocksWrap>
                <Title>Top 10 vertybinių popierių</Title>
            </StocksWrap>
            <Stocks simplified={true}/>
            <StockLink to="/stocks">Daugiau...</StockLink>

            <Divide />
            
            <StocksWrap>
                <Title>Papildoma medžiaga</Title>
            </StocksWrap>
            <News simplified={true}/>
            <StockLink to="/news">Daugiau...</StockLink>
        </Container>
        </>
    )
}