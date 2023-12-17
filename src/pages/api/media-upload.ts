import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send({
      error: 'Method Not Allowed',
    });
    return null;
  }

  try {
    const fileStr = req.body.data;
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      transformation: {
        quality: 'auto', // Adjusts the quality for size optimization
        fetch_format: 'auto', // Converts to a format like WebP for size efficiency
        // You might need to add more transformations based on the file type and requirements
      },
    });

    res.status(200).json({
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Something went wrong',
    });
  }
}
