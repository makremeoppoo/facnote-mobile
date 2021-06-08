import React from 'react';
import {View} from 'react-native';
import {BarChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomGrid from '../CustomGrid/CostumGrid';
import Tooltip from '../TooltipChart/Tooltip';
import {Text} from 'react-native-svg';
import {primaryColor} from '../../Theme/AppStyles';

const axesSvg = {fontSize: 10, fill: 'grey'};
const verticalContentInset = {top: 10, bottom: 10};

export default BarChartCustom =  ({barValue, maxValue,minValue})  => {
  return (
    <>
      <YAxis
        data={barValue}
        style={{marginBottom: 0}}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={10}
        min={minValue - minValue / 4}
        yAccessor={({item}) => item.value}
        formatLabel={(value) => value}
        max={maxValue}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <BarChart
          style={{flex: 1}}
          data={barValue.map((item) => item.value)}
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
            text={`${barValue[0]?.month} ${barValue[0]?.value} `}
          />
          <Tooltip
            xValue={8}
            yValue={0}
            text={`${barValue[11]?.month} ${barValue[11]?.value} `}
          />
        </BarChart>
        <XAxis
          data={barValue}
          formatLabel={(_, index) => barValue[index].month}
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
