import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from 'antd'
import { FooterComponent } from '@/components/Footer'

const meta = {
  title: 'Components/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  parameters: { actions: { argTypesRegex: '^on.*' } },
} satisfies Meta<typeof FooterComponent>
export default meta

type Story = StoryObj<typeof meta>

export const Footer: Story = {
  render({ onClickConditionOfUse, onClickContacts }) {
    return (
      <Layout>
        <FooterComponent 
          onClickConditionOfUse={onClickConditionOfUse}
          onClickContacts={onClickContacts}/>
      </Layout>
    )
  }
}