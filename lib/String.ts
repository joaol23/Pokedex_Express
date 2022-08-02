export function putZeroBeforeNumber(number: number) {
    return number < 10 ? "0" + number : number;
}
