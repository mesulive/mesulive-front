import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/redux";
import { useCallback } from "react";
import { actions, StarforceState } from "store/redux/starforce";
import { StarforceEvent } from "lib/starforce";

export function useStarforce<Selected = unknown>(
  selector: (s: StarforceState) => Selected,
  equalityFn?: ((left: any, right: any) => boolean) | undefined
): Selected {
  return useSelector(
    (state: RootState) => selector(state.starforce),
    equalityFn
  );
}

export function useStarforceAction() {
  const dispatch = useDispatch();

  const setEquipLevel = useCallback(
    (n: number | undefined) => {
      dispatch(actions.setEquipLevel(n));
    },
    [dispatch]
  );
  const setCurrentStar = useCallback(
    (n: number | undefined) => {
      dispatch(actions.setCurrentStar(n));
    },
    [dispatch]
  );
  const setTargetStar = useCallback(
    (n: number | undefined) => {
      dispatch(actions.setTargetStar(n));
    },
    [dispatch]
  );
  const setSpareCost = useCallback(
    (n: number | undefined) => {
      dispatch(actions.setSpareCost(n));
    },
    [dispatch]
  );
  const setErrorMessage = useCallback(
    (key: string, message: string) => {
      dispatch(actions.setErrorMessage(key, message));
    },
    [dispatch]
  );
  const setSimNum = useCallback(
    (n: number | undefined) => {
      dispatch(actions.setSimNum(n));
    },
    [dispatch]
  );
  const toggleSafeguard = useCallback(
    (i: number) => {
      dispatch(actions.toggleSafeguard(i));
    },
    [dispatch]
  );
  const toggleAllSafeguard = useCallback(() => {
    dispatch(actions.toggleAllSafeguard());
  }, [dispatch]);
  const toggleStarcatch = useCallback(
    (i: number) => {
      dispatch(actions.toggleStarcatch(i));
    },
    [dispatch]
  );
  const setEvent = useCallback(
    (v: string) => {
      dispatch(actions.setEvent(v as StarforceEvent));
    },
    [dispatch]
  );
  const toggleDiscount = useCallback(
    (v: string) => {
      dispatch(actions.toggleDiscount(v));
    },
    [dispatch]
  );
  const setResult = useCallback(
    (simNum: number, costArr: number[], destroyedArr: number[]) => {
      dispatch(actions.setResult(simNum, costArr, destroyedArr));
    },
    [dispatch]
  );
  const setFlag = useCallback(
    (key: string, b: boolean) => {
      dispatch(actions.setFlag(key, b));
    },
    [dispatch]
  );

  const startCalc = useCallback(() => {
    dispatch(actions.startCalc());
  }, [dispatch]);
  const cancelCalc = useCallback(() => {
    dispatch(actions.cancelCalc());
  }, [dispatch]);

  return {
    setEquipLevel,
    setCurrentStar,
    setTargetStar,
    setSpareCost,
    setErrorMessage,
    setSimNum,
    toggleSafeguard,
    toggleAllSafeguard,
    toggleStarcatch,
    setEvent,
    toggleDiscount,
    setFlag,
    setResult,
    startCalc,
    cancelCalc,
  };
}
