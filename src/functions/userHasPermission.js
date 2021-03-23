import AsyncStorage from '@react-native-community/async-storage';

export const userHasPermission = async (permit) => {

  let string = await AsyncStorage.getItem('modules');

  let authorities = JSON.parse(string);
  authorities = authorities.map((item) => item.module_route);
  console.log('authorities', authorities);

  var find = false;
  if (authorities.includes(permit)) find = true;
  console.log(permit, find);
  return find;
};
