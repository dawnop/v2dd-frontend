import request from "@/api/ajax";


export const reqCheckUpload = () => {
  return request({
    url: "/algorithm/v1/image",
    method: "post",
  })
}