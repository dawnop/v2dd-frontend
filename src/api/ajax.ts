// 对 axios 进行二次封装 额外的让 axios 发送请求 有其他的功能
// noinspection JSUnresolvedFunction

import axios from "axios";
import { useUserStore } from "@/stores/user";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";

//  axios.create() 创建新的 axios 实例
const request = axios.create({
  // 配置基础路径和超时限制
  baseURL: "/api",
  timeout: 5000
});
// TODO
// 请求拦截器


request.interceptors.request.use(function(config) {
  NProgress.start();
  // 这个 config 其实就是 请求报文

  // 这里可以添加额外的功能
  // config.headers
  const userStore = useUserStore();
  if (config.url === "/user/login") {
    return config;
  }

  const token = userStore.getToken();
  config.headers = {
    Authorization: `Bearer ${token}`,
    ...config.headers
  };

  // 请求报文一定还要返回去 因为还要继续往下走
  return config;
}, function(error) {
  return Promise.reject(error);

});
// 响应拦截器
request.interceptors.response.use(function(response) {
  NProgress.done();


  return response;
}, function(error) {
  NProgress.done();
  // 统一处理错误请求
  ElMessage.error(error)
  // 可以继续选择处理 也可以不处理
  // return Promise.reject(new Error("Ajax Failed"));
  // 可以选择 中断 promise 链
  return new Promise(() => {
  });
});
export default request;