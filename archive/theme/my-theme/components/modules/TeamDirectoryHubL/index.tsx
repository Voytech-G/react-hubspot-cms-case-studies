import {
  ModuleFields,
  NumberField,
  TextField,
} from '@hubspot/cms-components/fields';
import { PeopleGrid } from '../../shared/PeopleGrid/PeopleGrid.tsx';
import type { Person } from '../../shared/PeopleGrid/types.ts';

type TeamDirectoryHubLFields = {
  heading: string;
  limit: number;
  tableId: string;
};

type HublData = {
  people: Person[];
};

type ComponentProps = {
  fieldValues: TeamDirectoryHubLFields;
  hublData?: HublData;
};

export function Component({ fieldValues, hublData }: ComponentProps) {
  const { heading, limit } = fieldValues;
  const people = hublData?.people ?? [];

  return <PeopleGrid heading={heading} people={people.slice(0, limit)} />;
}

export const hublDataTemplate = `
  {% set rows = hubdb_table_rows(module.tableId) %}
  {% set people = [] %}
  {% for row in rows %}
    {% do people.append({
      "id": row.hs_id,
      "name": row.name,
      "email": row.email,
      "company": row.company
    }) %}
  {% endfor %}
  {% set hublData = {
    "people": people
  } %}
`;

export const fields = (
  <ModuleFields>
    <TextField name="heading" label="Heading" default="Our team" />
    <NumberField name="limit" label="Number of people to show" default={6} />
    <TextField name="tableId" label="HubDB table ID" default="2439850228" />
  </ModuleFields>
);

export const meta = {
  label: 'Team Directory (HubDB / HubL)',
};
