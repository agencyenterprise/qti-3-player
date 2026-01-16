import type { Meta, StoryObj } from "@storybook/react";
import { VanillaQtiItem } from "./components/vanilla/QtiItem";
import { exampleQtiXml } from "./shared/example-qti";

const meta = {
  title: "Vanilla JS/QtiItem",
  component: VanillaQtiItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    xml: {
      control: "text",
      description: "QTI 3.x XML string",
    },
  },
} satisfies Meta<typeof VanillaQtiItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    xml: exampleQtiXml,
  },
};

export const CustomXML: Story = {
  args: {
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item
  xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0" 
  identifier="SC_002"
  title="Another Question"
  adaptive="false"
  time-dependent="false">
  <qti-response-declaration identifier="RESPONSE" cardinality="single" base-type="identifier">
    <qti-correct-response>
      <qti-value>CHOICE_A</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  <qti-item-body>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="1">
      <qti-prompt>What is 2 + 2?</qti-prompt>
      <qti-simple-choice identifier="CHOICE_A">4</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_B">3</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_C">5</qti-simple-choice>
      <qti-simple-choice identifier="CHOICE_D">6</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
</qti-assessment-item>`,
  },
};
