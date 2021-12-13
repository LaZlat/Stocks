import React, {useState} from 'react';
import { useParams } from 'react-router-dom'
import millify from 'millify';
import {Row} from 'antd';
import {useGetHistoryQuery, useGetStockQuery} from '../../services/financeAPI';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, ThunderboltOutlined } from '@ant-design/icons';
import LineChartStocks from '../Charts/LineChartStocks';
import Loader from '../Loader';
import {CollaTextDiv, CollaDiv, TextColl, Collas, DivNormal, FormContent, FormButton, FormH1, FormInput, FormLabel, Form, Container, Greeting, Title, Column, Text, Slct, Div, Divide} from './StockDetailsElements';
import Axios from 'axios';


export const StockDetails = () => {
    const { symbol } = useParams();
    const [interval, setInterval] = useState('1d');
    const {data, isFetching} = useGetStockQuery(symbol);
    const {data: stockHistory} = useGetHistoryQuery({symbol, interval});
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
    const stockDetails = data;

    
    if (isFetching) return <Loader />;

    const time = ['5m', '15m', '30m', '1h', '1d', '1wk', '1mo', '3mo'];

    const stats = [
        { title: 'Pilnas pavadinimas', value: stockDetails[0].longName, icon: <FundOutlined /> },
        { title: 'Simbolis', value: stockDetails[0].symbol, icon: <StopOutlined /> },
        { title: 'Kaina USD', value: stockDetails[0].ask, icon: <DollarCircleOutlined /> },
        { title: 'Per dieną parduodama', value: millify(stockDetails[0].averageDailyVolume10Day), icon: <ThunderboltOutlined /> },
        { title: 'Birža kurioje prekiaujama', value: stockDetails[0].exchange, icon: <DollarCircleOutlined /> },
        { title: 'Biržos laiko zona', value: stockDetails[0].exchangeTimezoneName, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
       { title: '5 dienų kainos vidurkis', value: stockDetails[0].fiftyDayAverage, icon: <FundOutlined /> },
        { title: '5 dienų kainos vidurkio pokytis', value: stockDetails[0].fiftyDayAverageChange, icon: <FundOutlined /> },
        { title: '5 dienų kainos vidurkio pokyčio procentas', value: stockDetails[0].fiftyDayAverageChangePercent, icon: <FundOutlined /> },
        { title: '52 savaičių aukščiausia  kaina', value: stockDetails[0].fiftyTwoWeekHigh, icon: <FundOutlined /> },
        { title: '52 savaičių aukščiausios kainos pokytis', value: stockDetails[0].fiftyTwoWeekHighChange, icon: <FundOutlined /> },
        { title: '52 savaičių aukščiausios kainos pokytis procentais', value: stockDetails[0].fiftyTwoWeekHighChangePercent, icon: <FundOutlined /> },
        { title: '52 savaičių žemiausia kaina', value: stockDetails[0].fiftyTwoWeekLow, icon: <FundOutlined /> },
        { title: '52 savaičių žemiausios kainos pokytis', value: stockDetails[0].fiftyTwoWeekLowChange, icon: <FundOutlined /> },
        { title: '52 savaičių žemiausios kainos pokytis procentais', value: stockDetails[0].fiftyTwoWeekLowChangePercent, icon: <FundOutlined /> },
        { title: 'Vertė rinkoje', value: millify(stockDetails[0].marketCap), icon: <CheckOutlined /> },
        { title: 'Rinkos būsena', value: stockDetails[0].marketState, icon: <ExclamationCircleOutlined /> },
        { title: 'Vertybinių popierių tipas', value: stockDetails[0].quoteType, icon: <MoneyCollectOutlined /> },
    ];

    const buyStock = () => {
        Axios.post('http://localhost:3001/buy/buystock', {
            symbol: symbol,
            price: stockDetails[0].ask,
            currency: 'USD',
            volume: buyVolume,
            token: localStorage.getItem("token")
        }).then((response) => {
            setBuyResponse(response.data.msg)
        })
    }

    const sellStock = () => {
        Axios.post('http://localhost:3001/sell/sellstock', {
            symbol: symbol,
            price: stockDetails[0].ask,
            volume: sellVolume,
            token: localStorage.getItem("token")
        }).then((response) => {
            setSellResponse(response.data.msg)
        })
    }
    const autoSell = () => {
        Axios.post('http://localhost:3001/auto/sellstock', {
            uid: localStorage.getItem("email"),
            symbol: symbol,
            price: autoSellPrice,
            volume: autoSellVolume,
            sell: 1,
            token: localStorage.getItem("token")
        }).then((response) => {
            setAutoSellResponse(response.data.msg)
        })
    }

    const autoBuy = () => {
        Axios.post('http://localhost:3001/auto/buystock', {
            uid: localStorage.getItem("email"),
            symbol: symbol,
            price: autoBuyPrice,
            volume: autoBuyVolume,
            sell: 0,
            token: localStorage.getItem("token")
        }).then((response) => {
            setAutoBuyResponse(response.data.msg)
        })
    }
   

    return (
        <Container>
                    <Greeting>
                        {stockDetails[0].symbol}
                    </Greeting>
                    <CollaDiv>
                    <Collas trigger="-> PRADĖK SPAUSDAMAS ČIA <-">
            <CollaTextDiv>
            <TextColl>Kas toliau?</TextColl>
            <TextColl>1. Susipažink su vertybinių popierių verte rinkoje.</TextColl>
            <TextColl>2. Peržvėlk grafiką ir vertybinių popierių  kainų pokytį.</TextColl>
            <TextColl>3. Esant poreikiui paskaityk detalesnę informacija apie vertybinius popierius.</TextColl>
            <TextColl>4. Nusprendei pirkti? Įvesk į pirkimo formą norimą kiekį, popieriai bus nupirkti ir atsidurs tavo portfelyje kuris pasiekiamas iš navigacijos juostos.</TextColl>
            <TextColl>5. Nusprendei parduoti? Įvesk į pardavimo formą norimą kiekį, popieriai bus parduoti, o pinigai tavo portfelyje kuris pasiekiamas iš navigacijos juostos.</TextColl>
            <TextColl>6. Kaina netenkina, bet manai, jog tuoj turėtu pasikeisti ir nenori pražiopsoti? Sukurk automatizuotą pardavimo ar pirkimo sandorį, nurodydamas perkamą/parduodamą kiekį ir kainą. Vertybiniams popieriams pasiekus tokią kainą ji bus nupirkta/parduota ir atsidurs tavo portfelyje.</TextColl>

            </CollaTextDiv>
            </Collas>
            </CollaDiv>
                    <Div>
                        <Title>{stockDetails[0].longName} vertė rinkoje</Title>
                            <Row>
                                {stats.map(({icon, title, value}) => (
                                <Column xs={24} sm={12} lg={6}>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                <Text>{value}</Text>
                            </Column>
                        ))}
                        </Row>
                    </Div>
                    <Divide />
                    
                    <Row>
                    <Column xs={24} sm={12} md={12} lg={6}>
                        <FormContent>
                          <Form>
                              <FormH1>Pirkti vertybinius popierius</FormH1>
                              <FormLabel hmtlFor='for'>Perkamas kiekis</FormLabel>
                              <FormLabel hmtlFor='for'>{buyResponse}</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setBuyVolume(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={buyStock}>Pirkti</FormButton>
                          </Form>
                        </FormContent>
                    </Column>
                    <Column xs={24} sm={12} md={12} lg={6}>
                        <FormContent>
                          <Form>
                              <FormH1>Parduoti vertybinius popierius</FormH1>
                              <FormLabel hmtlFor='for'>Parduodamas kiekis</FormLabel>
                              <FormLabel hmtlFor='for'>{sellResponse}</FormLabel>
                              <FormInput type='number' min='1' required onChange={(e) => {
                                  setSellVolume(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={sellStock}>Parduoti</FormButton>
                          </Form>
                        </FormContent>
                    </Column>
                    <Column xs={24} sm={12} md={12} lg={6}>
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
                    <Column xs={24} sm={12} md={12} lg={6}>
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
                        {stockDetails[0].symbol} kainų pokyčio grafikas laiko intervalu:
                    </Text>
                </Column>
                <Slct defaultValue="1d" className="select-timeperiod" placeholder="Select interval1" onChange={(value) => setInterval(value)}>
                    {time.map((date) => <Slct key={date}>{date}</Slct>)}
                </Slct>
                {<LineChartStocks stockHistory={stockHistory} currentPrice={stockDetails[0].ask} stockSymbol={stockDetails[0].symbol}/>}
                </DivNormal>

                <Divide />
                
                <Div>
                    <Title >{stockDetails.longName} apžvalga ir statistika</Title>
                <Row>
                    {genericStats.map(({icon, title, value}) => (
                    <Column xs={24} sm={12} lg={6}>
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                            <Text >{value}</Text>
                    </Column>))}
                </Row>
                </Div>
            </Container>

    )
}
