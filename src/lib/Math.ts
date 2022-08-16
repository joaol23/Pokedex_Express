export function sumArray(array: Array<any>, parameter: string) {
    return array.reduce((value, current) => { return value + Number(current[parameter]) }, 0)
}

export function avaregeArray(array: Array<any>, parameter: string) {
    const sum = sumArray(array, parameter);
    return sum / array.length;
}

export function topN(arr: Array<any>, n: number, parameter: string) {
    return arr
        .sort((a, b) => {
            return Number(b[parameter]) - Number(a[parameter])
        })
        .slice(0, n);
};