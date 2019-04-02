import Ajax from "./Ajax";
import SetUrl from "./SetUrl";

const checkLoginState = () => {
  return new Promise((resolve, reject) => {
    const AppCoToken = sessionStorage.getItem(process.env.TOKEN_NAME);
    // console.log("appco token", AppCoToken);
    if (AppCoToken) {
      Ajax.get(SetUrl() + "/checkLoginState")
        .catch(e => {
          reject("error checking login state: ", e);
        })
        .then(response => {
          console.log("resp: ", response);
          console.log("token: ", response.headers.token);
          console.log("authorized: ", response.headers.authorized);
          if (response.headers.token && response.headers.authorized) {
            console.log("token env: ", process.env.TOKEN_NAME);
            let userData = JSON.parse(sessionStorage.getItem("AppCoPmtsUser"));
            sessionStorage.setItem(
              process.env.TOKEN_NAME,
              response.headers.token
            );
            resolve({
              isLoggedIn: true,
              userData: userData
            });
          } else {
            console.log("not authorized");
            sessionStorage.removeItem("AppCoPmtsUser");
            sessionStorage.removeItem(process.env.TOKEN_NAME);
            resolve({
              isLoggedIn: false,
              userData: {}
            });
          }
        });
    }
  });
};

export default checkLoginState;
