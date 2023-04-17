import type { Meta, StoryObj } from '@storybook/react'
import HatProductsPreview from '@/pages/HatProductsPreview'

const meta = {
  title: 'Pages/HatProductsPreview',
  component: HatProductsPreview,
  tags: ['autodocs']
} satisfies Meta<typeof HatProductsPreview>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
