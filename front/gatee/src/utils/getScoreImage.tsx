import React from 'react';

import {ReactComponent as Scored100} from "@assets/images/examImg/score100.svg"
import {ReactComponent as Scored90} from "@assets/images/examImg/score90.svg"
import {ReactComponent as Scored80} from "@assets/images/examImg/score80.svg"
import {ReactComponent as Scored70} from "@assets/images/examImg/score70.svg"
import {ReactComponent as Scored60} from "@assets/images/examImg/score60.svg"
import {ReactComponent as Scored50} from "@assets/images/examImg/score50.svg"
import {ReactComponent as Scored40} from "@assets/images/examImg/score40.svg"
import {ReactComponent as Scored30} from "@assets/images/examImg/score30.svg"
import {ReactComponent as Scored20} from "@assets/images/examImg/score20.svg"
import {ReactComponent as Scored10} from "@assets/images/examImg/score10.svg"
import {ReactComponent as Scored0} from "@assets/images/examImg/score0.svg"
const getScoreImage = (score: number) => {
  switch (score) {
    case 100:
      return <Scored100 />;
    case 90:
      return <Scored90 />;
    case 80:
      return <Scored80 />;
    case 70:
      return <Scored70 />;
    case 60:
      return <Scored60 />;
    case 50:
      return <Scored50 />;
    case 40:
      return <Scored40 />;
    case 30:
      return <Scored30 />;
    case 20:
      return <Scored20 />;
    case 10:
      return <Scored10 />;
    default:
      return <Scored0 />;
  }
};

export default getScoreImage;