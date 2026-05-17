import { Island } from '@hubspot/cms-components';
import type { AccordionItem } from './types.ts';
import AccordionIsland from './AccordionIsland.tsx?island';
import {
  ModuleFields,
  RepeatedFieldGroup,
  TextField,
} from '@hubspot/cms-components/fields';

type AccordionFields = {
  items: AccordionItem[];
};

type ComponentProps = {
  fieldValues: AccordionFields;
};

export function Component({ fieldValues }: ComponentProps) {
  const { items } = fieldValues;

  return (
    <Island
      module={AccordionIsland}
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
      label="Accordion items"
      occurrence={{ min: 1, max: 20, default: 3 }}
      default={[
        { heading: 'First item', content: 'Content of the first item' },
        { heading: 'Second item', content: 'Content of the second item' },
        { heading: 'Third item', content: 'Content of the third item' },
      ]}
    >
      <TextField
        name="heading"
        label="Heading"
        default="Item heading"
        required
      />
      <TextField
        name="content"
        label="Content"
        default="Item content"
        required
      />
    </RepeatedFieldGroup>
  </ModuleFields>
);

export const meta = {
  label: 'Accordion',
};
