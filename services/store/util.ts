export const updateState = (oldObject: object, newProperties: object): object => {
  return {
    ...oldObject,
    ...newProperties
  }
};