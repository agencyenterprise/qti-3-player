import type { Meta, StoryObj } from "@storybook/react";
import { QtiItem } from "./components/react/QtiItem";
import { exampleQtiXml } from "./shared/example-qti";

const meta = {
  title: "React/QtiItem",
  component: QtiItem,
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
} satisfies Meta<typeof QtiItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    xml: exampleQtiXml,
  },
};

export const WithCallbacks: Story = {
  args: {
    xml: exampleQtiXml,
    onResponseChange: (responses) => {
      console.log("Responses changed:", responses);
    },
    onAssessmentResult: (result) => {
      console.log("Assessment result:", result);
    },
  },
};
