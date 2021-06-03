export const logout = () => {
  try {
    if (window.localStorage.getItem('userToken')) {
      window.localStorage.setItem('userToken', '');
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
