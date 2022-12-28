import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/editable-span/EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
  title: 'REACT',
  changeTitle: action('Change title')
};

