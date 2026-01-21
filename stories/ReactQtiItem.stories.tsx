import type { Meta, StoryObj } from '@storybook/react';
import { QtiItem } from '@qti-renderer/react';
import {
  docsExample,
  mathQuestion,
  planetsQuestion,
  modalFeedbackQuestion,
  inlineFeedbackQuestion,
  unlimitedChoicesQuestion,
} from './shared/examples';

const meta = {
  title: 'React/QtiItem',
  component: QtiItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    xml: {
      control: 'text',
      description: 'QTI 3.x XML string',
    },
  },
} satisfies Meta<typeof QtiItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    xml: docsExample,
  },
};

export const MathQuestion: Story = {
  args: {
    xml: mathQuestion,
  },
};

export const PlanetsQuestion: Story = {
  args: {
    xml: planetsQuestion,
  },
};

export const ModalFeedbackQuestion: Story = {
  args: {
    xml: modalFeedbackQuestion,
  },
};

export const InlineFeedbackQuestion: Story = {
  args: {
    xml: inlineFeedbackQuestion,
  },
};

export const UnlimitedChoicesQuestion: Story = {
  args: {
    xml: unlimitedChoicesQuestion,
  },
};
