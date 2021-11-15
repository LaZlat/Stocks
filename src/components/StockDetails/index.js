import React, {useState} from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom'
import millify from 'millify';
import {Col, Row, Typography, Select} from 'antd';
import {useGetHistoryQuery, useGetStockQuery} from '../../services/financeAPI';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChartStocks from '../LineChartStocks';
import Loader from '../Loader';
import { FormContent, FormButton, FormH1, FormInput, FormLabel, Form} from './StockDetailsElements';
import Axios from 'axios';

export const StockDetails = () => {
    const { symbol } = useParams();
    const [interval, setInterval] = useState('1d');
    const {data, isFetching} = useGetStockQuery(symbol);
    const {data: stockHistory} = useGetHistoryQuery({symbol, interval});
    const [volume, setVolume] = useState('0');
    const stockDetails = data;

    
    if (isFetching) return <Loader />;

    const time = ['5m', '15m', '30m', '1h', '1d', '1wk', '1mo', '3mo'];

    const stats = [
        { title: 'Pilnas pavadinimas', value: stockDetails[0].longName, icon: <FundOutlined /> },
        { title: 'Simbolis', value: stockDetails[0].symbol, icon: <FundOutlined /> },
        { title: 'Price to USD', value: stockDetails[0].ask, icon: <DollarCircleOutlined /> },
        { title: 'Per dieną parduodama', value: stockDetails[0].averageDailyVolume10Day, icon: <ThunderboltOutlined /> },
        { title: 'Birža kurioje prekiaujama', value: stockDetails[0].exchange, icon: <DollarCircleOutlined /> },
        { title: 'Biržos laiko zona', value: stockDetails[0].exchangeTimezoneName, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
       { title: '5 dienų kainos vidurkis', value: stockDetails[0].fiftyDayAverage, icon: <FundOutlined /> },
        { title: '5 dienų kainos vidurkio pokytis', value: stockDetails[0].fiftyDayAverageChange, icon: <FundOutlined /> },
        { title: '5 dienų kainos vidurkio pokyčio procentas', value: stockDetails[0].fiftyDayAverageChangePercent, icon: <FundOutlined /> },
        { title: '52 savaičių auksčiausia kaina', value: stockDetails[0].fiftyTwoWeekHigh, icon: <FundOutlined /> },
        { title: '52 savaičių auksčiausios kainos pokytis', value: stockDetails[0].fiftyTwoWeekHighChange, icon: <FundOutlined /> },
        { title: '52 savaičių auksčiausios kainos pokytis procentais', value: stockDetails[0].fiftyTwoWeekHighChangePercent, icon: <FundOutlined /> },
        { title: '52 savaičių žemiausia kaina', value: stockDetails[0].fiftyTwoWeekLow, icon: <FundOutlined /> },
        { title: '52 savaičių žemiausios kainos pokytis', value: stockDetails[0].fiftyTwoWeekLowChange, icon: <FundOutlined /> },
        { title: '52 savaičių auksčiausios kainos pokytis procentais', value: stockDetails[0].fiftyTwoWeekLowChangePercent, icon: <FundOutlined /> },
        { title: 'Market cap', value: stockDetails[0].marketCap, icon: <FundOutlined /> },
        { title: 'Rinkos būsena', value: stockDetails[0].marketState, icon: <FundOutlined /> },
        { title: 'Vertybinių popierių tipas', value: stockDetails[0].quoteType, icon: <FundOutlined /> },
    ];

    const buyStock = () => {
        Axios.post('http://localhost:3001/buy/buycrypto', {
            uid: 1,
            symbol: symbol,
            price: stockDetails[0].ask,
            currency: 'USD',
            volume: volume
        }).then((response) => {
            console.log(response)
        })
    }
   

    return (
        
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Typography level={2} className="coin-name">
                        {stockDetails[0].symbol}
                    </Typography>
                    <p>
                        {stockDetails[0].name} live price in US dollars.
                        View everything here and there
                    </p>
                </Col>
                <Select defaultValue="1d" className="select-timeperiod" placeholder="Select interval1" onChange={(value) => setInterval(value)}>
                    {time.map((date) => <Select key={date}>{date}</Select>)}
                </Select>
                {<LineChartStocks stockHistory={stockHistory} currentPrice={stockDetails[0].ask} stockSymbol={stockDetails[0].symbol}/>}
                
                <FormContent>
                          <Form>
                              <FormH1>Pirkti</FormH1>
                              <FormLabel hmtlFor='for'>Kiekis</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setVolume(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={buyStock}>Pirkti</FormButton>
                          </Form>
                </FormContent>
                
                <Col className="stats-container">
                    <Col className="coin-value-stats">
                        <Col className="coin-value=stats-heading">
                            <Typography level={3} className="coin-details-heading">
                                {stockDetails.longName} Value Statistics
                            </Typography>
                            <p>
                                An Overview of stats and statistics of {stockDetails.longName}
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
                                {stockDetails.longName} Value Statistics
                            </Typography>
                            <p>
                                An Overview of stats and statistics of {stockDetails.longName}
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
            </Col>
    )
}
