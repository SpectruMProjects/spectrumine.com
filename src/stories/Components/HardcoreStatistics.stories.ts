import type { Meta, StoryObj } from '@storybook/react'
import { HardcoreStatisticsComponent } from '@/components/HardcoreStatistics'

const meta = {
  title: 'Components/HardcoreStatistics',
  component: HardcoreStatisticsComponent,
  tags: ['autodocs'],
  parameters: { actions: { argTypesRegex: '^on.*' } },
} satisfies Meta<typeof HardcoreStatisticsComponent>
export default meta

type Story = StoryObj<typeof meta>

const now = Date.now()
const hour = 1000*60*60
const day = hour*24

export const WithoutDeaths: Story = {
  args: {
    statistics: {
      deathCount: 0,
      lastServerTime: now - day,
      timeOnServer: day+hour*5
    }
  }
}

export const Empty: Story = {
  args: {
    statistics: {
      deathCount: 0,
      lastServerTime: 0,
      timeOnServer: 0
    }
  }
}

export const OneDeath: Story = {
  args: {
    statistics: {
      deathCount: 1,
      lastServerTime: now - day,
      timeOnServer: 5*day+hour*5,
      lastDeath: {
        issue: 'Причина смерти',
        issuer: 'Инициатор',
        time: now - day,
        respawnTime: now + day
      }
    }
  }
}

export const OldDeath: Story = {
  args: {
    statistics: {
      deathCount: 1,
      lastServerTime: now - day,
      timeOnServer: 5*day+hour*5,
      lastDeath: {
        issue: 'Причина смерти',
        issuer: 'Инициатор',
        time: now - day*2,
        respawnTime: now - day
      }
    }
  }
}

export const ManyDeaths: Story = {
  args: {
    statistics: {
      deathCount: 12443,
      lastServerTime: now - day,
      timeOnServer: 57887*day+hour*5,
      lastDeath: {
        issue: 'Причина смерти',
        issuer: 'Инициатор',
        time: now - day,
        respawnTime: now + day*34
      }
    }
  }
}