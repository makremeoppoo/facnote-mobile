import React from 'react';
import { View } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import CustomGrid from '../CustomGrid/CostumGrid';
import Tooltip from '../TooltipChart/Tooltip';
import { Text } from 'react-native-svg';
import { chartColor } from '../../Theme/AppStyles';

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 };

export default BarChartCustom = ({ barValue, maxValue, minValue, year }) => {
  return (
    <>
      <YAxis
        data={barValue}
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
        <BarChart
          style={{ flex: 1 }}
          data={barValue.map((item) => item.value)}
          svg={{
            fill: chartColor,
            stroke: "white",
            strokeWidth: 2,
            strokeOpacity: '0.5',
            fillOpacity: '0.5'

          }}

        >
          <CustomGrid />
          <Tooltip
            xValue={0}
            yValue={0}
            onlyText
            textColor={chartColor}
            text={`${barValue[0]?.value} `}
          />
          <Tooltip
            xValue={0}
            yValue={25}
            text={`${barValue[0]?.month} ${year} `}
          />
          <Tooltip
            xValue={8}
            yValue={0}
            onlyText
            textColor={"rgba(194, 194, 194, 1)"}

            text={`${barValue[11]?.value} `}
          />
          <Tooltip
            xValue={8}
            yValue={25}
            text={`${barValue[11]?.month} ${year}} `}
          />
        </BarChart>
        <XAxis
          data={barValue}
          formatLabel={(_, index) => barValue[index].month}
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
