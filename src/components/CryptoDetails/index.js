import React, {useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom'
import millify from 'millify';
import {Col, Row, Typography, Select} from 'antd';
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '../../services/cryptoAPI';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChart from '../LineChart';
import Loader from '../Loader';
import Axios from 'axios';
import { FormContent, FormButton, FormH1, FormInput, FormLabel, Form} from './CryptoDetailsElements';

export const CryptoDetails = () => {
    const { id } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d');
    const {data, isFetching} = useGetCryptoDetailsQuery(id);
    const {data: coinHistory} = useGetCryptoHistoryQuery({id, timePeriod});
    const cryptoDetails = data?.data?.coin;
    const [volume, setVolume] = useState('0');


    if (isFetching) return <Loader />;

    const time = ['3h', '24h', '7d', '30d', '1m', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    
    const buyCrypto = () => {
        Axios.post('http://localhost:3001/buy/buycrypto', {
            uid: 1,
            cid: id,
            price: cryptoDetails.price,
            currency: 'USD',
            volume: volume,
            name: cryptoDetails.name
        }).then((response) => {
            console.log(response)
        })
    }

    return (
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Typography level={2} className="coin-name">
                        {cryptoDetails.name} ({cryptoDetails.slug}) Price
                    </Typography>
                    <p>
                        {cryptoDetails.name} live price in US dollars.
                        View everything here and there
                    </p>
                </Col>
                <Select defaultValue="7d" className="select-timeperiod" placeholder="Select time period" onChange={(value) => setTimePeriod(value)}>
                    {time.map((date) => <Select key={date}>{date}</Select>)}
                </Select>
                <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>

                <FormContent>
                          <Form>
                              <FormH1>Pirkti</FormH1>
                              <FormLabel hmtlFor='for'>Kiekis</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setVolume(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={buyCrypto}>Pirkti</FormButton>
                          </Form>
                </FormContent>

                <Col className="stats-container">
                    <Col className="coin-value-stats">
                        <Col className="coin-value=stats-heading">
                            <Typography level={3} className="coin-details-heading">
                                {cryptoDetails.name} Value Statistics
                            </Typography>
                            <p>
                                An Overview of stats and statistics of {cryptoDetails.name}
                            </p>
                        </Col>
                        {stats.map(({icon, title, value}) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Typography>{icon}</Typography>
                                    <Typography>{title}</Typography>
                                </Col>
                                <Typography className="stats">{value}</Typography>
                            </Col>
                        ))}
                    </Col>
                    <Col className="other-value-stats">
                        <Col className="coin-value=stats-heading">
                            <Typography level={3} className="coin-details-heading">
                                {cryptoDetails.name} Value Statistics
                            </Typography>
                            <p>
                                An Overview of stats and statistics of {cryptoDetails.name}
                            </p>
                        </Col>
                        {genericStats.map(({icon, title, value}) => (
                            <Col className="coin-stats">
                                <Col className="coin-stats-name">
                                    <Typography>{icon}</Typography>
                                    <Typography>{title}</Typography>
                                </Col>
                                <Typography className="stats">{value}</Typography>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-sec-link">
                    <Row className="coin-desc">
                            <Typography level={3} className="coin-details-heading">
                                What is {cryptoDetails.name}?
                                {HTMLReactParser(cryptoDetails.description)}
                            </Typography>
                    </Row>
                    <Col className="coin-links">
                            <Typography level={3} className="coin-details-heading">
                                {cryptoDetails.name} links
                            </Typography>
                            {cryptoDetails.links.map((link) => (
                                <Row className="coin-link" key={link.name}>
                                    <Typography level={5} className="link-name">
                                        {link.type}
                                    </Typography>
                                    <a href={link.url} targer="_blank" rel="noreferrer">
                                        {link.name}
                                    </a>
                                </Row>
                            ))}
                    </Col>
                </Col>
            </Col>
    )
}
