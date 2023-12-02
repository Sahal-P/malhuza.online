import { useEffect } from "react";
import useImageLoader, {
  ImageWrapper,
  StyledBlurhash,
} from "@/hooks/useImageLoader";
interface ImageProps {
  url: string;
  hash: string;
  width: number | string;
  height: number | string;
  Imgclass: string;
  alt: string
}

const Image = ({ url, hash, width, height, Imgclass, alt }: ImageProps) => {
  const { isLoaded, isLoadStarted, image } = useImageLoader(url);
  useEffect(() => {}, [isLoaded]);
  return (
    <ImageWrapper>
      <img
        src={image ? image.src : ""}
        className={Imgclass ? `${Imgclass}` : ""}
        width={width}
        height={height}
        alt={alt}
      />
      {!isLoaded && isLoadStarted && hash && (
        <StyledBlurhash
          hash={hash}
          width={width}
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
    </ImageWrapper>
  );
};

export default Image;
