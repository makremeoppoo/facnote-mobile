const React = require("react-native");
const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({ $rem: deviceWidth / 320 });


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const ScaleHelpers = {
    CalcWidth: function (width) {
        return wp(((width / deviceWidth) * 100).toString() + "%");
    },
    CalcHeight: function (height) {
        return hp(((height / deviceHeight) * 100).toString() + "%");
    },
    CalcRem: function (dim) {
        return dim + "rem"
    }
}

export default ScaleHelpers;