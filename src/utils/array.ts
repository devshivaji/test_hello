// type NestedArray<T> = T | NestedArray<T>[]

export const flatten = <T>(arr: T[]) => {
    const newArr: T[] = [];

    function recursive(temp: T | T[]) {
        if (Array.isArray(temp)) {
            temp.forEach(it => {
                recursive(it);
            });
        } else {
            newArr.push(temp);
        }
    }

    recursive(arr);

    return newArr;
};
