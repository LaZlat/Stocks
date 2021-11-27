import React from 'react'
import {Select, Typography, Row, Col,  Avatar, Card} from 'antd'
import moment from 'moment';
import { useGetNewsQuery } from '../../services/investNewsAPI';
import Loader from '../Loader';
import { useGetNewsVideoQuery } from '../../services/investNewsVideoAPI';

export const News = ({simplified}) => {
    const {data: investNews, isFetching } = useGetNewsQuery({newsCategory: 'stocks', count: simplified ? 3 : 12});
    const {data: investVideoNews } = useGetNewsVideoQuery({newsCategory: 'investment', count: simplified ? 3 : 12});
    const demoUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

    if(isFetching) return <Loader />;

    return (
        <>
        <Row gutter={[24, 24]}>
            {investNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key ={i}>
                    <Card hoverable>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div>
                                <Typography level={4}>
                                    {news.name}
                                </Typography>
                                <img src={news.image?.thumbnail?.contentUrl || demoUrl} alt="news"></img>
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}
                            </p>
                            <div>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoUrl} alt="provider" />
                                    <Typography>{news.provider[0]?.name}</Typography>
                                </div>
                                <Typography>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>

         <Row gutter={[24, 24]}>
            {investVideoNews?.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key ={i}>
                    <Card hoverable>
                        <a href={news.contentUrl} target="_blank" rel="noreferrer">
                            <div>
                                <Typography level={4}>
                                    {news.name}
                                </Typography>
                                <img src={news.thumbnailUrl || demoUrl} alt="video"></img>
                            </div>
                            <div>
                                <div>
                                    <Typography>{news.publisher[0]?.name}</Typography>
                                </div>
                                <Typography>{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}

        </Row>
        </>
    )
};