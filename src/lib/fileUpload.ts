import useCloudinaryUpload from '../hooks/use-image-upload';

const resizeImage = (
  file: Blob,
  targetSize: number = 3750000,
  callback: (resizedBlob: Blob) => void,
  reductionFactor: number = 0.95,
  format: string = 'image/jpeg',
  quality: number = 0.95
) => {
  const reader = new FileReader();

  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      const originalAspectRatio = width / height;

      const adjustSize = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          resizedBlob => {
            if (resizedBlob.size > targetSize) {
              width *= reductionFactor;
              height = Math.round(width / originalAspectRatio); // Ensure integer values
              quality = Math.max(0.5, quality * reductionFactor); // Prevent quality from dropping too low
              adjustSize();
            } else {
              callback(resizedBlob);
            }
          },
          format,
          quality
        );
      };

      adjustSize();
    };
    img.src = e.target.result as string;
  };

  reader.readAsDataURL(file);
};

/**
 * Handles the file upload process, including resizing the image.
 *
 * @returns An object containing the imageUploadHook, fileUploadEventHandler, and newImageUrl.
 */
const handleFileUpload = () => {
  const { imageUploadHook, newImageUrl } = useCloudinaryUpload();

  const fileUploadEventHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files[0];

    if (file) {
      // Resize image and then upload
      resizeImage(file, 3750000, resizedBlob => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(resizedBlob);
        fileReader.onloadend = () => {
          imageUploadHook(fileReader.result as string);
        };
      });
    }
  };

  return {
    fileUploadEventHandler,
    newImageUrl,
  };
};

export default handleFileUpload;
