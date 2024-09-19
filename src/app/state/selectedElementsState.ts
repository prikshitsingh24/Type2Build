import { atom } from "recoil";

const selectedElementState = atom({
    key: 'selectedElementState', // unique ID (with respect to other atoms/selectors)
    default: <any>[], // default value (aka initial value)
  });

const toolkitStatus=atom({
  key:'toolkitStatus',
  default:false
})

export default {selectedElementState,toolkitStatus}