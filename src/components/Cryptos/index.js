import React, {useState, useEffect} from 'react';
import millify from 'millify';
import { Row, Col} from 'antd';
import { CollaTextDiv, CryptoContainer, CryptoCard, CryptoLink, Image, SearchCrypto, CryptoInput, Container, Title, Greeting, CollaDiv, Collas, Text} from './CryptosElements';
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
        <Container>
        {!simplified && (
        <>
        <Greeting>Virtualios valiutos</Greeting>
        <CollaDiv>
            <Collas trigger="Paspausk mane dėl papildomos informacijos">
            <CollaTextDiv>
            <Text>Šiame virtualių valiutų puslapyje galite matyti visas sistemoje esančias virtualias valiutas. Paspaudus ant bent kurio iš jų būsite perkeleras į detalų jų aprašą kur galėsite peržiūrėti išsamią infromacija bei pirkti, parduoti ar kurti atumatizuotus pirkimo ar pardavimo sandorius.</Text>
            <Text>Į laukelį 'Rasti virtualias valiutas' įvedus pavadinimą, bus parodoma norima valiuta.</Text>
            </CollaTextDiv>

            </Collas>
            </CollaDiv>
        <SearchCrypto>
        <Title>Rasti virtualias valiutas</Title>
            <CryptoInput placeholder="Virtualios valiutos" onChange={(e) => setSearchTerm(e.target.value)}/>
        </SearchCrypto>
        
        </>
        )}
        <CryptoContainer>
            <Row gutter={[32, 32]}>
                {cryptos?.slice(0, amountToSlice).map((currency) => (

                        <Col xs={24} sm={12} lg={6} key={currency.id}>
                            <CryptoLink to={`/crypto/${currency.id}`}>
                                <CryptoCard title={`${currency.rank}. ${currency.name}`} extra={<Image src={currency.iconUrl} />} hoverable>
                                    <p>Kaina: {millify(currency.price)} USD</p>
                                    <p>Rinkos vertė: {millify(currency.marketCap)} USD</p>
                                    <p>Kainos pokytis šiandien: {millify(currency.change)}%</p>
                                </CryptoCard>
                            </CryptoLink>
                        </Col>               
                ))}
            </Row>
        </CryptoContainer>
        </Container>
        </>
    )
}
