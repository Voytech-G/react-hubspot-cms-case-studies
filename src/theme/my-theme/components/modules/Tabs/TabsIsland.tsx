import { useState, useId } from 'react';
import type { TabItem } from './types.ts';
import '../../../styles/theme.css';
import styles from './Tabs.module.css';

type TabsIslandProps = {
  items: TabItem[];
};

export default function TabsIsland({ items }: TabsIslandProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();

  return (
    <div className={styles.tabs}>
      <div className={styles.tablist} role="tablist">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-controls={`${baseId}-panel-${index}`}
              aria-selected={isActive}
              className={styles.tab}
              onClick={() => setActiveIndex(index)}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== activeIndex}
          className={styles.panel}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
