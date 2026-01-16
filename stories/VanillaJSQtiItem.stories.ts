import type { Meta, StoryObj } from "@storybook/react";
import { VanillaQtiItemWrapper } from "./components/vanilla/VanillaQtiItemWrapper";
import { docsExample, mathQuestion, planetsQuestion } from "./shared/examples";

const meta = {
  title: "Vanilla JS/QtiItem",
  component: VanillaQtiItemWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    xml: {
      control: "text",
      description: "QTI 3.x XML string",
    },
    onResponseChange: {
      action: "responseChanged",
      description: "Callback fired when user responses change",
    },
    onAssessmentResult: {
      action: "assessmentResult",
      description: "Callback fired when assessment is processed",
    },
  },
} satisfies Meta<typeof VanillaQtiItemWrapper>;

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
