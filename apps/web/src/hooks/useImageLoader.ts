// useImageLoader.js
import { useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';
import styled from 'styled-components';

const useImageLoader = (imageUrl: string) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      // Handle error if needed
      setLoaded(false);
    };
    img.src = imageUrl;
    setImage(img);
    setLoadStarted(true);

    return () => {
      // Cleanup if component unmounts before image loads
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  return { isLoaded, isLoadStarted, image  };
};

export const ImageWrapper = styled.div`
  position: relative;
`;

export const StyledBlurhash = styled(Blurhash)`
  z-index: 20;
  position: absolute !important;
  top: 0;
  left: 0;
`;

export default useImageLoader;