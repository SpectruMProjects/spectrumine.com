import type { Meta, StoryObj } from '@storybook/react'
import Products from '@/components/Products'
import { HatProductSkeleton } from '@/components/Products/Hat'
import { BrowserRouter } from 'react-router-dom'

const meta = {
  title: 'Components/Products/Hat',
  component: Products.Hat,
  tags: ['autodocs'],
  parameters: { actions: { argTypesRegex: '^on.*' } }
} satisfies Meta<typeof Products.Hat>
export default meta

type Story = StoryObj<typeof meta>

function render(props: any) {
  return (
    <BrowserRouter>
      <Products.Hat {...props} />
    </BrowserRouter>
  )
}

export const Default: Story = {
  args: {
    hat: {
      id: 'id',
      name: 'Имя',
      description: 'Описание описание описание описание описание описание',
      price: '300',
      previewUrl: '/images/logo.png',
      objUrl: '/models/test_hat.obj',
      mtlUrl: '/textures/test_hat.mtl'
    }
  },
  render
}

export const NoPreview: Story = {
  args: {
    hat: {
      id: 'id',
      name: 'Имя',
      description: 'Описание описание описание описание описание описание',
      price: '300',
      objUrl: '/models/test_hat.obj',
      mtlUrl: '/textures/test_hat.mtl'
    }
  },
  render
}

export const Skeleton = {
  render() {
    return <HatProductSkeleton />
  }
}
