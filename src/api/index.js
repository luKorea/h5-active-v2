import { request } from "@/request";

export const userLogin = (data) => {
  return request.post({
    url: `/api/doll/user/phone/login?no=${data.no}&pwd=${data.pwd}`,
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
