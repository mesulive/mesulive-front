import {randomPick} from "shared/utils";
import cloneDeep from "lodash/cloneDeep";

export type StarforceEvent = "none" | "1516" | "1+1" | "30%" | "shining";

export type Option = {
  equipInfo: {
    equipLevel: number;
    currentStar: number;
    targetStar: number;
    spareCost: number;
  };
  detail: {
    simNum: number;
    safeguardArr: boolean[];
    starcatchArr: boolean[];
    event: StarforceEvent;
    discount: {
      MVP_silver: boolean;
      MVP_gold: boolean;
      MVP_diamond: boolean;
      PC_room: boolean;
    };
  };
}

export class StarforceSimState {
  star: number;

  cost: number;

  destroyed: number;

  stack: 0 | 1 | 2;

  constructor(star: number) {
    this.star = star;
    this.cost = 0;
    this.destroyed = 0;
    this.stack = 0;
  }
}

export const starforceDiscount: { [key: string]: { label: string, rate: number } } = {
  MVP_silver: {label: "MVP 실버", rate: 0.03},
  MVP_gold: {label: "MVP 골드", rate: 0.05},
  MVP_diamond: {label: "MVP 다이아", rate: 0.1},
  PC_room: {label: "PC방", rate: 0.05}
}

export const getReachableStar = (level: number) => {
  if (level < 95) return 5;
  if (level <= 107) return 10;
  if (level <= 127) return 15;
  if (level <= 137) return 20;
  return 25;
}

const getPropTable = (targetStar: number, starcatchArr: boolean[]): number[][] => {
  const defaultTable = [
    [0.95, 0.05, 0, 0],
    [0.9, 0.1, 0, 0],
    [0.85, 0.15, 0, 0],
    [0.85, 0.15, 0, 0],
    [0.8, 0.2, 0, 0],
    [0.75, 0.25, 0, 0],
    [0.7, 0.3, 0, 0],
    [0.65, 0.35, 0, 0],
    [0.6, 0.4, 0, 0],
    [0.55, 0.45, 0, 0],
    [0.5, 0.5, 0, 0],
    [0.45, 0, 0.55, 0],
    [0.4, 0, 0.594, 0.006],
    [0.35, 0, 0.637, 0.013],
    [0.3, 0, 0.686, 0.014],
    [0.3, 0.679, 0, 0.021],
    [0.3, 0, 0.679, 0.021],
    [0.3, 0, 0.679, 0.021],
    [0.3, 0, 0.672, 0.028],
    [0.3, 0, 0.672, 0.028],
    [0.3, 0.63, 0, 0.07],
    [0.3, 0, 0.63, 0.07],
    [0.03, 0, 0.776, 0.194],
    [0.02, 0, 0.686, 0.294],
    [0.01, 0, 0.594, 0.396]
  ];
  const starcatchTable = [
    [0.9975, 0.0025, 0, 0],
    [0.945, 0.055, 0, 0],
    [0.8925, 0.1075, 0, 0],
    [0.8925, 0.1075, 0, 0],
    [0.84, 0.16, 0, 0],
    [0.7875, 0.2125, 0, 0],
    [0.735, 0.265, 0, 0],
    [0.6825, 0.3175, 0, 0],
    [0.63, 0.37, 0, 0],
    [0.5775, 0.4225, 0, 0],
    [0.525, 0.475, 0, 0],
    [0.4725, 0, 0.5275, 0],
    [0.42, 0, 0.5742, 0.0058],
    [0.3675, 0, 0.61985, 0.01265],
    [0.315, 0, 0.6713, 0.0137],
    [0.315, 0.66445, 0, 0.02055],
    [0.315, 0, 0.66445, 0.02055],
    [0.315, 0, 0.66445, 0.02055],
    [0.315, 0, 0.6576, 0.0274],
    [0.315, 0, 0.6576, 0.0274],
    [0.315, 0.6165, 0, 0.0685],
    [0.315, 0, 0.6165, 0.0685],
    [0.0315, 0, 0.7748, 0.1937],
    [0.021, 0, 0.6853, 0.2937],
    [0.0105, 0, 0.5937, 0.3958]
  ];
  const result = defaultTable;

  starcatchArr.forEach((v, i) => {
    if (v) {
      result[i] = starcatchTable[i];
    }
  })

  return result.slice(0, targetStar);
}

const getCostArr = (equipLevel: number, targetStar: number): number[] => {
  const result = [];
  for (let i = 0; i < targetStar; i++) {
    if (i <= 9)
      result.push(1000 + equipLevel**3 * (i + 1) / 25);
    else if (i <= 14)
      result.push(Math.round((1000 + equipLevel**3 * (i + 1)**2.7 / 400) / 100) * 100);
    else
      result.push(Math.round((1000 + equipLevel**3 * (i + 1)**2.7 / 200) / 100) * 100);
  }

  return result;
}

/*
 * INPUT
 * opt: 시뮬레이션 설정
 * simUnit: 한 Promise 당 시뮬레이션 횟수
 * simCount: 현재까지 완료된 시뮬레이션 횟수
 * curState: 현재 진행하고 있는 시뮬레이션 상황
 *
 * OUTOUT: Promise
 * Promise의 resolve value: { resultArr, curState, simCount }
 * resultArr: { cost: number, destroyed: number }[]: 완료된 시뮬레이션 결과들의 배열
 * curState: 현재 진행하고 있는 시뮬레이션 상황
 * simCount: 현재까지 완료된 시뮬레이션 횟수
 */
export const starforceSim = (
  opt: Option,
  simUnit: number,
  simCnt: number,
  curState: StarforceSimState
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const {equipLevel, currentStar, targetStar, spareCost} = opt.equipInfo;
        const {simNum, safeguardArr, starcatchArr, event, discount} = opt.detail;

        // probTable 계산
        const probTable = getPropTable(targetStar, starcatchArr);

        // probTable에 safeguardArr 반영
        if (targetStar > 12) {
          safeguardArr.forEach((v, i) => {
            if (v && i + 12 < targetStar) {
              const star = i + 12;
              probTable[star][3] = 0; // 파괴 확률을 0으로 설정
              // 유지 or 하락 확률을 (1 - 성공확률)로 설정
              probTable[star][1] !== 0 ?
                probTable[star][1] = 1 - probTable[star][0] :
                probTable[star][2] = 1 - probTable[star][0];
            }
          });
        }

        // costArr 계산
        const defaultCostArr = getCostArr(equipLevel, targetStar);
        const costArr = cloneDeep(defaultCostArr);

        // costArr에 discount 반영
        let discountRate = 0;
        if (discount.PC_room) discountRate += starforceDiscount.PC_room.rate;
        if (discount.MVP_diamond) discountRate += starforceDiscount.MVP_diamond.rate;
        else if (discount.MVP_gold) discountRate += starforceDiscount.MVP_gold.rate;
        else if (discount.MVP_silver) discountRate += starforceDiscount.MVP_silver.rate;
        for (let i = 0; i < 17; i++) {
          costArr[i] *= (1 - discountRate);
        }

        // costArr에 event 반영 & costArr가 정수임을 보장
        for (let i = 0; i < costArr.length; i++) {
          if (event === "30%" || event === "shining") {
            costArr[i] *= 0.7;
          }
          costArr[i] = Math.round(costArr[i]);
        }

        // test code
        // const costArr_test = cloneDeep(costArr);
        // for (let i = 12; i <= 16; i++) {
        //   // safeguard 반영
        //   if (12 <= i && i <= 16 && safeguardArr[i - 12]) {
        //     costArr_test[i] += defaultCostArr[i];
        //   }
        // }
        // console.log(costArr_test);

        let unitCnt = 0;
        const resultArr: { cost: number, destroyed: number }[] = [];

        while (unitCnt < simUnit) {
          unitCnt++;
          const curStar = curState.star;
          const curStack = curState.stack;
          const safeguard = (curStar >= 12 && curStar < 17) && safeguardArr[curStar - 12];

          // cost 계산
          let cost = costArr[curStar];
          if (curStack !== 2 && safeguard) {
            if (!(
              (event === "1516" || event === "shining") && curStar > 0 && curStar < 16 && curStar % 5 === 0
            )) {
              cost += defaultCostArr[curStar];
            }
          }
          curState.cost += cost;

          // probArr , rp계산
          let rp = 0;
          let shouldPick = true;

          if (curStack === 2) {
            shouldPick = false;
          } else if (event === "1516" || event === "shining") {
            if (curStar > 0 && curStar < 16 && curStar % 5 === 0) {
              shouldPick = false;
            }
          }

          if (shouldPick) {
            const probArr = probTable[curStar];
            rp = randomPick(probArr);
          }

          // star, destroyed, stack 계산
          switch (rp) {
            case 0: // 성공
              if (curStar <= 10 && event === "1+1") {
                curState.star += 2;
              } else {
                curState.star += 1;
              }
              curState.stack = 0;
              break;
            case 1: // 유지
              curState.stack = 0;
              break;
            case 2: // 하락
              curState.stack++;
              curState.star--;
              break;
            case 3: // 파괴
              curState.star = 12;
              curState.destroyed++;
              curState.cost += spareCost;
              curState.stack = 0;
              break;
            default: // 오류
              reject(new Error(`randomPick Error: ${curStar}`));
              return;
          }
          // console.log(`${rp}: ${state.star}성 / ${state.cost}메소 / 파괴 ${state.destroyed}회 / ${state.stack}스택`);

          // 완료(목표 달성) 여부
          if (curState.star === targetStar) {
            resultArr.push({cost: curState.cost, destroyed: curState.destroyed});
            simCnt++;

            // 계산이 완전히 끝났다면 curSimCnt === simNum - 1
            if (simCnt >= simNum) break;
            else curState = new StarforceSimState(currentStar);
          }
        }

        const result = {resultArr, curState, simCnt};
        resolve(result);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    }, 0);
  });
}