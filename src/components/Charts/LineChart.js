import React from 'react';
import {Line} from 'react-chartjs-2';
import {Col, Row, Typography} from 'antd';
import { Container} from './ChartElements';


const LineChart = ({coinHistory, currentPrice, coinName}) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for(let i = 0; i < coinHistory?.data?.history?.length; i+=1) {
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [{
            label: 'Kaina USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd'
        }]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <>
        <Container>
            <Row>
            <Col>
                <Typography level={2}>
                    {coinName} kainos pokytis: {coinHistory?.data?.change}%
                </Typography>
                </Col>
                </Row>
                <Row>
                <Col>
                    
                    <Typography level={5}>
                        Dabartinė {coinName} kaina: $ {currentPrice}
                    </Typography>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </Container>
        </>
    )
}

export default LineChart
