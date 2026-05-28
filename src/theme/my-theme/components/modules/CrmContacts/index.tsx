import {
  ModuleFields,
  NumberField,
  TextField,
} from '@hubspot/cms-components/fields';
import { Island } from '@hubspot/cms-components';
import CrmContactsIsland from './CrmContactsIsland.tsx?island';

type CrmContactsFields = {
  heading: string;
  limit: number;
};

type ComponentProps = {
  fieldValues: CrmContactsFields;
};

export function Component({ fieldValues }: ComponentProps) {
  const { heading, limit } = fieldValues;

  return (
    <Island
      module={CrmContactsIsland}
      heading={heading}
      limit={limit}
      hydrateOn="visible"
      wrapperTag="section"
    />
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="heading" label="Heading" default="Latest contacts" />
    <NumberField name="limit" label="Number of contacts" default={10} />
  </ModuleFields>
);

export const meta = {
  label: 'CRM Contacts (serverless)',
};
