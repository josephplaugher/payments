import axios from "axios";

const get = url => {
  const request = axios({
    withCredentials: true,
    method: "get",
    url: url,
    responseType: "json",
    headers: {
      csrf: sessionStorage.getItem(process.env.TOKEN_NAME)
    }
  });
  request.catch(error => console.log("ajax error: " + error));
  return request;
};

const post = (url, formData) => {
  const request = axios({
    withCredentials: true,
    url: url,
    method: "post",
    data: formData,
    responseType: "json",
    headers: {
      csrf: sessionStorage.getItem(process.env.TOKEN_NAME)
    }
  });
  request.catch(error => console.log("ajax error: " + error));
  return request;
};

export default { get, post };
