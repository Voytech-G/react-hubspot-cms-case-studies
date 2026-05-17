import { useState } from 'react';
import type { AccordionItem } from './types.ts';
import '../../../styles/theme.css';
import styles from './Accordion.module.css';

type AccordionIslandProps = {
  items: AccordionItem[];
};

export default function AccordionIsland({ items }: AccordionIslandProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div className={styles.item} key={index}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              onClick={() => toggleItem(index)}
            >
              <span>{item.heading}</span>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && <div className={styles.panel}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
