import internIconURL from "../icons/intern_icon.png"; 
import jrIconURL from "../icons/jr_dev_icon.png";
import dev1IconURL from "../icons/dev_1_icon.png";
import dev2IconURL from "../icons/dev_2_icon.png";
import dev3IconURL from "../icons/dev_3_icon.png";
import srIconURL from "../icons/sr_dev_icon.png";
import guruIconURL from "../icons/guru_icon.png";

const thresholds = [
    { points: 500, title: "Intern", icon: internIconURL },
    { points: 1000, title: "Jr. Developer", icon: jrIconURL },
    { points: 1500, title: "Developer I", icon: dev1IconURL },
    { points: 2000, title: "Developer II", icon: dev2IconURL },
    { points: 2500, title: "Developer III", icon: dev3IconURL },
    { points: 1000000, title: "Sr. Developer", icon: srIconURL },
];

const GURU_THRESHOLD = 1000000;
const GURU_TITLE = "Guru";
const GURU_ICON = guruIconURL;

export const INTERN_THRESH = thresholds[0].points;
export const JR_THRESH = thresholds[1].points;
export const DEV_1_THRESH = thresholds[2].points;
export const DEV_2_THRESH = thresholds[3].points;
export const DEV_3_THRESH = thresholds[4].points;
export const SENIOR_THRESH = thresholds[5].points;

export function getRankImgURL(numPoints) {
    for (const threshold of thresholds) {
        if (numPoints < threshold.points) {
            return threshold.icon;
        }
    }
    return GURU_ICON;
}

export function getTitleFromPoints(numPoints) {
    for (const threshold of thresholds) {
        if (numPoints < threshold.points) {
            return threshold.title;
        }
    }
    return GURU_TITLE;
}

export function getNextThreshold(numPoints) {
    for (const threshold of thresholds) {
        if (numPoints < threshold.points) {
            return threshold.points;
        }
    }
    return GURU_THRESHOLD;
}

export function isValidPeriodString(input) {
    // Define the regex pattern for a comma-separated list of numbers between 1 and 7 with no spaces
    const pattern = /^(?:[1-7](?:,|$))+$/;
  
    // Test the input against the pattern
    return pattern.test(input);
  }