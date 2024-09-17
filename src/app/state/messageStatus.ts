import { atom } from "recoil";

const messageState = atom({
    key: 'messageState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });



export default {messageState}