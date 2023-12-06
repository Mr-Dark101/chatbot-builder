import React from 'react'

import * as Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official'


const CountStatus = ({listData}) => {
    
const options = {
    chart: {
        type: 'area'
    },
    
    title: {
        text: 'Complaints Count by Status'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        allowDecimals: false,
        accessibility: {
            rangeDescription: ''
        }
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
        area: {
            pointStart: 0,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: listData.ticketStatus
}

	return (
			<>
               <HighchartsReact
                highcharts={Highcharts}
                options={options}
                />
            </>

		)

}

export default CountStatus;