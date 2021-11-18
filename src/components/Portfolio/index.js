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
    const [stockData, setStockData] = useState(null);

    const columnsCrypto = [
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

    const columnsStock = [
        {
          title: 'Symbol',
          dataIndex: 'symbol',
          key: 'symbol',
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
                        key: e.name,
                        name: e.name,
                        quantity: e.volume
                    }))
                    console.log(cryptoData)
                    setCryptoData(cryptoData);
                }
            }).catch(function (error) {
                if (error.response) {
                    setCryptoData(null);
                }
            })

        Axios.get("http://localhost:3001/port/availablestock", { params: { email: email, token: token }}).then((response) => {
            if( response.status === 200) {
                const stockData = response.data.map( e => ({
                    key: e.symbol,
                    symbol: e.symbol,
                    quantity: e.volume
                }))
                console.log(stockData)
                    setStockData(stockData);

                }
            }).catch(function (error) {
                if (error.response) {
                    setStockData(null);
                }
            })
    },[]);

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

            <Table dataSource={cryptoData} columns={columnsCrypto} />
            <Table dataSource={stockData} columns={columnsStock} />

        </Container>
        </>
    )
}