<template>

  <el-space :size="20" direction="vertical" wrap fill style="width: 100%">

    <el-card>
      <template #header>
        <span>1. Select some images</span>
      </template>
      <el-upload
        :action="uploadServerUrl"
        :data="uploadServerData"
        ref="uploadRef"
        v-model:file-list="fileList"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeUpload"
        :on-error="handleUploadError"
        :on-success="handleUploadSuccess"
        :auto-upload="true"
        :accept="acceptExtensionString"
        multiple
        drag
      >
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to check</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            {{ acceptExtensionList.join("/") }} files with a size less than 2MB
          </div>
        </template>
      </el-upload>


    </el-card>

    <el-card>
      <template #header>
        <span>2. Choose methods</span>
      </template>

      <el-select
        v-model="selectedMethods"
        placeholder="Select method"
        multiple
        style="width: 70%"
      >
        <el-option-group
          v-for="group in allMethods"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-option-group>
      </el-select>

    </el-card>

  </el-space>


  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

  <el-divider />

  <div class="submit-container">
    <el-button type="primary" size="large" @click="submitUpload" style="width: 60%;">
      Let's check it!
    </el-button>
  </div>


</template>

<script lang="ts" setup>

// TODO IMAGE SELECTION

import { ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadFile, UploadFiles, UploadInstance } from "element-plus";


const uploadRef = ref<UploadInstance>();

const submitUpload = () => {
  uploadRef.value!.submit();
};

import type { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage } from "element-plus";
import { reqQiniuToken } from "@/api/qiniu";

const fileList = ref<UploadUserFile[]>();

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleUploadSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  ElMessage.success("check success! " + response.key);
  console.log(fileList);
  console.log(response.key);
};

const handleUploadError: UploadProps["onError"] = (
  error,
  uploadFile
) => {
  ElMessage.error(error.message);
};

const uploadServerUrl = ref("http://upload-z1.qiniup.com");
const uploadServerData = ref({});

const acceptExtensionList = ["jpg", "jpeg", "png", "gif", "bmp"];
const acceptExtensionString = [...acceptExtensionList, ...acceptExtensionList
  .map(str => str.toUpperCase())].map(str => "." + str).join(", ");


const beforeUpload: UploadProps["beforeUpload"] = async (rawFile) => {
  // console.log(rawFile.type);
  const resp = await reqQiniuToken();
  const { code, message, data } = resp.data;
  if (code != 200) {
    ElMessage.error(message);
    return false;
  }
  const { qiniuToken, uploadUrl } = data;
  uploadServerUrl.value = uploadUrl;
  uploadServerData.value = { "token": qiniuToken };
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("File size can not exceed 2MB!");
    return false;
  }
  return true;
};

// TODO CHECKBOX

const selectedMethods = ref([]);

const allMethods = [
  {
    label: "group 1",
    options: [
      {
        value: "1",
        label: "method 1"
      }
    ]
  },
  {
    label: "group 2",
    options: [
      {
        value: "2",
        label: "method 2"
      }
    ]
  }
];

</script>

<style scoped>
.submit-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>