import React from 'react';
import ImageGallery from 'react-image-gallery';


export default function Banner2() {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',


    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',

    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <>
      <div className='container h-[150px] mx-auto'>
        <ImageGallery items={images} thumbnailPosition={'right'} slideInterval={4000} />
      </div>
    </>
  )
}