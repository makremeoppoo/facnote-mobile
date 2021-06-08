import React from 'react';
import {View} from 'react-native';
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomGrid from '../CustomGrid/CostumGrid';
import Tooltip from '../TooltipChart/Tooltip';

const axesSvg = {fontSize: 10, fill: 'grey'};
const verticalContentInset = {top: 10, bottom: 10};

export default LineChartCustom = ({lineChartChargeValue, maxChargeValue,minChargeValue}) => {
  return (
    <>
      <YAxis
        data={lineChartChargeValue}
        style={{marginBottom: 0}}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={10}
        min={minChargeValue - minChargeValue / 4}
        yAccessor={({item}) => item.value}
        formatLabel={(value) => value}
        max={maxChargeValue}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <LineChart
          style={{flex: 1}}
          data={lineChartChargeValue}
          yAccessor={({item}) => item.value}
          svg={{
            stroke: '#4CC418',
            strokeWidth: 2,
          }}
          curve={shape.curveLinear}>
          <CustomGrid />
          <Tooltip
            xValue={0}
            yValue={0}
            text={`${lineChartChargeValue[0]?.month} ${lineChartChargeValue[0]?.value} `}
          />
          <Tooltip
            xValue={8}
            yValue={0}
            text={`${lineChartChargeValue[11]?.month} ${lineChartChargeValue[11]?.value} `}
          />
        </LineChart>
        <XAxis
          data={lineChartChargeValue}
          formatLabel={(_, index) => lineChartChargeValue[index].month}
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
