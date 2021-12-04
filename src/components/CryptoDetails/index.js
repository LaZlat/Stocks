import React, {useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom'
import millify from 'millify';
import {Row} from 'antd';
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '../../services/cryptoAPI';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from '../Charts/LineChart';
import Loader from '../Loader';
import Axios from 'axios';
import { MoreText, Link, DivNormal, FormContent, FormButton, FormH1, FormInput, FormLabel, Form, Container, Greeting, Title, Column, Text, Slct, Div, Divide} from './CryptoDetailsElements';

export const CryptoDetails = () => {
    const { id } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const {data, isFetching} = useGetCryptoDetailsQuery(id);
    const {data: coinHistory} = useGetCryptoHistoryQuery({id, timePeriod});
    const cryptoDetails = data?.data?.coin;
    const [buyVolume, setBuyVolume] = useState('0');
    const [sellVolume, setSellVolume] = useState('0');
    const [sellResponse, setSellResponse] = useState("");
    const [buyResponse, setBuyResponse] = useState("");
    const [autoBuyVolume, setAutoBuyVolume] = useState('0');
    const [autoSellVolume, setAutoSellVolume] = useState('0');
    const [autoBuyPrice, setAutoBuyPrice] = useState('0');
    const [autoSellPrice, setAutoSellPrice] = useState('0');
    const [autoSellResponse, setAutoSellResponse] = useState("");
    const [autoBuyResponse, setAutoBuyResponse] = useState("");



    if (isFetching) return <Loader />;

    const time = ['3h', '24h', '7d', '30d', '1m', '3m', '3y', '5y'];

    const stats = [
        { title: 'Kaina USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Pozicija', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: 'Paskutinių 24 valandų parduotas kiekis', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Rinkos vertė', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'Aukščiausia buvusi kaina', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Keliose rinkose parduodamas', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Keliose birŽose parduodamas', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Patvirtintas tiekimas', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Esamas patiekta', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Cirkuliuojatis kiekis', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    
    const buyCrypto = () => {
        Axios.post('http://localhost:3001/buy/buycrypto', {
            uid: localStorage.getItem("email"),
            cid: id,
            price: cryptoDetails.price,
            volume: buyVolume,
            name: cryptoDetails.name
        }).then((response) => {
            setBuyResponse(response.data.msg)
        })
    }

    const sellCrypto = () => {
        Axios.post('http://localhost:3001/sell/sellcrypto', {
            uid: localStorage.getItem("email"),
            cid: id,
            price: cryptoDetails.price,
            volume: sellVolume,
        }).then((response) => {
            setSellResponse(response.data.msg)
        })
    }

    const autoSell = () => {
        Axios.post('http://localhost:3001/auto/sellcrypto', {
            uid: localStorage.getItem("email"),
            cid: id,
            price: autoSellPrice,
            volume: autoSellVolume,
            name: cryptoDetails.name,
            sell: 1
        }).then((response) => {
            setAutoSellResponse(response.data.msg)
        })
    }

    const autoBuy = () => {
        Axios.post('http://localhost:3001/auto/buycrypto', {
            uid: localStorage.getItem("email"),
            cid: id,
            price: autoBuyPrice,
            volume: autoBuyVolume,
            name: cryptoDetails.name,
            sell: 0
        }).then((response) => {
            setAutoBuyResponse(response.data.msg)
        })
    }

    return (
            <Container>
                <Greeting>
                        {cryptoDetails.name} ({cryptoDetails.slug})
                </Greeting>
                <Div>
                            <Title>
                                {cryptoDetails.name} vertė rinkoje
                            </Title>
                        <Row>
                        {stats.map(({icon, title, value}) => (
                            
                            <Column xs={24} sm={12} lg={6} >
                                    <Text>{icon}</Text>
                                    <Text>{title}*</Text>
                                <Text>{value}</Text>
                            </Column>
                            
                        ))}
                        </Row>
                </Div>
                <Divide />

                <Row>
                    <Column xs={24} sm={12} >
                        <FormContent>
                          <Form>
                              <FormH1>Pirkti virtualia valiutą</FormH1>
                              <FormLabel hmtlFor='for'>Perkamas kiekis</FormLabel>
                              <FormLabel hmtlFor='for'>{buyResponse}</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setBuyVolume(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={buyCrypto}>Pirkti</FormButton>
                          </Form>
                        </FormContent>
                    </Column>
                    <Column xs={24} sm={12} >
                        <FormContent>
                          <Form>
                              <FormH1>Parduoti virtualią valiutą</FormH1>
                              <FormLabel hmtlFor='for'>Parduodamas kiekis</FormLabel>
                              <FormLabel hmtlFor='for'>{sellResponse}</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setSellVolume(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={sellCrypto}>Parduoti</FormButton>
                          </Form>
                        </FormContent>
                    </Column>
                    <Column xs={24} sm={12} >
                        <FormContent>
                          <Form>
                              <FormH1>Kurti automatomatinį pardavimą</FormH1>
                              <FormLabel hmtlFor='for'>{autoSellResponse}</FormLabel>
                              <FormLabel hmtlFor='for'>Parduodamas kiekis</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setAutoSellVolume(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Bus parduodata pasiekus kainą</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setAutoSellPrice(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={autoSell}>Kurti pardavimą</FormButton>
                          </Form>
                        </FormContent>
                    </Column>
                    <Column xs={24} sm={12} >
                        <FormContent>
                          <Form>
                              <FormH1>Kurti automatomatinį pirkimą</FormH1>
                              <FormLabel hmtlFor='for'>{autoBuyResponse}</FormLabel>
                              <FormLabel hmtlFor='for'>Perkamas kiekis</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setAutoBuyVolume(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Bus nupirkta pasiekus kainą</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setAutoBuyPrice(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={autoBuy}>Kurti pirkimą</FormButton>
                          </Form>
                        </FormContent>
                    </Column>
                </Row>

                <Divide />
                <DivNormal>

                <Column>
                    <Text>
                        {cryptoDetails.name} kainų pokyčio grafikas pagal norimą laiko rėžį:
                    </Text>
                </Column>
                <Slct defaultValue="7d" placeholder="Select time period" onChange={(value) => setTimePeriod(value)}>
                    {time.map((date) => <Slct key={date}>{date}</Slct>)}
                </Slct>
                <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>

                </DivNormal>

                <Divide />


                <Div>
                            <Title>
                                 {cryptoDetails.name} apžvalga ir statistika
                            </Title>
                            <Row>
                        {genericStats.map(({icon, title, value}) => (
                            <Column xs={24} sm={12} lg={6}>
                                    <Text>{icon}</Text>
                                    <Text>{title}*</Text>
                                <Text>{value}</Text>
                            </Column>
                        ))}
                        </Row>
                </Div>
                <Divide />
                <Div>
                <Title>
                                Kas yra {cryptoDetails.name}? (anglų k.)
                            </Title>
                            </Div>
                            <DivNormal>
                            <MoreText>
                                {HTMLReactParser(cryptoDetails.description)}
                            </MoreText>
                            </DivNormal>
                            

                    <Div>

                    <Div>
                            <Title>
                                {cryptoDetails.name} papildomos nuorodos
                            </Title>
                            {cryptoDetails.links.map((link) => (
                                <Row key={link.name}>
                                    <Text >
                                        Svetainė -  
                                    </Text>
                                    <Link href={link.url} targer="_blank" rel="noreferrer"> 
                                        {link.name}
                                    </Link>
                                </Row>
                            ))}
                    </Div>
                </Div>
                </Container>
    )
}
