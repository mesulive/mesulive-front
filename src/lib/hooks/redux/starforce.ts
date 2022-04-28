import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store/redux";
import {useCallback} from "react";
import {actions, StarforceState} from "store/redux/starforce";

export function useStarforce<Selected = unknown>(
  selector: (s: StarforceState) => Selected,
  equalityFn?: ((left: any, right: any) => boolean) | undefined
): Selected {
  return useSelector((state: RootState) => selector(state.starforce), equalityFn);
}

export function useStarforceAction() {
  const dispatch = useDispatch();

  const setEquipLevel = useCallback((n) => {
    dispatch(actions.setEquipLevel(n));
  }, [dispatch]);
  const setCurrentStar = useCallback((n) => {
    dispatch(actions.setCurrentStar(n));
  }, [dispatch]);
  const setTargetStar = useCallback((n) => {
    dispatch(actions.setTargetStar(n));
  }, [dispatch]);
  const setSpareCost = useCallback((n) => {
    dispatch(actions.setSpareCost(n));
  }, [dispatch]);
  const setErrorMessage = useCallback((key, message) => {
    dispatch(actions.setErrorMessage(key, message));
  }, [dispatch]);
  const setSimNum = useCallback((n) => {
    dispatch(actions.setSimNum(n));
  }, [dispatch]);
  const toggleSafeguard = useCallback((i) => {
    dispatch(actions.toggleSafeguard(i));
  }, [dispatch]);
  const toggleStarcatch = useCallback((i) => {
    dispatch(actions.toggleStarcatch(i));
  }, [dispatch]);
  const setEvent = useCallback((v) => {
    dispatch(actions.setEvent(v));
  }, [dispatch]);
  const toggleDiscount = useCallback((v) => {
    dispatch(actions.toggleDiscount(v));
  }, [dispatch]);
  const setResult = useCallback((simNum, costArr, destroyedArr) => {
    dispatch(actions.setResult(simNum, costArr, destroyedArr));
  }, [dispatch]);
  const setFlag = useCallback((key, b) => {
    dispatch(actions.setFlag(key, b));
  }, [dispatch]);

  const startCalc = useCallback(() => {
    dispatch(actions.startCalc());
  }, [dispatch]);
  const cancelCalc = useCallback(() => {
    dispatch(actions.cancelCalc());
  }, [dispatch]);

  return {
    setEquipLevel, setCurrentStar, setTargetStar, setSpareCost, setErrorMessage,
    setSimNum, toggleSafeguard, toggleStarcatch, setEvent, toggleDiscount,
    setFlag,
    setResult,
    startCalc, cancelCalc
  };
}