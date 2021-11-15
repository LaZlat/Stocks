import React from 'react';
import {Line} from 'react-chartjs-2';
import {Col, Row, Typography} from 'antd';

const LineChartStocks = ({stockHistory, currentPrice, stockSymbol}) => {
    const stockPrice = [];
    const stockTimestamp = [];

    console.log(stockHistory)
    
    if(stockHistory?.items != null) {

    const keys = Object.values(stockHistory?.items)

    keys.forEach(val => {
        stockPrice.push(val?.close);
        
        var timestamp = Date.parse(val?.date);
        if (isNaN(timestamp) == false) {
            stockTimestamp.push(new Date(val?.date).toLocaleDateString());
          }
    })

}
    
    const data = {
        labels: stockTimestamp,
        datasets: [{
            label: 'Price in USD',
            data: stockPrice,
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
            <Row className="chart-header">
                <Typography level={2} className="chart-title">
                    {stockSymbol} Price chart
                </Typography>
                <Col className="price-container">
                    <Typography className="price-current" level={5}>
                        Current {stockSymbol} Price: $ {currentPrice}
                    </Typography>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChartStocks
