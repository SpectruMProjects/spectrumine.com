type Server = {
  name: string
  description: string
  info: string[]
  icon: string
  url?: string
}

export interface Locale {
  name: string
  code: string

  mainPagePreview: {
    greeting: string
    toServers: string
  }

  servers: {
    SpectruMSteam: Server
    'Hardcore SMP': Server
    'Talent of the Telepath': Server
  }

  forms: {
    register: string
  }

  footer: {
    text: string
    conditionOfUse: string
    contacts: string
    rules: string
  }

  header: {
    main: string
    auth: string
    profile: string
    lang: string
    theme: string
  }

  conditionOfUse: {
    pageTitle: string
    definitions: string
    conditions: [string, string[]][]
  }

  contacts: {
    pageTitle: string
    messengersTitle: string
    messengers: {
      name: string
      link: string
      linkSrc: string
      iconSrc: string
    }[]
    emailsTitle: string
    emails: {
      email: string
      description: string
    }[]
  }

  rules: {
    pageTitle: string
    rules: [string, string[]][]
  }

  activateChangePass: {
    pageTitle: string
    passwordChanged: string
    error: string
    logOutFromAllDevices: string
    changePass: string
    toMain: string
  }

  activateRegisterCode: {
    pageTitle: string
    loadTip: string
  }

  hardcoreServer: {
    pageTitle: string
    ipAddress: string
    points: {
      icon: string
      title: string
      description: string
    }[]
  }

  notFound: {
    pageTitle: string
    text(path: string): string
  }

  profile: {
    pageTitle: string
    needAuth: string
    auth: string
    changePass: string
    logOut: string
    logOutFromAllDevices: string
  }

  userHardcoreStatistics: {
    pageTitle: string
  }

  auth: {
    pageTitle: string
  }

  main: {
    pageTitle: string
  }
}
