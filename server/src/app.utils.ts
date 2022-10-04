/**
 * Random line generation
 *
 * @param len number
 * @constructor
 */
export const GET_ALPHA_NUMERIC_RANDOM = function(len:number): string {
    if ((len==undefined) || (len<=0)) {len=1;}
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let ifFirst = 0;
    for(let i=0;i<len;i++){
        if (i==0) {ifFirst = 10;} else {ifFirst = 0;}
        result += characters[Math.round(Math.random()*(characters.length-ifFirst-1))];
    }
    return result;
}

/**
 * artificial delay
 *
 * @param delay number
 */
export const delay = function (delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}
