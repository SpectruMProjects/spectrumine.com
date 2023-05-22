import { Locale } from './locale'

const ru: Locale = {
  name: 'Русский',
  code: 'ru',

  mainPagePreview: {
    greeting: 'Платформа лицензионных серверов Minecraft',
    toServers: 'К серверам'
  },

  servers: {
    SpectruMSteam: {
      name: 'SpectruMSteam',
      description: 'Сервер с модами. Create и SMP! В разработке...',
      info: ['Без лицензии', 'Моды', 'SMP'],
      icon: '/images/wrench.png'
    },
    'Hardcore SMP': {
      name: 'Hardcore SMP',
      description:
        'Мечтали поиграть в хардкор с друьзьями? ' +
        'Теперь ваша мечта сбылась! ' +
        'Минимальное количество плагинов, вы платите за свою смерть временем',

      icon: '/images/hcheart.png',
      info: ['1.19.4', 'Лицензия', 'Режим хардкор', 'SMP'],
      url: '/servers/hardcore'
    },
    'Talent of the Telepath': {
      name: 'Талант телепата',
      description: 'Сервер с заклинаниями. В разработке',
      icon: '/images/wrench.png',
      info: ['Лицензия', 'No SMP']
    }
  },

  forms: {
    register: 'Регистрация'
  },

  footer: {
    text: 'Организация не имеет никакого отношения к Mojang AB, не нарушает принципы EULA. Все права на игру принадлежат Mojang AB. Весь остальной контент принадлежит команде "Спектрум".',
    conditionOfUse: 'Условия пользования',
    contacts: 'Наши контакты',
    rules: 'Правила'
  },

  header: {
    main: 'Главная',
    lang: 'Язык',
    profile: 'Профиль',
    auth: 'Войти',
    theme: 'Тема'
  }
}
export default ru
