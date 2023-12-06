"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import axiosRetry from "axios-retry";
import { useEffect } from "react";
import { MAX_UPLOAD_QUEUE, useUploadQueue } from "./upload-queue";

const uploadRequest = axios.create({});

axiosRetry(uploadRequest, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000;
  },
});

const uploadImage = async (file: File, setId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await uploadRequest.post(
    `/photo/upload/${setId}/file`,
    formData,
    {
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
    }
  );
  return data;
};

export const useProcessUpload = (id: string) => {
  useEffect(() => {
    useUploadQueue.setState({ setId: id });
    return () => {
      useUploadQueue.setState({ setId: "" });
    };
  }, [id]);

  useEffect(
    () =>
      useUploadQueue.subscribe(({ queue, setId }) => {
        const uploading = queue.filter((item) => item.status === "uploading");
        const pending = queue.filter((item) => item.status === "pending");
        if (uploading.length < MAX_UPLOAD_QUEUE && pending.length > 0) {
          (async () => {
            const next = pending[0];
            try {
              useUploadQueue
                .getState()
                .update(next.id, { status: "uploading" });
              const file = await next.file.getFile();
              const { data } = await uploadImage(file, setId);
              useUploadQueue
                .getState()
                .update(next.id, { status: "done", data });
            } catch (err) {
              console.error(err);
              useUploadQueue.getState().update(next.id, { status: "error" });
            }
          })();
        }
      }),
    []
  );
  return null;
};
