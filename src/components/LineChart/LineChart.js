import React from 'react';
import { View } from 'react-native';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomGrid from '../CustomGrid/CostumGrid';
import Tooltip from '../TooltipChart/Tooltip';
import { chartColor } from "../../Theme/AppStyles"
const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 };

export default LineChartCustom = ({ lineChartValue, maxValue, minValue, year }) => {
  return (
    <>
      <YAxis
        data={lineChartValue}
        style={{ marginBottom: 0 }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={3}
        min={minValue - minValue / 4}
        yAccessor={({ item }) => item.value}
        formatLabel={(value) => String(value).replace(/000$/, "K")}
        max={maxValue + 1000}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={lineChartValue}
          yAccessor={({ item }) => item.value}
          svg={{
            stroke: chartColor,
            strokeWidth: 2,
            strokeOpacity: '0.5'
          }}
          curve={shape.curveNatural}
        >
          <CustomGrid />
          <Tooltip
            xValue={0}
            yValue={0}
            onlyText
            textColor={chartColor}
            text={`${
              String(lineChartValue[0]?.value).replace(/000$/, "K") } `}
          />
          <Tooltip
            xValue={0}
            yValue={25}
            text={`${lineChartValue[0]?.month} ${year} `}
          />
          <Tooltip
            xValue={9}
            yValue={0}
            onlyText
            textColor={"rgba(194, 194, 194, 1)"}
            text={`${
              String(lineChartValue[11]?.value).replace(/000$/, "K") } `}
          />
          <Tooltip
            xValue={9}
            yValue={25}
            text={`${lineChartValue[11]?.month} ${year}`}
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
