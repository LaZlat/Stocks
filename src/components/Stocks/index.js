import React, {useEffect, useState} from 'react';
import Loader from '../Loader';
import { Row, Col} from 'antd';
import { StockContainer, StockCard, StockLink, SearchStock, StockInput, Title, Greeting, Container} from './StocksElements';
import millify from 'millify';
import { useGetMostActivesQuery } from '../../services/financeAPI';

export const Stocks = ({simplified}) => {
    const amountToSlice = simplified ? 10 : 50;
    const {data: stocksList, isFetching} = useGetMostActivesQuery();
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        const filteredData = stocksList?.quotes.filter((stock) => (typeof stock.displayName !== "undefined") && stock.displayName.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        
        setStocks(filteredData)
    }, [stocksList, searchTerm])

    if(isFetching) return <Loader />;

    return (
        <>
        <Container>
        {!simplified && (
        <>
        <Greeting>Vertybiniai popieriai</Greeting>
        <SearchStock>
            <Title>Rasti vertybinius popierius</Title>
            <StockInput placeholder="Vertybiniai popieriai" onChange={(e) => setSearchTerm(e.target.value)}/>
        </SearchStock>
        </>
        )}
        <StockContainer>
            <Row gutter={[32, 32]}>
                {stocks?.slice(0, amountToSlice).map((stock) => (

                        <Col xs={24} sm={12} lg={6} key={stock.symbol}>
                            <StockLink to={`/stock/${stock.symbol}`}>
                                <StockCard title={`${stock.displayName}`} hoverable>
                                    <p>Kaina: {millify(stock.regularMarketPrice)} USD</p>
                                    <p>Rinkos vertė: {millify(stock.marketCap)} USD</p>
                                    <p>Kainos pokytis šiandien: {millify(stock.regularMarketChangePercent)}%</p>
                                </StockCard>
                            </StockLink>
                        </Col>               
                ))}
            </Row>
        </StockContainer>
        </Container>
        </>
    )
}