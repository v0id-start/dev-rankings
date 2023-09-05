import internIconURL from "./icons/intern_icon.png"; 
import jrIconURL from "./icons/jr_dev_icon.png";
import dev1IconURL from "./icons/dev_1_icon.png";
import dev2IconURL from "./icons/dev_2_icon.png";
import dev3IconURL from "./icons/dev_3_icon.png";
import srIconURL from "./icons/sr_dev_icon.png";
import guruIconURL from "./icons/guru_icon.png";

export const INTERN_THRESH = 100;
export const JR_THRESH = 200;
export const DEV_1_THRESH = 300;
export const DEV_2_THRESH = 400;
export const DEV_3_THRESH = 500;
export const SENIOR_THRESH = 600;

export function getRankImgURL(numPoints) {
    if (numPoints < INTERN_THRESH) {
        return internIconURL;
    } else if (numPoints < JR_THRESH) {
        return jrIconURL;
    }
    else if (numPoints < DEV_1_THRESH) {
        return dev1IconURL;
    }
    else if (numPoints < DEV_2_THRESH){
        return dev2IconURL;
    }
    else if (numPoints < DEV_3_THRESH){
        return dev3IconURL;
    }
    else if (numPoints < SENIOR_THRESH){
        return srIconURL;
    }
    else {
        return guruIconURL;
    }
  }

  export function getTitleFromPoints(numPoints) {
    if (numPoints < INTERN_THRESH) {
        return "Intern";
    } else if (numPoints < JR_THRESH) {
        return "Jr. Developer";
    }
    else if (numPoints < DEV_1_THRESH) {
        return "Developer I";
    }
    else if (numPoints < DEV_2_THRESH){
        return "Developer II";
    }
    else if (numPoints < DEV_3_THRESH){
        return "Developer III";
    }
    else if (numPoints < SENIOR_THRESH){
        return "Sr. Developer";
    }
    else {
        return "Guru"
    }
  }

  export function getNextThreshold(numPoints) {
    if (numPoints < INTERN_THRESH)
        return INTERN_THRESH;
    if (numPoints < JR_THRESH)
        return JR_THRESH;
    if (numPoints < DEV_1_THRESH)
        return DEV_1_THRESH;
    if (numPoints < DEV_2_THRESH)
        return DEV_2_THRESH;
    if (numPoints < DEV_3_THRESH)
        return DEV_3_THRESH;
    if (numPoints < SENIOR_THRESH)
        return SENIOR_THRESH;
    return 600
    }