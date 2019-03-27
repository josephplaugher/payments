import Ajax from "./Ajax";
import SetUrl from "./SetUrl";

const checkLoginState = () => {
  return new Promise((resolve, reject) => {
    const AppCoToken = sessionStorage.getItem("AppCoToken");
    //console.log('appco token', AppCoToken)
    if (AppCoToken !== null) {
      Ajax.get(SetUrl() + "/checkLoginState")
        .catch(e => {
          reject("error checking login state: ", e);
        })
        .then(headers => {
          //console.log('headers, ', headers.token)
          //console.log('authorized: ', headers.authorized)
          if (
            typeof headers.token !== "null" &&
            headers.authorized !== "false"
          ) {
            let userData = JSON.parse(sessionStorage.getItem("AppCoPmtsUser"));
            sessionStorage.setItem("AppCoPmtsToken", headers.token);
            resolve({
              isLoggedIn: true,
              userData: userData
            });
          } else {
            console.log("not authorized");
            sessionStorage.removeItem("AppCoPmtsUser");
            sessionStorage.removeItem("AppCoPmtsToken");
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
