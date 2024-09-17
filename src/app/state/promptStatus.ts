import { atom } from "recoil";

const newDraftState = atom({
    key: 'newDraftState', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });


const changesInDraftState=atom({
    key: 'changesInDraftState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });


export default {newDraftState,changesInDraftState}