import React from 'react';

import * as Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official';

const HelpTopic = ({ listData }) => {
  let name = listData?.CategoryCount?.map((item) => {
    return item.cat;
  });

  //name.join(',')

  let value = listData?.CategoryCount?.map((item) => {
    return item.mcount;
  });

  //value.join(',')

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    xAxis: {
      categories: name,
      title: {
        text: null,
      },
      gridLineWidth: 0,
      lineWidth: 0,
      tickLength: 0,
    },
    yAxis: {
      min: 0,
      // tickInterval: 5,
      tickInterval: 1,
      title: {
        text: 'Count',
        // align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: ' ',
    },
    plotOptions: {
      bar: {
        borderRadius: '0%',
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
      column: {
        pointPadding: 0.1, // Space between bars within a group
        groupPadding: 0, // Space between groups of bars
        color: '#545a93',
      },
    },
    legend: {
      enabled: false,
      // layout: 'vertical',
      // align: 'right',
      // verticalAlign: 'top',
      // x: -40,
      // y: 80,
      // floating: true,
      // borderWidth: 1,
      // backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      // shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Help Topic',
        data: value,
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default HelpTopic;
