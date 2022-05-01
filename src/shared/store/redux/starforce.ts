import { ActionType, createAction, createReducer } from "typesafe-actions";
import produce from "immer";
import { StarforceEvent } from "starforce/shared/utils/starforce";

// Action constants
export const SET_EQUIP_LEVEL = "sim/starforce/SET_EQUIP_LEVEL";
export const SET_CURRENT_STAR = "sim/starforce/SET_CURRENT_STAR";
export const SET_TARGET_STAR = "sim/starforce/SET_TARGET_STAR";
export const SET_SPARE_COST = "sim/starforce/SET_SPARE_COST";
export const SET_ERROR_MESSAGE = "sim/starforce/SET_ERROR_MESSAGE";
export const SET_SIM_NUM = "sim/starforce/SET_SIM_NUM";
export const TOGGLE_SAFEGUARD = "sim/starforce/TOGGLE_SAFEGUARD";
export const TOGGLE_STARCATCH = "sim/starforce/TOGGLE_STARCATCH";
export const SET_EVENT = "sim/starforce/SET_EVENT";
export const TOGGLE_DISCOUNT = "sim/starforce/TOGGLE_DISCOUNT";
export const SET_FLAG = "sim/starforce/SET_FLAG";
export const SET_RESULT = "sim/starforce/SET_RESULT";
export const SET_PROGRESS = "sim/starforce/SET_PROGRESS";
export const SET_ERROR = "sim/starforce/SET_ERROR";

export const START_CALC = "sim/starforce/START_CALC";
export const CANCEL_CALC = "sim/starforce/CANCEL_CALC";

// Actions
const setEquipLevel = createAction(
  SET_EQUIP_LEVEL,
  (n: number | undefined) => n
)();
const setCurrentStar = createAction(
  SET_CURRENT_STAR,
  (n: number | undefined) => n
)();
const setTargetStar = createAction(
  SET_TARGET_STAR,
  (n: number | undefined) => n
)();
const setSpareCost = createAction(
  SET_SPARE_COST,
  (n: number | undefined) => n
)();
const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  (key: string, message: string) => ({ key, message })
)();
const setSimNum = createAction(SET_SIM_NUM, (n: number | undefined) => n)();
const toggleSafeguard = createAction(TOGGLE_SAFEGUARD, (i: number) => i)();
const toggleStarcatch = createAction(TOGGLE_STARCATCH, (i: number) => i)();
const setEvent = createAction(SET_EVENT, (v: StarforceEvent) => v)();
const toggleDiscount = createAction(TOGGLE_DISCOUNT, (v: string) => v)();
const setFlag = createAction(SET_FLAG, (key: string, b: boolean) => ({
  key,
  b,
}))();
const setResult = createAction(
  SET_RESULT,
  (simNum: number, costArr: number[], destroyedArr: number[]) => ({
    simNum,
    costArr,
    destroyedArr,
  })
)();
const setProgress = createAction(SET_PROGRESS, (n: number) => n)();
const setError = createAction(SET_ERROR, (e: any) => e)();

// Saga Actions
const startCalc = createAction(START_CALC)();
const cancelCalc = createAction(CANCEL_CALC)();

export const actions = {
  setEquipLevel,
  setCurrentStar,
  setTargetStar,
  setSpareCost,
  setErrorMessage,
  setSimNum,
  toggleSafeguard,
  toggleStarcatch,
  setEvent,
  toggleDiscount,
  setFlag,
  setResult,
  setProgress,
  setError,
  startCalc,
  cancelCalc,
};

// Types
type StarforceAction = ActionType<typeof actions>;

export type StarforceState = {
  equipInfo: {
    equipLevel?: number;
    currentStar?: number;
    targetStar?: number;
    spareCost?: number;
  };
  errorMessage: {
    [index: string]: string;
    equipLevel: string;
    currentStar: string;
    targetStar: string;
    spareCost: string;
    simNum: string;
  };
  detail: {
    simNum?: number;
    safeguardArr: boolean[];
    starcatchArr: boolean[];
    event: StarforceEvent;
    discount: {
      [key: string]: boolean;
      MVP_silver: boolean;
      MVP_gold: boolean;
      MVP_diamond: boolean;
      PC_room: boolean;
    };
  };
  flag: {
    [key: string]: boolean;
    isReady: boolean;
    isLoading: boolean;
    isSuccessful: boolean;
  };
  result: {
    simNum: number;
    progress: number;
    costArr: number[];
    destroyedArr: number[];
    error: any;
  };
};

// Initial state
const initialState: StarforceState = {
  equipInfo: {
    equipLevel: undefined,
    currentStar: undefined,
    targetStar: undefined,
    spareCost: undefined,
  },
  errorMessage: {
    equipLevel: "",
    currentStar: "",
    targetStar: "",
    spareCost: "",
    simNum: "",
  },
  detail: {
    simNum: 100000,
    safeguardArr: Array(5).fill(false),
    starcatchArr: Array(25).fill(false),
    event: "none",
    discount: {
      MVP_silver: false,
      MVP_gold: false,
      MVP_diamond: false,
      PC_room: false,
    },
  },
  flag: {
    isReady: false,
    isLoading: false,
    isSuccessful: true,
  },
  result: {
    simNum: 0,
    progress: 0,
    costArr: [],
    destroyedArr: [],
    error: null,
  },
};

// Reducer
const starforce = createReducer<StarforceState, StarforceAction>(initialState, {
  [SET_EQUIP_LEVEL]: (state, { payload: n }) =>
    produce(state, (draft) => {
      draft.equipInfo.equipLevel = n;
    }),
  [SET_CURRENT_STAR]: (state, { payload: n }) =>
    produce(state, (draft) => {
      draft.equipInfo.currentStar = n;
    }),
  [SET_TARGET_STAR]: (state, { payload: n }) =>
    produce(state, (draft) => {
      draft.equipInfo.targetStar = n;
    }),
  [SET_SPARE_COST]: (state, { payload: n }) =>
    produce(state, (draft) => {
      draft.equipInfo.spareCost = n;
    }),
  [SET_ERROR_MESSAGE]: (state, { payload: { key, message } }) =>
    produce(state, (draft) => {
      draft.errorMessage[key] = message;
    }),
  [SET_SIM_NUM]: (state, { payload: n }) =>
    produce(state, (draft) => {
      draft.detail.simNum = n;
    }),
  [TOGGLE_SAFEGUARD]: (state, { payload: i }) =>
    produce(state, (draft) => {
      draft.detail.safeguardArr[i] = !draft.detail.safeguardArr[i];
    }),
  [TOGGLE_STARCATCH]: (state, { payload: i }) =>
    produce(state, (draft) => {
      draft.detail.starcatchArr[i] = !draft.detail.starcatchArr[i];
    }),
  [SET_EVENT]: (state, { payload: v }) =>
    produce(state, (draft) => {
      draft.detail.event = v;
    }),
  [TOGGLE_DISCOUNT]: (state, { payload: v }) =>
    produce(state, (draft) => {
      draft.detail.discount[v] = !draft.detail.discount[v];
    }),
  [SET_FLAG]: (state, { payload: { key, b } }) =>
    produce(state, (draft) => {
      draft.flag[key] = b;
    }),
  [SET_RESULT]: (state, { payload: { simNum, costArr, destroyedArr } }) =>
    produce(state, (draft) => {
      draft.result.simNum = simNum;
      draft.result.costArr = costArr;
      draft.result.destroyedArr = destroyedArr;
    }),
  [SET_PROGRESS]: (state, { payload: n }) =>
    produce(state, (draft) => {
      draft.result.progress = n;
    }),
  [SET_ERROR]: (state, { payload: e }) =>
    produce(state, (draft) => {
      draft.result.error = e;
    }),
});

export default starforce;