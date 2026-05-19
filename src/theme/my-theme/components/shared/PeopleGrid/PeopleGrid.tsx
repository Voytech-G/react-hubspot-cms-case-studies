import type { Person } from './types.ts';
import '../../../styles/theme.css';
import styles from './PeopleGrid.module.css';

type PeopleGridProps = {
  heading: string;
  people: Person[];
};

export function PeopleGrid({ heading, people }: PeopleGridProps) {
  return (
    <section className={styles.directory}>
      <h2 className={styles.heading}>{heading}</h2>
      <ul className={styles.list}>
        {people.map((person) => (
          <li key={person.id} className={styles.card}>
            <h3 className={styles.name}>{person.name}</h3>
            <p className={styles.company}>{person.company}</p>
            <a className={styles.email} href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
