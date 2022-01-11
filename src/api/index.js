import { request } from "@/request";

export const userLogin = (data) => {
  return request.post({
    url: "/login",
    data: data,
  });
};
export const userRegister = (params) => {
  return request.post({
    url: "/register",
    data: params,
  });
};

export const getInfo = () => {
  return request.get({
    url: "/login",
  });
};
