import LocalAxios from "./LocalAxios";
import React, { useState } from "react";
const local = LocalAxios();

// 가족 생성
export const createFamilyAxios = async function (data: { name:string }, success:any, fail:any) {
  await local.post("/family", data).then(success).catch(fail);
};
