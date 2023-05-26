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

  words: {
    unknownError: string
    top: string
  }

  messages: {
    unknownErrorOccurred: string
    userNotFound: string
    incorrectPassword: string
    accountNotActivated: string
    accountWithSameNicknameAlreadyExists: string
    accountWithSameEmailAlreadyExists: string
    accountWithSameNicknameNotExistsInMojang: string
    invalidForm: string
    codeExpired: string
  }

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
    successRegister: string
    change: string
    login: string
    'noAccount?': string
    'hasAccount?': string
    'forgotPassword?': string

    email: {
      placeholder: string
      checkMailbox: string
      rules: {
        required: string
        valid: string
      }
    }

    password: {
      placeholder: string
      newPlaceholder: string
      rules: {
        required: string
        between(min: number, max: number): string
        mustContainNumbersAndUppercase: string
      }
    }

    identifier: {
      placeholder: string
      rules: {
        required: string
      }
    }

    username: {
      placeholder: string
      rules: {
        required: string
        between(min: number, max: number): string
        latinAndNumbers: string
      }
      warnings: {
        noMojangAccount: string
      }
    }
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

  inventoryCms: {
    inventory: string
  }

  hardcoreTop: {
    cantLoad: string
    lastTime: string
  }
}
