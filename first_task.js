function func(s, a, b) {
    if (s.match(/^$/)) {
        return -1;
    }
    let aIndex = -1;
    let bIndex = -1;

    for(let i = s.length - 1; i > 0; i--) {
        if(s[i] === a) {
            aIndex = i;
            break;
        }
        if(s[i] === b) {
            bIndex  = i;
            break;
        }
    }

    return Math.max(aIndex, bIndex);
}