// Immutable
import {immutable} from "../../services/immutable/immutable";
// import {removeArrayItem, moveArrayItem} from "../../services/array/index";

const initialState: any = {
  status: "EMPTY",
  data: []
};
export const docReducer: any = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "START_LOADING_DOC":
      return immutable(state, { status: "LOADING" });
    case "LOAD_DOC":
      return immutable(state, {
        status: "COMPLETE",
        data: action.data
      });
    default:
      return state;
  }
};
