import { useState, useEffect } from 'react';

const useImageLoader = (imageUrl: string, alternativeUrl: string): string => {
  const [imageSrc, setImageSrc] = useState<string>(imageUrl);
  console.log(imageUrl);
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageSrc(imageUrl);
    };
    img.onerror = () => {
      setImageSrc(alternativeUrl);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, alternativeUrl]);

  return imageSrc;
};

export default useImageLoader;
