import type { Meta, StoryObj } from '@storybook/react';

// import Button from './Button';
import Forms from '../components/forms'

const meta = {
  title: 'Example/Button',
  component: Forms.ChangePass,
  tags: ['autodocs'],
} satisfies Meta<typeof Forms.ChangePass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { }
