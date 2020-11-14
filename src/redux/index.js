import { combineReducers } from 'redux';

const initialAuthState = { isLoggedIn: false };
const Login = 'Login';
const Logout = 'Logout';
export const login = data => ({
  type: Login,
  data,
});

export const logout = () => ({
  type: Logout,
});

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case Login:
      return { ...state, isLoggedIn: true, user: action.data.user, cabinet: action.data.cabinet };
    case Logout:
      return { ...state, isLoggedIn: false, user: {}, cabinet: {} };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  auth,
});

export default AppReducer;
