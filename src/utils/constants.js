import internIconURL from "../icons/intern_icon.png"; 
import jrIconURL from "../icons/jr_dev_icon.png";
import dev1IconURL from "../icons/dev_1_icon.png";
import dev2IconURL from "../icons/dev_2_icon.png";
import dev3IconURL from "../icons/dev_3_icon.png";
import srIconURL from "../icons/sr_dev_icon.png";
import guruIconURL from "../icons/guru_icon.png";

export const thresholds = {
    'INTERN': { points: 500, salary: 10, title: "Intern", color: "brown", icon: internIconURL },
    'JR': { points: 1000, salary: 20, title: "Jr. Developer", color: "green", icon: jrIconURL },
    'DEV_1': { points: 1500, salary: 30, title: "Developer I", color: "purple", icon: dev1IconURL },
    'DEV_2': { points: 2000, salary: 40, title: "Developer II", color: "orange", icon: dev2IconURL },
    'DEV_3': { points: 2500, salary: 50, title: "Developer III", color: "yellowgreen", icon: dev3IconURL },
    'SR': { points: 1000000, salary: 60, title: "Sr. Developer", color: "red", icon: srIconURL }
};


const GURU_THRESHOLD = 1000000;
const GURU_TITLE = "Guru";
const GURU_ICON = guruIconURL;

export const EXP_INCREMENT = 500;

export function getRankImgURL(numPoints) {

    for (const key in thresholds) {
        const threshold = thresholds[key];
        
        if (numPoints <= threshold.points) {
            return threshold.icon;
        }
    }
    return GURU_ICON;
}

export function getTitleFromPoints(numPoints) {

    for (const key in thresholds) {
        const threshold = thresholds[key];
        
        if (numPoints < threshold.points) {
            return threshold.title;
        }
    }

    return GURU_TITLE;
}

export function getSalaryFromPoints(numPoints) {

    for (const key in thresholds) {
        const threshold = thresholds[key];
        
        if (numPoints < threshold.points) {
            return threshold.salary;
        }
    }
    return 0;
}

export function getNextThreshold(numPoints) {

    for (const key in thresholds) {
        const threshold = thresholds[key];
        
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