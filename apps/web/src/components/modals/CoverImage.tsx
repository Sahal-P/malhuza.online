import { FC, useState } from "react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useS3FileUpload, { useCoverImage } from "@/hooks/useS3FileUpload";
import { SingleImageDropzone } from "../common/SingleImageDropzon";
import { useSelectedDocument } from "@/hooks/useDocuments";
import useUpdateBlurHash from "@/hooks/useUpdateBlurHash";
interface CoverImageModalProps {}

const CoverImageModal: FC<CoverImageModalProps> = () => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const coverImage = useCoverImage();
  const { document, setDocumentCoverImage } = useSelectedDocument();
  const { mutateAsync: encodeImageToBlurhash } = useUpdateBlurHash();
  const { mutateAsync: uploadToS3 } = useS3FileUpload();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };
  const onChange = async (file?: File) => {
    if (file) {
      let key = undefined;
      if (document.cover_image) {
        const url = new URL(document.cover_image);
        const pathname = decodeURIComponent(url.pathname);
        key = pathname.split("/").pop();
        setDocumentCoverImage(null);
      }
      setIsSubmitting(true);
      setFile(file);
      const startTime = performance.now();
      const [BlurHash, s3Response] = await Promise.all([
        encodeImageToBlurhash({ image: file, id: document.id }),
        uploadToS3({ file, id: document.id, key }),
      ]);
      setDocumentCoverImage(s3Response.presigned_url);
      const endTime = performance.now();
      const runtimeInSeconds = (endTime - startTime) / 1000;
      console.log(s3Response.presigned_url, BlurHash);
      console.log(`Runtime: ${runtimeInSeconds} seconds`);
    }
    onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent className="dark:bg-document_bg">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          dropzoneOptions={{ maxSize: 1570000 }}
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
        {/* <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
                <Label>
                    Appearance
                </Label>
                <span className="text-[0.8rem] text-muted-foreground">
                    Customize how Notes looks on your device
                </span>
            </div>
            <ThemeDropDown/>
        </div> */}
        {/* <div className="flex justify-center mt-8">
          <div className="max-w-2xl rounded-lg shadow-xl bg-sidebar">
            <div className="m-4">
              <label className="inline-block mb-2 text-gray-500">
                File Upload
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-gray-400 border-dashed hover:bg-document_bg hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Attach a file
                    </p>
                  </div>
                  <input type="file" className="opacity-0" />
                </label>
              </div>
            </div>
            <div className="flex justify-center p-2">
              <button className="w-full px-4 py-2 text-white bg-document_bg hover:bg-secondary rounded shadow-xl">
                Upload
              </button>
            </div>
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
