import type { Meta, StoryObj } from '@storybook/react'
import { HatProductsPreviewComponent as HatProductsPreview } from '@/pages/HatProductsPreview'
import { HatProduct } from '@/models'

const meta = {
  title: 'Pages/HatProductsPreview',
  component: HatProductsPreview,
  tags: ['autodocs']
} satisfies Meta<typeof HatProductsPreview>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hat: new HatProduct(
      '0',
      '999 руб',
      'hat name',
      'description',
      'models/cat.gltf'
    )
  }
}
