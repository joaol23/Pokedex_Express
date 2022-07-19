import { putZeroBeforeNumber } from "./String.js";

export function getStringDate(separetor) {
    const date = new Date();
    const month = putZeroBeforeNumber(date.getMonth() + 1);
    const year = date.getFullYear();
    const day = putZeroBeforeNumber(date.getDate());
    return day + separetor + month + separetor + year;
}