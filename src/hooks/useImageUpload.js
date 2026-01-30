import { useState, useCallback } from 'react';

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function useImageUpload(initialImages = []) {
  const [images, setImages] = useState(initialImages);

  const handleUpload = useCallback((files) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (file.size > MAX_SIZE) {
        alert('גודל התמונה חייב להיות פחות מ-5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = useCallback((index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  const setInitialImages = useCallback((imgs) => {
    setImages(imgs || []);
  }, []);

  return {
    images,
    handleUpload,
    removeImage,
    clearImages,
    setInitialImages
  };
}
