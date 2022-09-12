import request from "@/api/ajax";


export const reqUserLogin = (username: string, password: string) => {
  return request({
    url: "/user/login",
    method: "post",
    data: {
      username,
      password
    }
  });
};

export const reqUserLogout = () => {
  return request({
    url: "/user/logout",
    method: "post"
  });
};

export const reqUserInfo = () => {
  return request({
    url: "/user/info",
    method: "get"
  });
};