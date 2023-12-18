import { useState } from 'react';
import toast from 'react-hot-toast';

type CloudinaryReturnType = {
  imageUploadHook: (file: string) => Promise<void>;
  newImageUrl: string | null;
};

const useCloudinaryUpload = (): CloudinaryReturnType => {
  const [newImageUrl, setNewImageUrl] = useState(null);

  const imageUploadHook = async (file: string) => {
    try {
      const response = await fetch('/api/media-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: file,
        }),
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setNewImageUrl(data.url);
    } catch (error) {
      toast.error(`Error uploading image: ${error}`, {});
      console.error('Error uploading to Cloudinary:', error);
    }
  };

  return {
    imageUploadHook,
    newImageUrl,
  };
};

export default useCloudinaryUpload;
