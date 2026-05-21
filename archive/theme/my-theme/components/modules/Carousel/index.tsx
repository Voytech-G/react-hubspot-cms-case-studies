import {
  BooleanField,
  ModuleFields,
  NumberField,
  RepeatedFieldGroup,
  TextField,
} from '@hubspot/cms-components/fields';
import { Island } from '@hubspot/cms-components';
import CarouselIsland from './CarouselIsland.tsx?island';
import type { SlideItem } from './types.tsx';

type CarouselFields = {
  items: SlideItem[];
  autoPlay: boolean;
  intervalMs: number;
};

type ComponentProps = {
  fieldValues: CarouselFields;
};

export function Component({ fieldValues }: ComponentProps) {
  const { items, autoPlay, intervalMs } = fieldValues;

  return (
    <Island
      module={CarouselIsland}
      items={items}
      autoPlay={autoPlay}
      intervalMs={intervalMs}
      hydrateOn="visible"
      wrapperTag="section"
    />
  );
}

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      name="items"
      label="Slides"
      occurrence={{ min: 1, max: 10, default: 3 }}
      default={[
        { title: 'Slide one', content: 'Content of the first slide.' },
        { title: 'Slide two', content: 'Content of the second slide.' },
        { title: 'Slide three', content: 'Content of the third slide.' },
      ]}
    >
      <TextField
        name="title"
        label="Slide title"
        default="Slide title"
        required
      ></TextField>
      <TextField
        name="content"
        label="Slide content"
        default="Slide content"
        required
      ></TextField>
    </RepeatedFieldGroup>
    <BooleanField name="autoPlay" label="Auto-play" default={true} />
    <NumberField name="intervalMs" label="Interval (ms)" default={4000} />
  </ModuleFields>
);

export const meta = {
  label: 'Carousel',
};
