import type { Meta, StoryObj } from '@storybook/react'
import HatViewer from '@/components/HatViewer'

const meta = {
  title: 'Components/HatViewer',
  component: HatViewer,
  tags: ['autodocs'],
  parameters: { actions: { argTypesRegex: '^on.*' } }
} satisfies Meta<typeof HatViewer>
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mtlUrl: '/textures/test_hat.mtl',
    objUrl: '/models/test_hat.obj'
  }
}
