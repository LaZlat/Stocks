import React from 'react'
import {Row, Col, Divider} from 'antd'
import moment from 'moment';
import { useGetNewsQuery } from '../../services/investNewsAPI';
import Loader from '../Loader';
import { useGetNewsVideoQuery } from '../../services/investNewsVideoAPI';
import {Container, Greeting, NewsCard, Title, Text, Para, Ava, Image} from './NewsElements'

export const News = ({simplified}) => {
    const {data: investNews, isFetching } = useGetNewsQuery({newsCategory: 'stocks', count: simplified ? 3 : 12});
    const {data: investVideoNews } = useGetNewsVideoQuery({newsCategory: 'investment', count: simplified ? 3 : 12});
    const demoUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

    if(isFetching) return <Loader />;

    return (
        <>
        <Container>
        {!simplified && (
        <>
        <Greeting>Papildoma mokomoji medžiaga</Greeting>
        </>
        )}
        <Title>Tekstinė medžiaga</Title>
        <Row gutter={[24, 24]}>
            {investNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key ={i}>
                    <NewsCard hoverable>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div>
                                <Text>
                                    {news.name}
                                </Text>
                                <Divider />
                                <Image src={news.image?.thumbnail?.contentUrl || demoUrl} alt="news"></Image>
                            </div>
                            <Para>
                                {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}
                            </Para>
                            <Divider />
                            <div>
                                <div>
                                    <Ava src={news.provider[0]?.image?.thumbnail?.contentUrl || demoUrl} alt="provider" />
                                    <Para>{news.provider[0]?.name}</Para>
                                </div>
                                <Para>{moment(news.datePublished).startOf('ss').fromNow()}</Para>
                            </div>
                        </a>
                    </NewsCard>
                </Col>
            ))}
        </Row>
        <Title>Vaizdinė medžiaga</Title>

         <Row gutter={[24, 24]}>
            {investVideoNews?.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key ={i}>
                    <NewsCard hoverable>
                        <a href={news.contentUrl} target="_blank" rel="noreferrer">
                            <div>
                                <Text level={4}>
                                    {news.name}
                                </Text>
                                <Divider />
                                <Image src={news.thumbnailUrl || demoUrl} alt="video"></Image>
                            </div>
                            <Divider />

                            <div>
                                <div>
                                    <Text>{news.publisher[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </NewsCard>
                </Col>
            ))}

        </Row>
        </Container>
        </>
    )
};