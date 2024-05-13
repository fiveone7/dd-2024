export const numberFormat = val => {
    return val > 9 ? val : '0' + val;
}

export const timeFormat = val => {
    return numberFormat(val[0] + val[2] * 12) + ":" + numberFormat(val[1]);
}