function func(s, a, b) {
    let aIndex = s.lastIndexOf(a)
    if(aIndex === 0) {
        aIndex = -1;
    }
    let bIndex = s.lastIndexOf(b)
    if(bIndex === 0) {
        bIndex = -1;
    }
    return Math.max(aIndex, bIndex);
}