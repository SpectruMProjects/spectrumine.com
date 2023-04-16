import type { Meta, StoryObj } from '@storybook/react'
import Contacts from '@/pages/Contacts'

const meta = {
  title: 'Pages/Contacts',
  component: Contacts,
  tags: ['autodocs'],
} satisfies Meta<typeof Contacts>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}