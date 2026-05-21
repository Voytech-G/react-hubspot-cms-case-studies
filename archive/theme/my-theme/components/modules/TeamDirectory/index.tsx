import {
  ModuleFields,
  TextField,
  NumberField,
} from '@hubspot/cms-components/fields';
import type { Person } from '../../shared/PeopleGrid/types.ts';
import { PeopleGrid } from '../../shared/PeopleGrid/PeopleGrid.tsx';

type TeamDirectoryFields = {
  heading: string;
  limit: number;
};

type ServerSideProps = {
  people: Person[];
};

type ComponentProps = {
  fieldValues: TeamDirectoryFields;
  serverSideProps?: ServerSideProps;
};

type RawUser = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

export const getServerSideProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: RawUser[] = await response.json();

  const people: Person[] = data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company.name,
  }));

  return {
    serverSideProps: { people },
    caching: {
      cacheControl: { maxAge: 300 },
    },
  };
};

export function Component({ fieldValues, serverSideProps }: ComponentProps) {
  const { heading, limit } = fieldValues;
  const people = serverSideProps?.people ?? [];

  return <PeopleGrid heading={heading} people={people.slice(0, limit)} />;
}

export const fields = (
  <ModuleFields>
    <TextField name="heading" label="Heading" default="Our team" />
    <NumberField name="limit" label="Number of people to show" default={6} />
  </ModuleFields>
);

export const meta = {
  label: 'Team Directory',
};
