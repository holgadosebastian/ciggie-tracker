import { Button } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline'],
      control: {
        type: 'select'
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Button'
  }
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Button'
  }
};

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Button'
  }
};
