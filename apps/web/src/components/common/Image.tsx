import { useEffect } from "react";
import useImageLoader, {
  ImageWrapper,
  StyledBlurhash,
} from "@/hooks/useImageLoader";
interface ImageProps {
  src: string;
  blurhash?: string | null;
  width: number | string;
  height: number | string;
  className: string;
  alt: string
}

const Image = ({ src, blurhash, width, height, className, alt }: ImageProps) => {
  const { isLoaded, isLoadStarted, image } = useImageLoader(src);
  useEffect(() => {}, [isLoaded]);
  return (
    <ImageWrapper>
      <img
        src={image?.src}
        className={`${className}`}
        width={width}
        height={height}
        alt={alt}
      />
      {!isLoaded && isLoadStarted && blurhash && (
        <StyledBlurhash
          hash={blurhash}
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
