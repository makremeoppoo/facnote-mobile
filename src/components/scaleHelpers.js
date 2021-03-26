

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ScaleHelpers = {
  CalcWidth: function (width) {
    return wp(width.toString() + '%');
  },
  CalcHeight: function (height) {
    return hp(height.toString() + '%');
  },
 
};

export default ScaleHelpers;
