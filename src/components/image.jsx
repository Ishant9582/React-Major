import React, { useEffect, useState } from 'react';

import { fetchImage } from '../appwrite/config';

const ImageGallery = ({image} ) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      try {
   
        const url = await fetchImage(image);
        setImageURL(url);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    getImage();
  }, [image]);

  
  return (
    <div>
      {imageURL ? (
        <img src={imageURL} alt="Fetched from Appwrite" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageGallery;

