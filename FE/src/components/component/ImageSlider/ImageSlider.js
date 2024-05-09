import React, { useState, useEffect } from 'react';
import SlideShow1 from '../../../assets/img/photos/slideshow1.jpg';
import SlideShow2 from '../../../assets/img/photos/slideshow2.jpg';
import image1 from '../../../assets/img/photos/slideshow3.jpg';
import styles from './SlideShow.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const images = [SlideShow1, SlideShow2, image1];

export default function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false); // Thêm state để theo dõi hiệu ứng

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true); // Khi thay đổi ảnh, bắt đầu hiệu ứng transition
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
        setTransitioning(false); // Kết thúc hiệu ứng transition sau khi thay đổi xong
      }, 500); // Thời gian transition là 0.5 giây, tùy chỉnh cho phù hợp với transition của bạn
    }, 4000);
    return () => clearInterval(timer);
  }, [currentImageIndex]);

  return (
    <div className={cx('slideshow-content')}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          style={{
            width: '100%',
            height: '100%',
            opacity: index === currentImageIndex ? 1 : 0,
            transition: transitioning ? 'none' : 'opacity 0.5s ease-in-out', // Tạm dừng transition khi đang trong quá trình thay đổi ảnh
          }}
          alt=""
        />
      ))}
      <button
        onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
        className={cx('button-left')}
      >
        <p>{'<'}</p>
      </button>
      <button
        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
        className={cx('button-right')}
      >
        <p>{'>'}</p>
      </button>
    </div>
  );
}
