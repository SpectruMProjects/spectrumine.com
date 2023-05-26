import type { Meta, StoryObj } from '@storybook/react'
import { Component as Chat } from '@/components/Chat'

const meta: Meta<typeof Chat> = {
  title: 'Components/Chat',
  component: Chat
}

export default meta
type Story = StoryObj<typeof Chat>

export const Empty: Story = {
  args: {
    locale: {
      chat: 'Чат',
      cantLoad: 'Не удалось загрузить'
    }
  }
}

export const Messages: Story = {
  args: {
    messages: [
      { username: 'Gl3b4ty', time: 1685114279066, text: 'first message' },
      { username: 'Gl3b4ty', time: 1685114289066, text: 'second message' },
      { username: 'Blebik', time: 1685114299066, text: 'message3' },
      { username: 'Gl3b4ty', time: 1685114309066, text: 'message4 f sdf' },
      { username: 'Gl3b4ty', time: 1685114319066, text: '45534rrfg' },
      { username: 'Blebik', time: 1685114329066, text: 'gdfg dgdgdfg' },
      { username: 'Blebik', time: 1685114339066, text: 'fddfdf fdfd' },
      { username: 'Gl3b4ty', time: 1685114349066, text: 'sfkgdkgdkgdm' },
      {
        username: 'Cheburek',
        time: 1685114359066,
        text: 'message message message message message message'
      },
      { username: 'Gl3b4ty', time: 1685114369066, text: 'f' },
      { username: 'Cheburek', time: 1685114379066, text: 'messssage' }
    ],
    locale: {
      chat: 'Чат',
      cantLoad: 'Не удалось загрузить'
    }
  }
}
