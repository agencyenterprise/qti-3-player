import type { Meta, StoryObj } from "@storybook/react";
import { VueQtiItemWrapper } from "./components/vue/VueQtiItemWrapper";
import { docsExample, mathQuestion, planetsQuestion, modalFeedbackQuestion } from "./shared/examples";

const meta = {
  title: "Vue/QtiItem",
  component: VueQtiItemWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    xml: {
      control: "text",
      description: "QTI 3.x XML string",
    }
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