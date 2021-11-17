import React, {useEffect, useState} from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table } from 'antd';
import {Container, Title, StocksWrap, StockLink} from '../Portfolio/PortfolioElements';
import {Cryptos} from '../Cryptos';
import {Stocks} from '../Stocks';
import Axios from "axios";


export const Portfolio = () => {

    const [cashData, setCashData] = useState(null);
    const [cryptoData, setCryptoData] = useState(null)
    const [stockData, setSockData] = useState([])

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        }
    ];
    
    useEffect(() => {
            const email = localStorage.getItem("email");
            const token = localStorage.getItem("token");
        
        Axios.get("http://localhost:3001/port/availablecash", { params: { email: email, token: token }}).then((response) => {
            if( response.status === 200) {
                setCashData(response);
            }
        }).catch(function (error) {
            if (error.response) {
                setCashData(null);
            }
        })

        Axios.get("http://localhost:3001/port/availablecrypto", { params: { email: email, token: token }}).then((response) => {
                if( response.status === 200) {
                    const cryptoData = response.data.map( e => ({
                        key: e.id,
                        name: e.name,
                        quantity: e.volume
                    }))
                    setCryptoData(cryptoData);
                }
            }).catch(function (error) {
                if (error.response) {
                    setCryptoData(null);
                }
            })

    },[]);

    /*useEffect(() => {
        async function getData() {
            const email = localStorage.getItem("email");
            const token = localStorage.getItem("token");

            await 
        }
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
          }
    },[]);*/

    if (cashData === null) {
        return null;
    }

    return (
        <>
        <Container>
            <Title>Portfolio</Title>
            <Row>
                <Col span={6}><Statistic title="Total cash" value={cashData?.data?.amount} suffix={cashData?.data?.currecny} /></Col>
            </Row>
            <StocksWrap>
                <Title>Top 10 cryptos</Title>
                <StockLink to="/cryptos">Daugiau...</StockLink>
            </StocksWrap>
            <Table dataSource={cryptoData} columns={columns} />
            {/*<Cryptos simplified={true}/>
            <StocksWrap>
                <Title>Top 10 stocks</Title>
                <StockLink to="/stocks">Daugiau...</StockLink>
            </StocksWrap>
            <Stocks simplified={true}/>*/}
        </Container>
        </>
    )
}