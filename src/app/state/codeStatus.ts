import { atom } from "recoil";

const frontendCodeState = atom({
    key: 'frontendCodeState', // unique ID (with respect to other atoms/selectors)
    default: " ", // default value (aka initial value)
  });



export default {frontendCodeState}