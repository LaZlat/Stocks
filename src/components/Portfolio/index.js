import React, {useEffect, useState} from 'react';
import millify from 'millify';
import {Row, Table} from 'antd';
import {Container, Title, Text, Greeting, PortLink, Button, Column} from '../Portfolio/PortfolioElements';
import Axios from "axios";


export const Portfolio = () => {

    const [cashData, setCashData] = useState(null);
    const [cryptoData, setCryptoData] = useState(null)
    const [stockData, setStockData] = useState(null);

    const columnsCrypto = [
        {
            title: 'Nr',
            dataIndex: 'nr',
            key: 'nr',
          },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Pirkti/Parduoti',
            dataIndex: 'pirkti/parduoti',
            key: 'pirkti/parduoti',
            render: (text, record) => (
                  <PortLink to={`/crypto/${record.nr}`}>Pirkti/Parduoti</PortLink>
            ),
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
        },
        {
            title: 'Pirkti/Parduoti',
            key: 'pirkti/parduoti',
            render: (record) => (
                  <PortLink to={"/stock/" + record?.symbol}>Pirkti/Parduoti</PortLink>
              ),
        }
    ];

    const generateCSV = () => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        Axios.get('http://localhost:3001/port/generatecsv', { params: { email: email, token: token }})
        .then((response) => {
            let link = document.createElement('a')
            link.id = 'download-csv'
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.data));
            link.setAttribute('download', 'portfolio_' + email + '.csv');
            document.body.appendChild(link)
            document.querySelector('#download-csv').click()
        })
    }

    
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

        Axios.get("http://localhost:3001/port/availablestock", { params: { email: email, token: token }}).then((response) => {
            if( response.status === 200) {
                const stockData = response.data.map( e => ({
                    key: e.symbol,
                    symbol: e.symbol,
                    quantity: e.volume
                }))
                    setStockData(stockData);

                }
            }).catch(function (error) {
                if (error.response) {
                    setStockData(null);
                }
            })

        Axios.get("http://localhost:3001/port/availablecrypto", { params: { email: email, token: token }}).then((response) => {
                if( response.status === 200) {
                    const cryptoData = response.data.map( e => ({
                        key: e.cid,
                        nr: e.cid,
                        name: e.name,
                        quantity: e.volume
                    }))
                    console.log(cryptoData)
                    setCryptoData(cryptoData);
                }
            }).catch(function (error) {
                if (error.response) {
                    console.log(cryptoData)
                    setCryptoData(null);
                }
            })
    },[]);

    if (cashData === null) {
        return null;
    }

    return (
        <>
        <Container>
            <Greeting>Portfelis</Greeting>
            <Row>
            <Column sm={24} lg={12} span={12}>
                    <Text>Šiuo metu sąskaitoje yra disponuojamų lėšų suma: {millify(cashData?.data?.amount)} USD</Text>
            </Column>
            <Column sm={24} lg={12} span={12}>
            <Text>Generuoti sąskaitos ataskaitą CSV formatu</Text>
            <Button type="button" onClick={generateCSV}>Generuoti</Button>

            </Column>

            </Row>

            
            <Title>Viso turima virtualių valiutų</Title>
            <Table dataSource={cryptoData} columns={columnsCrypto} pagination={false} />
            <Title>Viso turima vertybinių popierių</Title>
            <Table dataSource={stockData} columns={columnsStock} pagination={false} />

        </Container>
        </>
    )
}