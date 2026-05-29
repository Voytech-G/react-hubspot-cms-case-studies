import {
  ChoiceField,
  ImageField,
  ModuleFields,
  RichTextField,
  TextField,
} from '@hubspot/cms-components/fields';
import { RichText } from '@hubspot/cms-components';
import defaultIcon from '../../../assets/sprocket.svg';
import '../../../styles/theme.css';
import styles from './FeatureCard.module.css';

type Alignment = 'left' | 'center';

type FeatureCardFields = {
  icon: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  heading: string;
  alignment: Alignment;
};

type ComponentProps = {
  fieldValues: FeatureCardFields;
};

export function Component({ fieldValues }: ComponentProps) {
  const { icon, heading, alignment } = fieldValues;

  return (
    <article className={styles.card} data-alignment={alignment}>
      <span className={styles.iconWrap}>
        <img
          className={styles.icon}
          src={icon.src}
          alt={icon.alt}
          width={icon.width}
          height={icon.height}
        />
      </span>
      <h3 className={styles.heading}>{heading}</h3>
      <div className={styles.description}>
        <RichText fieldPath="description" />
      </div>
    </article>
  );
}

export const fields = (
  <ModuleFields>
    <ImageField
      name="icon"
      label="Icon"
      default={{ src: defaultIcon, alt: 'Feature icon', width: 48, height: 48 }}
      resizable={false}
    />
    <TextField name="heading" label="Heading" default="Feature Heading" />
    <RichTextField
      name="description"
      label="Description"
      default="<p>Describe the feature here.</p>"
    />
    <ChoiceField
      name="alignment"
      label="Alignment"
      choices={[
        ['left', 'Left'],
        ['center', 'Center'],
      ]}
      default="left"
      display="radio"
    />
  </ModuleFields>
);

export const meta = {
  label: 'Feature Card',
};
