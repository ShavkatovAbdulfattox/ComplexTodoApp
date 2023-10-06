export const setToLocalStorage = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    alert(error);
  }
};

export const getFromLocalStorage = (name) => {
  let result = null;
  try {
    const localStorageValue = localStorage.getItem(name); // Use localStorage.getItem here
    if (localStorageValue) {
      result = JSON.parse(localStorageValue);
    }
  } catch (error) {
    alert(error);
  }
  return result;
};
