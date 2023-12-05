"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { MAX_UPLOAD_QUEUE, useUploadQueue } from "./upload-queue";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.progress) {
        useUploadQueue.getState().update(file.name, {
          progress: progressEvent.progress,
        });
      }
    },
  });
};

export const useProcessUpload = () => {
  useEffect(
    () =>
      useUploadQueue.subscribe(({ queue }) => {
        const uploading = queue.filter((item) => item.status === "uploading");
        const pending = queue.filter((item) => item.status === "pending");
        console.log(queue, pending, uploading);
        if (uploading.length < MAX_UPLOAD_QUEUE && pending.length > 0) {
          (async () => {
            try {
              const next = pending[0];
              useUploadQueue
                .getState()
                .update(next.id, { status: "uploading" });
              const file = await next.file.getFile();
              const response = (await uploadImage(file)).data;
              console.log(response);
              useUploadQueue.getState().update(next.id, { status: "done" });
            } catch (err) {
              console.error(err);
            }
          })();
        }
      }),
    []
  );
  return null;
};
