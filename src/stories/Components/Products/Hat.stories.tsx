import type { Meta, StoryObj } from '@storybook/react'
import Products from '@/components/Products'
import { HatProductSkeleton } from '@/components/Products/Hat'

const meta = {
  title: 'Components/Products/Hat',
  component: Products.Hat,
  tags: ['autodocs'],
  parameters: { actions: { argTypesRegex: '^on.*' } }
} satisfies Meta<typeof Products.Hat>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hat: {
      id: 'id',
      name: 'Имя',
      descriptions: 'Описание описание описание описание описание описание',
      price: '300',
      previewUrl: '/images/bg-main.gif'
    }
  }
}

export const NoPreview: Story = {
  args: {
    hat: {
      id: 'id',
      name: 'Имя',
      descriptions: 'Описание описание описание описание описание описание',
      price: '300'
    }
  }
}

export const Skeleton = {
  render() {
    return <HatProductSkeleton />
  }
}
