import {
  ModuleFields,
  RepeatedFieldGroup,
  TextField,
} from '@hubspot/cms-components/fields';
import { Island } from '@hubspot/cms-components';
import TabsIsland from './TabsIsland.tsx?island';
import type { TabItem } from './types.ts';

type TabsFields = {
  items: TabItem[];
};

type ComponentProps = {
  fieldValues: TabsFields;
};

export function Component({ fieldValues }: ComponentProps) {
  const { items } = fieldValues;

  return (
    <Island
      module={TabsIsland}
      items={items}
      hydrateOn="visible"
      wrapperTag="section"
    />
  );
}

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      name="items"
      label="Tabs"
      occurrence={{ min: 1, max: 10, default: 3 }}
      default={[
        { title: 'Tab one', content: 'Content of the first tab.' },
        { title: 'Tab two', content: 'Content of the second tab.' },
        { title: 'Tab three', content: 'Content of the third tab.' },
      ]}
    >
      <TextField name="title" label="Tab title" default="Tab title" required />
      <TextField
        name="content"
        label="Tab content"
        default="Tab content"
        required
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = {
  label: 'Tabs',
};
