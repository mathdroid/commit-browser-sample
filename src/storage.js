import localForage from "localforage";

export const userStorage = localForage.createInstance({
  driver: localForage.LOCALSTORAGE,
  name: "userStorage"
});

export const dataStorage = localForage.createInstance({
  driver: localForage.INDEXEDDB,
  name: "dataStorage"
});

export default dataStorage;
