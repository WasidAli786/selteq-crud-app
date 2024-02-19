import { errorToast } from "@/utils/toaster";

export const useLocalStorage = () => {
  const setStorageItem = (key, value) => {
    try {
      if (typeof window !== "undefined" && key && value) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      errorToast(error, "Error while setting the value in the storage");
    }
  };

  const getStorageItem = (key) => {
    try {
      if (typeof window !== "undefined" && key) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      }
    } catch (error) {
      errorToast(error, "Error while getting the value in the storage");
    }
  };

  const removeStorageItem = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      errorToast(error, "Error while removing the value in the storage");
    }
  };

  return {
    setStorageItem,
    getStorageItem,
    removeStorageItem,
  };
};
