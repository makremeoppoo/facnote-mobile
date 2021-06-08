import React from 'react';
import {View} from 'react-native';
import {BarChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomGrid from '../CustomGrid/CostumGrid';
import Tooltip from '../TooltipChart/Tooltip';
import {Text} from 'react-native-svg';
import {primaryColor} from '../../Theme/AppStyles';
const CUT_OFF = 20;
const Labels = ({x, y, bandwidth, data}) =>
  data.map((value, index) => (
    <Text
      key={index}
      x={x(index) + bandwidth / 2}
      y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
      fontSize={14}
      fill={value >= CUT_OFF ? 'white' : 'black'}
      alignmentBaseline={'middle'}
      textAnchor={'middle'}>
      {value}
    </Text>
  ));
  const axesSvg = {fontSize: 10, fill: 'grey'};
  const verticalContentInset = {top: 10, bottom: 10};
  
export default BarChartCustom = ({lineChartValue}) => {
  return (
    <>
      <YAxis
        data={lineChartValue.map((item) => item.value)}
        style={{marginBottom: 0}}
        contentInset={verticalContentInset}
        svg={axesSvg}
        yAccessor={({item}) => item.value}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <BarChart
          style={{flex: 1}}
          data={lineChartValue.map((item) => item.value)}
          svg={{
            fill: primaryColor,
            stroke: primaryColor,
            strokeWidth: 2,
          }}
          curve={shape.curveLinear}>
          <CustomGrid />
          <Tooltip
            xValue={0}
            yValue={0}
            text={`${lineChartValue[0]?.month} ${lineChartValue[0]?.value} `}
          />
          <Tooltip
            xValue={8}
            yValue={0}
            text={`${lineChartValue[11]?.month} ${lineChartValue[11]?.value} `}
          />
          <Labels />
        </BarChart>
        <XAxis
          data={lineChartValue}
          formatLabel={(_, index) => lineChartValue[index].month}
          contentInset={{left: 10, right: 10}}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
        />
      </View>
    </>
  );
};
