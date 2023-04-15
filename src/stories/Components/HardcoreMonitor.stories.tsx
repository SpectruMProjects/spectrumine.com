import type { Meta, StoryObj } from '@storybook/react'
import { HardcoreMonitorComponent } from '@/components/HardcoreMonitor'

const meta = {
  title: 'Components/HardcoreMonitor',
  component: HardcoreMonitorComponent,
  tags: ['autodocs'],
  render({ stats }) {
    return <div style={{ backgroundColor: 'black', padding: 16 }}>
      <HardcoreMonitorComponent
        stats={stats}/>
    </div>
  }
} satisfies Meta<typeof HardcoreMonitorComponent>
export default meta

type Story = StoryObj<typeof meta>

export const Online: Story = {
  args: {
    stats: {
      online: true,
      current: 10,
      max: 20
    }
  }
}

export const Offline: Story = {
  args: { stats: { online: false } }
}

export const Empty: Story = {
  args: { 
    stats: {
      online: true,
      current: 0,
      max: 20
    }
  }
}

export const Full: Story = {
  args: {
    stats: {
      online: true,
      current: 20,
      max: 20
    }
  }
}