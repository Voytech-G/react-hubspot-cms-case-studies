import { useId, useEffect, useState } from 'react';
import type { SlideItem } from './types.ts';
import '../../../styles/theme.css';
import styles from './Carousel.module.css';

type CarouselIslandProps = {
  items: SlideItem[];
  autoPlay: boolean;
  intervalMs: number;
};

export default function CarouselIsland({
  items,
  autoPlay,
  intervalMs,
}: CarouselIslandProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseId = useId();
  const slideCount = items.length;

  function goTo(index: number) {
    setCurrentIndex((index + slideCount) % slideCount);
  }

  useEffect(() => {
    if (!autoPlay || slideCount <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % slideCount);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoPlay, intervalMs, slideCount]);

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slideCount}`}
            id={`${baseId}-slide-${index}`}
            hidden={index !== currentIndex}
          >
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.content}>{item.content}</p>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(currentIndex - 1)}
          aria-label="Previous slide"
        >
          &lsaquo;
        </button>

        <div className={styles.dots}>
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              className={styles.dot}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === currentIndex}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={() => goTo(currentIndex + 1)}
          aria-label="Next slide"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}
