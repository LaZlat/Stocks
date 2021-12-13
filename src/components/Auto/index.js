import React, {useEffect, useState} from 'react';
import {Table, Row} from 'antd';
import {Container,CollaTextDiv, Title, Text, Greeting, Button, Column, AutoBtn, CollaDiv, Image, Collas} from './AutoElements';
import Axios from "axios";
import svg5 from '../../images/svg-5.svg';

export const Auto = () => {

    const [cryptoData, setCryptoData] = useState(null)
    const [stockData, setStockData] = useState(null)


    const columnsCrypto = [
        {
            title: 'Sandorio Id',
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
            title: 'Kaina',
            dataIndex: 'kaina',
            key: 'kaina',
        },
        {
            title: 'Pirkimas/Pardavimas',
            dataIndex: 'pirkimasparvadimas',
            key: 'pirkimasparvadimas',
        },
        {
            title: 'Būsena',
            dataIndex: 'busena',
            key: 'busena',
        },
        {
            title: 'Atšaukimas',
            dataIndex: 'trinti',
            key: 'trinti',
            render: (text, record) => (
                <AutoBtn
                  onClick={(e) => { 
                      e.preventDefault();
                      const data = cryptoData.filter(cryptoData => cryptoData.key !== record.key);
                      deleteAuto(record.nr);
                      setCryptoData(data);
                   }}
                >
                  Atšaukti
                </AutoBtn>
              ),
        }
    ];

    const columnsStock = [
        {
            title: 'Sandorio Id',
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
            title: 'Kaina',
            dataIndex: 'kaina',
            key: 'kaina',
        },
        {
            title: 'Pirkimas/Pardavimas',
            dataIndex: 'pirkimasparvadimas',
            key: 'pirkimasparvadimas',
        },
        {
            title: 'Būsena',
            dataIndex: 'busena',
            key: 'busena',
        },
        {
            title: 'Atšaukimas',
            dataIndex: 'trinti',
            key: 'trinti',
            render: (text, record) => (
                <AutoBtn
                  onClick={(e) => { 
                      e.preventDefault();
                      const data = cryptoData.filter(cryptoData => cryptoData.key !== record.key);
                      deleteAutoStock(record.nr);
                      setCryptoData(data);
                   }}
                >
                  Atšaukti
                </AutoBtn>
              ),
        }
    ];

    const generateCSV1 = () => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        Axios.get('http://localhost:3001/auto/generatecsv', { params: { email: email, token: token }})
        .then((response) => {
            let link = document.createElement('a')
            link.id = 'download-csv'
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.data));
            link.setAttribute('download', 'autos_' + email + '.csv');
            document.body.appendChild(link)
            document.querySelector('#download-csv').click()
            link = null;
        })
        window.location.reload(false);
    }

    const deleteAuto = (id) => {
        Axios.post('http://localhost:3001/auto/deleteautocrypto', {
            deleteId: id
        }).then((response) => {
            console.log(response);
        })
    }

    const deleteAutoStock = (id) => {
        Axios.post('http://localhost:3001/auto/deleteautostock', {
            deleteId: id
        }).then((response) => {
            console.log(response);
        })
    }

    useEffect(() => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        Axios.get("http://localhost:3001/auto/availablecryptoautos", { params: { email: email, token: token }}).then((response) => {
                if( response.status === 200) {
                    const cryptoData = response.data.map( e => ({
                        key: e.id,
                        nr: e.id,
                        name: e.name,
                        kaina: e.price,
                        quantity: e.volume,
                        pirkimasparvadimas: e.sell,
                        busena: e.status
                    }))
                    setCryptoData(cryptoData);
                }
            }).catch(function (error) {
                if (error.response) {
                    console.log(cryptoData)
                    setCryptoData(null);
                }
            })

            Axios.get("http://localhost:3001/auto/availablestockautos", { params: { email: email, token: token }}).then((response) => {
                if( response.status === 200) {
                    console.log("aaaaa")
                    const stockData = response.data.map( e => ({
                        key: e.id,
                        nr: e.id,
                        name: e.symbol,
                        kaina: e.price,
                        quantity: e.volume,
                        pirkimasparvadimas: e.sell,
                        busena: e.status
                    }))
                    setStockData(stockData);
                }
            }).catch(function (error) {
                if (error.response) {
                    setStockData(null);
                }
            })
    },[]);

   
    return (
        <>
        <Container>
        <Greeting>Automatizuoti pirkimo ir pardavimo sandoriai</Greeting>
        <CollaDiv>
        <Collas trigger="-> PRADĖK SPAUSDAMAS ČIA <-">
            <CollaTextDiv>
            <Text>Kas toliau?</Text>
            <Text>1. Čia rodomi visi tavo sukurti automatizuoti sandoriai.</Text>
            <Text>2. Nesūk galvos, jie bus įgyvendinti automatiškai, vos pasieks norimą kainą!</Text>
            <Text>3. Jei vis dėo to nusprendei panaikinti. Paspausk mygtuką 'Atšaukti' ir jei sandoris dar aktyvus, visos rezervuotos lėšos tau sugrįš.</Text>
            <Text>4. Spasudamas mygtuką 'Generuoti' susigeneruosi ataskaitą apie savo tūtimus turtus, kuria galėsi dalintis.</Text>
            </CollaTextDiv>

            </Collas>
            </CollaDiv>
            <Image src={svg5} alt="graph data"></Image>
        <Row>
            <Column>
                <Title>Generuoti automatizuotų sandorių ataskaitą CSV formatu</Title>
                <Button type="button" onClick={generateCSV1}>Generuoti</Button>

            </Column>
        </ Row>

        <Title>Virtualių valiutų automatizuoti sandoriai</Title>
            <Table dataSource={cryptoData} columns={columnsCrypto} pagination={true} />
        <Title>Vertybinių popierių automatizuoti sandoriai</Title>
            <Table dataSource={stockData} columns={columnsStock} pagination={true} />

        </Container>
        </>
    )
}
