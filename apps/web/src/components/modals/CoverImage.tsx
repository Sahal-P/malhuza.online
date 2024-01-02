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
        uploadToS3({ file, id: document.id, key, isCover: true }),
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
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
