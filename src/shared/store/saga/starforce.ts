import {takeLatest, select, put, all, fork, call, take, delay, race} from "redux-saga/effects";
import {actions, StarforceState} from "shared/store/redux/starforce";
import {getReachableStar, Option, StarforceSimState, starforceSim} from "starforce/shared/utils/starforce";
import {filterValue} from "shared/utils";

export function* starforceSaga() {
  yield all([
      fork(watchInput),
      fork(watchButton),
    ]
  )
}

function* watchInput() {
  yield takeLatest(
    [
      actions.setEquipLevel,
      actions.setSpareCost,
      actions.setCurrentStar,
      actions.setTargetStar,
      actions.setSimNum,
    ], handleErrorMessage);
}

function* watchButton() {
  while (true) {
    yield take(actions.startCalc);
    yield put(actions.setFlag("isReady", true));
    yield call(handleErrorMessage);
    const errorMessage: { [index: string]: string } = yield select(state => state.starforce.errorMessage);

    if (Object.keys(errorMessage).filter((v) => errorMessage[v] !== "").length === 0) {
      yield put(actions.setFlag("isLoading", true));
      try {
        const {finish} = yield race({
          finish: call(calc),
          cancel: take(actions.cancelCalc)
        });

        if (finish) {
          yield put(actions.setFlag("isSuccessful", true));
        }

        yield put(actions.setFlag("isLoading", false));
        yield put(actions.setProgress(0));
      } catch (e) {
        yield put(actions.setFlag("isSuccessful", false));
        yield put(actions.setError(e));
      }
    }
  }
}

// 시뮬레이션 함수
function* calc() {
  const {equipLevel, spareCost, currentStar, targetStar} = yield select(state => state.starforce.equipInfo);
  const {simNum, safeguardArr, starcatchArr, event, discount} = yield select(state => state.starforce.detail);
  const option: Option = {
    equipInfo: {
      equipLevel: equipLevel!,
      spareCost: filterValue(spareCost, undefined, 0),
      currentStar: filterValue(currentStar, undefined, 0),
      targetStar: targetStar!
    },
    detail: {
      simNum: simNum!,
      safeguardArr,
      starcatchArr,
      event,
      discount
    }
  };

  let state = new StarforceSimState(filterValue(currentStar, undefined, 0));
  let simCnt = 0;
  const dispatchInterval = 3;
  let dispatchCnt = 0;
  const costArr = [];
  const destroyedArr = [];

  console.time("calc");
  do {
    try {
      const result: { resultArr: { cost: number, destroyed: number }[], curState: StarforceSimState, simCnt: number } =
        yield call(starforceSim, option, 100000, simCnt, state);

      for (const res of result.resultArr) {
        costArr.push(res.cost);
        destroyedArr.push(res.destroyed);
      }

      dispatchCnt++;
      if (dispatchCnt === dispatchInterval) {
        yield put(actions.setProgress(Math.floor(simCnt / simNum! * 100)));
        dispatchCnt = 0;
      }

      if (result.simCnt >= simNum!) {
        yield put(actions.setProgress(100));
        break;
      }

      // console.log(result.curState, result.simCnt);
      state = result.curState;
      simCnt = result.simCnt;
    } catch (e) {
      console.log(e);
      break;
    }
  } while (true);
  console.timeEnd("calc");

  yield delay(0);
  // console.log(`평균 비용: ${putUnit(mean(costArr))}, 평균 파괴 횟수: ${mean(destroyedArr)}`);

  yield call([costArr, costArr.sort], (a, b) => a - b);
  yield call([destroyedArr, destroyedArr.sort], (a, b) => a - b);
  yield put(actions.setResult(simNum!, costArr, destroyedArr));
}

function* handleErrorMessage() {
  const starforce: StarforceState = yield select(state => state.starforce);
  const {equipLevel, currentStar, targetStar, spareCost} = starforce.equipInfo;
  const {simNum} = starforce.detail;
  const {isReady} = starforce.flag;

  const errorKeyArray = ["equipLevel", "currentStar", "targetStar", "spareCost", "simNum"];
  const message: { [index: string]: string } = {};
  errorKeyArray.forEach((key) => {
    message[key] = ""
  });

  // equipLevel
  if (equipLevel === undefined) {
    if (isReady) {
      message.equipLevel = "필수 입력 항목입니다.";
    }
  } else if (equipLevel < 0 || equipLevel > 250) {
    message.equipLevel = "0 이상 250 이하의 수치를 입력해주세요.";
  }

  // spareCost
  if (spareCost !== undefined) {
    if (spareCost < 0) {
      message.spareCost = "0 이상의 수치를 입력해주세요.";
    }
  }

  // currentStar
  if (currentStar !== undefined) {
    if (currentStar < 0) {
      message.currentStar = "0 이상의 수치를 입력해주세요.";
    } else if (equipLevel !== undefined && currentStar >= getReachableStar(equipLevel)) {
      message.currentStar = `${getReachableStar(equipLevel)} 미만의 수치를 입력해주세요.`;
    } else if (currentStar >= 25) {
      message.currentStar = "25 미만의 수치를 입력해주세요.";
    }
  }

  // targetStar
  if (targetStar === undefined) {
    if (isReady) {
      message.targetStar = "필수 입력 항목입니다.";
    }
  } else if (targetStar < 0) {
      message.targetStar = "0 이상의 수치를 입력해주세요.";
    } else if (equipLevel !== undefined && targetStar > getReachableStar(equipLevel)) {
      message.targetStar = `${getReachableStar(equipLevel)} 이하의 수치를 입력해주세요.`;
    } else if (currentStar !== undefined && targetStar <= currentStar) {
      message.targetStar = "현재 스타포스보다 높은 수치를 입력해주세요.";
    } else if (targetStar > 25) {
      message.targetStar = "25 이하의 수치를 입력해주세요.";
    }

  // simNumber
  if (simNum === undefined) {
    if (isReady) {
      message.simNum = "필수 입력 항목입니다.";
    }
  } else if (simNum < 0 || simNum > 100000) {
    message.simNum = "0 이상 10만 이하의 수치를 입력해주세요.";
  }

  // dispatch setError
  for (const key of errorKeyArray) {
    yield put(actions.setErrorMessage(key, message[key]));
  }
}

