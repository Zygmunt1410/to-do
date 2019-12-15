function getTokenFromStorage() {
  return localStorage.getItem("userToken");
}

function saveTokenToStorage(token) {
  localStorage.setItem("userToken", token);
}

function getBearerTokenHeader() {
  return "Bearer " + getTokenFromStorage();
}

function logout() {
  localStorage.clear();
}

export {
  getTokenFromStorage,
  saveTokenToStorage,
  getBearerTokenHeader,
  logout
};
