import type { Meta, StoryObj } from '@storybook/react';
import { VueQtiItemWrapper } from './components/vue/VueQtiItemWrapper';
import {
  docsExample,
  mathQuestion,
  planetsQuestion,
  modalFeedbackQuestion,
  inlineFeedbackQuestion,
  unlimitedChoicesQuestion,
  choiceLayout,
  textEntryInteraction,
  mapResponse,
} from './shared/examples';

const meta = {
  title: 'Vue/QtiItem',
  component: VueQtiItemWrapper,
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
} satisfies Meta<typeof VueQtiItemWrapper>;

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

export const ChoiceLayout: Story = {
  args: {
    xml: choiceLayout,
  },
};

export const TextEntryInteraction: Story = {
  args: {
    xml: textEntryInteraction,
  },
};

export const MapResponse: Story = {
  args: {
    xml: mapResponse,
  },
};
