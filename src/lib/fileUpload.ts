import useCloudinaryUpload from '../hooks/useCloudinaryUpload';

/**
 * Resizes an image file.
 *
 * @param file The image file to resize.
 * @param maxWidth The maximum width of the resized image.
 * @param maxHeight The maximum height of the resized image.
 * @param callback The function to call with the resized image blob.
 */
const resizeImage = (
  file: Blob,
  maxWidth: number,
  maxHeight: number,
  callback: (resizedBlob: Blob) => void
) => {
  const reader = new FileReader();

  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      // Check if resizing is needed
      let width = img.width;
      let height = img.height;
      let resizeNeeded =
        file.size > 2000001 || width > maxWidth || height > maxHeight;

      if (resizeNeeded) {
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
      }

      if (resizeNeeded) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(callback);
      } else {
        // If no resizing is needed, directly call the callback with the original file
        callback(file);
      }
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
    console.log('running');

    const file = e.target.files[0];

    console.log('file', file);

    if (file) {
      // Resize image and then upload
      resizeImage(file, 1400, 860, resizedBlob => {
        console.log('resizedBlob', resizedBlob);

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
