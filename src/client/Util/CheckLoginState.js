import Ajax from "./Ajax";
import SetUrl from "./SetUrl";

const checkLoginState = () => {
  return new Promise((resolve, reject) => {
    const AppCoToken = sessionStorage.getItem(process.env.TOKEN_NAME);
    // console.log("appco token", AppCoToken);
    if (AppCoToken !== null) {
      Ajax.get(SetUrl() + "/checkLoginState")
        .catch(e => {
          reject("error checking login state: ", e);
        })
        .then(headers => {
          console.log("headers, ", headers.token);
          console.log("authorized: ", headers.authorized);
          if (headers.token && headers.authorized) {
            console.log("token env: ", process.env.TOKEN_NAME);
            let userData = JSON.parse(sessionStorage.getItem("AppCoPmtsUser"));
            sessionStorage.setItem(process.env.TOKEN_NAME, headers.token);
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
