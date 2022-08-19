/** Local storage service. */
export namespace LocalStorageService {
  const KEY = 'USER-TOKEN';

  /**
   * Save token in local storage.
   * @param token User token.
   */
  export const saveToken = (token: string) => {
    localStorage.setItem(KEY, token);
  };

  /** Remove token from locale storage. */
  export const removeToken = () => {
    localStorage.removeItem(KEY);
  };

  /** Get token from locale storage. */
  export const getTokenFromStorage = () => localStorage.getItem(KEY);
}
