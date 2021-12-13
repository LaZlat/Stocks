import React, {useEffect, useState} from 'react';
import millify from 'millify';
import {Row, Table} from 'antd';
import {CollaTextDiv, Container, Title, Text, Greeting, PortLink, Button, Column, CollaDiv, Image, Collas} from '../Portfolio/PortfolioElements';
import Axios from "axios";
import svg1 from '../../images/svg-1.svg';


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
          title: 'Vardas',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Kiekis',
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
          title: 'Simbolis',
          dataIndex: 'symbol',
          key: 'symbol',
        },
        {
            title: 'Kiekis',
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

        let link = document.createElement('a')

        Axios.get('http://localhost:3001/port/generatecsv', { params: {token: token }})
        .then((response) => {
            link.id = 'download-csv'
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.data));
            link.setAttribute('download', 'portfolio_' + email + '.csv');
            document.body.appendChild(link)
            document.querySelector('#download-csv').click()
            link = null;
        })
        window.location.reload(false);
    }

    
    useEffect(() => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        
        Axios.get("http://localhost:3001/port/availablecash", { params: { token: token }}).then((response) => {
            if( response.status === 200) {
                setCashData(response);
            }
        }).catch(function (error) {
            if (error.response) {
                setCashData(null);
            }
        })

        Axios.get("http://localhost:3001/port/availablestock", { params: { token: token }}).then((response) => {
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

        Axios.get("http://localhost:3001/port/availablecrypto", { params: { token: token }}).then((response) => {
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
            <CollaDiv>
            <Collas trigger="-> PRADĖK SPAUSDAMAS ČIA <-">
            <CollaTextDiv>
            <Text>Kas toliau?</Text>
            <Text>1. Čia rodomi visi tavo turtai.</Text>
            <Text>2. Pradinė pinigų suma, tau buvo suteikta vos susikūrus savo paskyrą!</Text>
            <Text>3. Lentelėse matai visas savo tūrimas virtualias valiutas ir jų kiekį. Nusprendei kuria jų parduoti ar nusipirkti daugiau? Tiesiog paspausk mytuką 'Pirkti/parduoti' šalia keikvienos iš jų,</Text>
            <Text>4. Spasudamas mygtuką 'Generuoti' susigeneruosi ataskaitą apie savo tūtimus turtus, kuria galėsi dalintis.</Text>
            </CollaTextDiv>
            </Collas>
            </CollaDiv>
            <Image src={svg1} alt="graph data"></Image>
            <Row>
            <Column sm={24} lg={12} span={12}>
                    <Title>Šiuo metu sąskaitoje yra disponuojamų lėšų suma: {millify(cashData?.data?.amount)} USD</Title>
            </Column>
            <Column sm={24} lg={12} span={12}>
            <Title>Generuoti sąskaitos ataskaitą CSV formatu</Title>
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