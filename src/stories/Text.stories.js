import { Text } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: {
      options: ['white', 'light', 'dark'],
      control: {
        type: 'select'
      }
    },
    size: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'base', 'small', 'tiny'],
      control: {
        type: 'select'
      }
    }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const H1 = {
  args: {
    children: 'H1 - Lorem Ipsum',
    size: 'h1'
  }
};

export const H2 = {
  args: {
    children: 'H2 - Lorem Ipsum',
    size: 'h2'
  }
};

export const H3 = {
  args: {
    children: 'H3 - Lorem Ipsum',
    size: 'h3'
  }
};

export const H4 = {
  args: {
    children: 'H4 - Lorem Ipsum',
    size: 'h4'
  }
};

export const H5 = {
  args: {
    children: 'H5 - Lorem Ipsum',
    size: 'h5'
  }
};

export const H6 = {
  args: {
    children: 'H6 - Lorem Ipsum',
    size: 'h6'
  }
};

export const Base = {
  args: {
    children: 'Base - Lorem Ipsum',
    size: 'base'
  }
};

export const Small = {
  args: {
    children: 'Small - Lorem Ipsum',
    size: 'small'
  }
};

export const Tiny = {
  args: {
    children: 'Tiny - Lorem Ipsum',
    size: 'tiny'
  }
};
