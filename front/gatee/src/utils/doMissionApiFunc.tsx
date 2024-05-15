import {doMissionApi} from "@api/mission";

const doMissionApiFunc = (type:string,amount:number) => {
  doMissionApi({
    type:type,
    photoCount:amount,
  },res => {
    console.log(res)
  },err => {
    console.log(err)
  })

};

export default doMissionApiFunc;