import { useEffect, useState } from 'react';
import '../../../styles/theme.css';
import styles from './CrmContacts.module.css';
import type { Contact, ApiResponse } from './types.ts';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  heading: string;
  limit: number;
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function CrmContactsIsland({ heading, limit }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    const url = `/hs/serverless/crm-contacts?limit=${encodeURIComponent(
      String(limit),
    )}`;

    fetch(url)
      .then(async (res) => {
        const json: ApiResponse = await res.json();
        if (cancelled) return;

        if (!res.ok || json.error) {
          setErrorMessage(json.error ?? `HTTP ${res.status}`);
          setStatus('error');
          return;
        }

        setContacts(json.contacts ?? []);
        setStatus('success');
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorMessage(String(err));
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <span className={styles.badge}>Live</span>
      </div>

      {status === 'loading' && (
        <p className={styles.muted}>Loading contacts...</p>
      )}

      {status === 'error' && (
        <p className={styles.error}>Could not load contacts: {errorMessage}</p>
      )}

      {status === 'success' && contacts.length === 0 && (
        <p className={styles.muted}>No contacts found.</p>
      )}

      {status === 'success' && contacts.length > 0 && (
        <ul className={styles.list}>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.card}>
              <span className={styles.avatar} aria-hidden="true">
                {getInitials(contact.name)}
              </span>
              <p className={styles.name}>{contact.name}</p>
              {contact.company && (
                <p className={styles.company}>{contact.company}</p>
              )}
              {contact.email && (
                <a className={styles.email} href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
