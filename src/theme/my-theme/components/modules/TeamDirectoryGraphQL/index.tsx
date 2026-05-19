import {
  ModuleFields,
  NumberField,
  TextField,
} from '@hubspot/cms-components/fields';
import { PeopleGrid } from '../../shared/PeopleGrid/PeopleGrid.tsx';
import type { Person } from '../../shared/PeopleGrid/types.ts';

type TeamDirectoryGraphQLFields = {
  heading: string;
  limit: number;
};

type HubDbRow = {
  hs_id: number;
  name: string;
  email: string;
  company: string;
};

type DataQueryResult = {
  data?: {
    HUBDB?: {
      team_members_collection?: {
        items: HubDbRow[];
      };
    };
  };
};

type ComponentProps = {
  fieldValues: TeamDirectoryGraphQLFields;
  dataQueryResult?: DataQueryResult;
};

export function Component({ fieldValues, dataQueryResult }: ComponentProps) {
  const { heading, limit } = fieldValues;

  const items =
    dataQueryResult?.data?.HUBDB?.team_members_collection?.items ?? [];

  const people: Person[] = items.map((row) => ({
    id: row.hs_id,
    name: row.name,
    email: row.email,
    company: row.company,
  }));

  return <PeopleGrid heading={heading} people={people.slice(0, limit)} />;
}

const teamMembersQuery = `
  query teamMembers {
    HUBDB {
      team_members_collection {
        items {
          hs_id
          name
          email
          company
        }
      }
    }
  }
`;

export const query = teamMembersQuery;

export const fields = (
  <ModuleFields>
    <TextField name="heading" label="Heading" default="Our team" />
    <NumberField name="limit" label="Number of people to show" default={6} />
  </ModuleFields>
);

export const meta = {
  label: 'Team Directory (GraphQL / HubDB)',
};
