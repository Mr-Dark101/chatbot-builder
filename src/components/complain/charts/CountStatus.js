import React from 'react'

import * as Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official'


const CountStatus = () => {
const options = {
    chart: {
        type: 'area'
    },
    
    title: {
        text: 'US and USSR nuclear stockpiles'
    },
    subtitle: {
        text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
            'target="_blank">FAS</a>'
    },
    xAxis: {
        allowDecimals: false,
        accessibility: {
            rangeDescription: 'Range: 1940 to 2017.'
        }
    },
    yAxis: {
        title: {
            text: 'Nuclear weapon states'
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
    series: [{
        name: 'USA',
        data: [310, 210, 200, 330, 390, 200, 180, 95, 400, 80,]
    }, {
        name: 'USSR/Russia',
        data: [310, 210, 200, 330, 390, 200, 180, 95, 400, 80,]
    },{
        name: 'ind/india',
        data: [310, 210, 200, 330, 390, 200, 180, 95, 400, 80,]
    },{
        name: 'pak/pakistan',
        data: [310, 210, 200, 330, 390, 200, 180, 95, 400, 80,]
    }
    ]
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