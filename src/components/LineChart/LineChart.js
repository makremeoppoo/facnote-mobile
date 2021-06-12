import React from 'react';
import { View } from 'react-native';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomGrid from '../CustomGrid/CostumGrid';
import Tooltip from '../TooltipChart/Tooltip';
import { primaryColor } from "../../Theme/AppStyles"
const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 };

export default LineChartCustom = ({ lineChartValue, maxValue, minValue }) => {
  return (
    <>
      <YAxis
        data={lineChartValue}
        style={{ marginBottom: 0 }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={10}
        min={minValue - minValue / 4}
        yAccessor={({ item }) => item.value}
        formatLabel={(value) => value}
        max={maxValue}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={lineChartValue}
          yAccessor={({ item }) => item.value}
          svg={{
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
        </LineChart>
        <XAxis
          data={lineChartValue}
          formatLabel={(_, index) => lineChartValue[index].month}
          contentInset={{ left: 10, right: 10 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
        />
      </View>
    </>
  );
};
