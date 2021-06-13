import React from 'react';
import { G, Rect, Text } from 'react-native-svg';
import { fontType } from '../../Theme/AppStyles';

export default Tooltip = ({ x, y, xValue, yValue, text, onlyText = false, textColor }) => (
  <G x={x(xValue)} key={'tooltip'}>
    <G y={yValue}>
      <Rect
        height={28}
        width={70}
        fill={onlyText ? 'transparent' : 'rgba(253, 227, 167, 0.6)'}
        ry={100}
        rx={10}
      />
      <Text
        x={75 / 2}
        fontFamily={fontType.med}
        fontSize={9}
        dy={16}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}
        stroke={onlyText ? textColor : 'orange'}>
        {text}
      </Text>
    </G>
  </G>
);
