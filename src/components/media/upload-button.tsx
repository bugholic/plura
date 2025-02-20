"use client";

import { useModal } from "@/providers/modal-provider";
import React from "react";
import { Button } from "../ui/button";
import CustomModal from "../global/custom-modal";
import UploadMediaForm from "../forms/upload-media";

type Props = {
  subaccountId: string;
};

const MediaUploadButton = ({ subaccountId }: Props) => {
  const { isOpen, setOpen, setClose } = useModal();

  return (
    <Button
    className="!bg-blue-500 !text-white"
      onClick={() => {
        setOpen(
          <CustomModal
            title="Uplaod Media"
            subheading="Upload a file to your media bucket"
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomModal>
        );
      }}
    >Upload</Button>
  );
};

export default MediaUploadButton;
