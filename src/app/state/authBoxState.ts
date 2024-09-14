import { atom } from "recoil";

const authBoxState = atom({
    key: 'authBoxState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

const signUpBoxState = atom({
  key:"signUpBoxState",
  default:false
})

export default {authBoxState,signUpBoxState}