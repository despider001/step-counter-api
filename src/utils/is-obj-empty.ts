export const isObjEmpty = (obj: unknown): boolean => {
    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};