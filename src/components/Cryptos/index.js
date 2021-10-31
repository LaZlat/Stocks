import React, {useState, useEffect} from 'react';
import millify from 'millify';
import { Row, Col} from 'antd';
import { CryptoContainer, CryptoCard, CryptoLink, Image, SearchCrypto, CryptoInput} from './CryptosElements';
import Loader from '../Loader';
import { useGetCryptosQuery } from '../../services/cryptoAPI';

export const Cryptos = ({simplified}) => {
    const amountToSlice = simplified ? 10 : 50;
    const {data: cryptosList, isFetching} = useGetCryptosQuery();
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    if(isFetching) return <Loader />;

    return (
        <>
        {!simplified && (
        <SearchCrypto>
            <CryptoInput placeholder="ieškoti" onChange={(e) => setSearchTerm(e.target.value)}/>
        </SearchCrypto>
        )}
        <CryptoContainer>
            <Row gutter={[32, 32]}>
                {cryptos?.slice(0, amountToSlice).map((currency) => (

                        <Col xs={24} sm={12} lg={6} key={currency.id}>
                            <CryptoLink to={`/crypto/${currency.id}`}>
                                <CryptoCard title={`${currency.rank}. ${currency.name}`} extra={<Image src={currency.iconUrl} />} hoverable>
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}%</p>
                                </CryptoCard>
                            </CryptoLink>
                        </Col>               
                ))}
            </Row>
        </CryptoContainer>
        </>
    )
}
