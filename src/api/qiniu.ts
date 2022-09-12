import request from "@/api/ajax";


export const reqQiniuToken = () => {
  return request({
    url: "/qiniu/token",
    method: "get",
  })
}