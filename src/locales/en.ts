import { Locale } from './locale'

const en: Locale = {
  name: 'English',
  code: 'en',

  words: {
    unknownError: 'Unknown error',
    top: 'Rating'
  },

  messages: {
    unknownErrorOccurred: 'Unknown error',
    userNotFound: 'User not found',
    accountNotActivated: "Account doesn't activated",
    incorrectPassword: 'Incorrect password',
    accountWithSameNicknameAlreadyExists: 'User already registered',
    invalidForm: 'Invalid data',
    accountWithSameEmailAlreadyExists: 'Mail already registered',
    accountWithSameNicknameNotExistsInMojang:
      'Username is not licensed by mojang',
    codeExpired: 'Code is expired',
    copied: 'Copied',
    copyFault: 'Failed to copy'
  },

  mainPagePreview: {
    greeting: 'Minecraft Licensed Server Platform',
    toServers: 'To servers'
  },

  servers: {
    SpectruMSteam: {
      name: 'SpectruMSteam',
      description: 'Server with mods. Create and SMP! In development...',
      info: ['No license', 'Mods', 'SMP', 'In development...'],
      icon: '/images/wrench.png'
    },
    'Hardcore SMP': {
      name: 'Hardcore SMP',
      description:
        'Have you dreamed of playing hardcore with your friends? ' +
        'Now your dream has come true! ' +
        'The minimum number of plugins, you pay for your death with time',

      icon: '/images/hcheart.png',
      info: ['1.19.4', 'License', 'Hardcore', 'SMP'],
      url: '/servers/hardcore'
    },
    'Talent of the Telepath': {
      name: 'Talent of the Telepath',
      description: 'A server with spells. In development...',
      icon: '/images/wrench.png',
      info: ['License', 'No SMP', 'In development...']
    }
  },

  forms: {
    register: 'Register',
    successRegister: 'Check your mail for confirm account!',
    change: 'Change',
    login: 'Login',
    'noAccount?': "Didn't have account?",
    'hasAccount?': 'Have account?',
    'forgotPassword?': 'Forgot password?',
    email: {
      placeholder: 'Email',
      checkMailbox: 'Check Email',
      rules: {
        required: 'Mail is required',
        valid: 'Enter valid Email'
      }
    },
    password: {
      placeholder: 'Password',
      newPlaceholder: 'New password',
      rules: {
        required: 'Password is required',
        mustContainNumbersAndUppercase:
          'The password must contain numbers, uppercase and uppercase letters',
        between(min, max) {
          return `The password must be longer than ${min} and shorter than ${max}`
        }
      }
    },
    identifier: {
      placeholder: 'Username or Mail',
      rules: {
        required: 'Username or Mail required'
      }
    },
    username: {
      placeholder: 'Username in minecraft',
      rules: {
        required: 'Username is required',
        between(min, max) {
          return `The usernamе must be longer than ${min} and shorter than ${max}`
        },
        latinAndNumbers:
          'The username must contain only Latin letters and numbers'
      },
      warnings: {
        noMojangAccount: "Account doesn't licensed"
      }
    }
  },

  footer: {
    text: 'The organization has nothing to do with Mojang AB, does not violate the principles of the EULA. All rights to the game belong to Mojang AB. All other content belongs to the "Spectrum"',
    conditionOfUse: 'Condition of use',
    contacts: 'Contacts',
    rules: 'Rules'
  },

  header: {
    main: 'Home page',
    lang: 'Language',
    profile: 'Profile',
    auth: 'Sign in',
    theme: 'Theme'
  },

  conditionOfUse: {
    pageTitle: 'SpectruMine - Condition of use',
    definitions:
      'User, player – An individual using the project. The project is the entire platform, including the website, game servers, launcher, etc.',
    conditions: [
      [
        'Condition of use',
        [
          'This document is the official regulations of the project, any others cannot be called such.',
          'The purpose of these rules is to protect the interests of users and the resource and establish order on all project resources.',
          'Anyone has the right to attend the project if they do not violate the Rules of the project.',
          'By registering on the project, you agree to all the rules of this list, the rights described below and responsibilities.',
          'By registering on the project, you agree to the processing of your personal data by the Administration, that is, performing, among other things, the following actions: processing (including collection, systematization, accumulation, storage, clarification (updating, modification), use, depersonalization, blocking, destruction of personal data).',
          'The right to use all the services of the project is provided by the Administration on a free basis, with the exception of additional functions (purchased on a paid basis and activated by activating additional features in the server version (plugins) of the game), as well as paid passes to paid servers. The use of the free functionality is provided in the current form, without guaranteeing 100% correct operation. Game items, abilities, etc., lost due to improper operation of unpaid services, are not returned.',
          "Payment for additional parts of the software product is made only on the official website of the project, located at spectrumine.com in the currency – the Russian ruble. Funds are credited using the payment aggregator in any currency at the user's location, converted by the aggregator itself into Russian rubles.",
          'When entering a wrong nickname on the site, the administration is not responsible for the consequences of buying something for this nickname.',
          'Since it is not always possible to determine a violation of the rules by the user, the final decision remains with the project Administrators.',
          'The copyright holders of the additional parts of the product are their authors. The use of these parts by the Administration is carried out on the basis of an agreement on free distribution and use.',
          'Ignorance of the Rules does not exempt from responsibility.',
          'The project has nothing to do with Mojang AB. All rights to the game belong to Mojang AB.',
          'All the money received from the players on the platform side is a gratuitous donation for the development of the service and is non-refundable.'
        ]
      ],
      [
        'Rights and obligations of players',
        [
          'The player has the right to use all the opportunities available to him, if they do not violate the Rules of the project.',
          ' The player is fully responsible for the reliability of his password and account access.',
          ' The player is entitled to a voluntary donation.',
          ' The player agrees that the funds spent by him will not be refunded.',
          'Players with various privileges on the server are no different from ordinary players, except for additional cosmetic features and are fully subject to the Rules of the project as well as the Mojang AB EULA.',
          "The player is obliged to report identified bugs and flaws to the Server Administration, in case of intentional concealment of identified bugs and flaws, the Administration has the right to block or completely delete the player's account.",
          'Any player can complain about other players.',
          'The player has the right to file a complaint against the player/moderator'
        ]
      ],
      [
        'Rights and obligations of Moderation (Project Staff)',
        [
          'The moderator is the project management and includes moderation and support.',
          'The Moderator must comply with these Rules.',
          'The moderator is obliged to answer oral questions from the players (except personal ones (help build a house, etc.)), as well as monitor compliance with these Rules.',
          'The Moderator has the right to issue punishment based on these Rules.',
          'When issuing a punishment, the Moderator is obliged to indicate the reason and the rule number.',
          'Moderation is forbidden to issue a penalty if it is not in the rules.',
          'The moderator is forbidden to impersonate the creator, and incite discord towards the Administration.',
          "Moderator's actions aimed at inciting hatred or enmity, as well as at humiliating the dignity of a person or group of persons on the grounds of gender, race, nationality, language, origin, orientation, attitude to religion, as well as belonging to any social group, committed in public, are punishable by removal from office."
        ]
      ],
      [
        'Rights and obligations of the Administration',
        [
          'The project administration may, in exceptional cases, deviate from these Rules and act at its discretion.',
          'The administration does not store user passwords in plain text.',
          'The Administration is not responsible for player accounts, including social engineering, viruses, password selection, etc.',
          "The Administration's decisions are not subject to appeal.",
          'The administration has the right to issue any punishment.',
          'Complaints against the Administration are not accepted.',
          'All funds received by the Administration are a voluntary donation and are non-refundable (clause 2.4).',
          'The Administration has the right to take away privileges and refuse service to players without explaining the reason.',
          'The Administration has the right to change the possibilities of gaming privileges both for the better and for the worse, without any notification.',
          'The interpretation of the site rules is carried out only by the chief Administrators. Any other attempts to interpret the rules in favor of either party are considered incorrect.',
          'The administration has the right not to explain the reasons for blocking accounts.',
          'The administration reserves the right to unilaterally change the current rules with the notification of users through the official community of the project located on the VKontakte resource.',
          'The administration manages the game processes and the entire project - solely at its discretion.',
          'The administration reserves the right to conduct periodic updates of the game world and all statistics (VAPE). VAPE is made by the Administration after the expiration of a time period, after which the normal functioning of the services is impossible, due to the peculiarities of the construction of the gameplay. The duration of the above time period is determined by the administration independently, based on the current state of affairs. VAPE is not a refusal to the user to use paid add-ons, because at the same time there is no revocation of the license for a part of the software product or limitation of the functionality of this part.',
          'The Administration has the right to keep its identity anonymous. Because of this, they have the right not to answer your questions that do not relate to the server.'
        ]
      ]
    ]
  },

  contacts: {
    pageTitle: 'SpectruMine - Contacts',
    messengersTitle: 'Chats',
    messengers: [
      {
        name: 'Telegram - ',
        link: ' Our channel',
        linkSrc: 'https://t.me/spectrumine',
        iconSrc: '/icons/telegram.svg'
      },
      {
        name: 'Discord - ',
        link: 'Our server',
        linkSrc: 'https://discord.gg/w2Ks8HFPDJ',
        iconSrc: '/icons/discord.svg'
      }
    ],
    emailsTitle: 'Support Email',
    emails: [
      {
        email: 'spectruminesup@gmail.com ',
        description: ' - Support'
      }
    ]
  },

  rules: {
    pageTitle: 'SpectruMine - Rules',
    rules: [
      [
        'General',
        [
          "By playing on the SpectruMine server, you hereby agree to all the rules listed below. In case of disagreement, the player undertakes to stop using the project's services.",
          'Ignorance of the rules does not exempt you from responsibility. Hacking your account is not an excuse if you are accused of violating the rules.',
          'The administrator manages the project strictly at his discretion and has the right to punish the player for a reason not specified in the rules and without explanation.',
          'The server is paid, but it is in beta testing, which does not guarantee its correct operation. ',
          'Since it is not always possible to accurately determine the violation of any point of the rules, the final decision remains with the Administrator.',
          'All changes to the rules are agreed with the Administrator and supplemented if they are incomplete or unclear. The rules can be changed at any time without notifying the players.',
          'The moderator, at his discretion, can mitigate or increase the punishment for the player.',
          'Moderator – authorized persons of the administration responsible for maintaining order in all SpectruMine services entrusted to them, observing these Rules and the Rules for the Administration of Servers.' +
            'Moderators do not interpret the rules literally or formally, in controversial issues they are guided only by the purpose of the created rules and common sense considerations. Each controversial situation that has arisen in the Discord server or in the game is resolved strictly individually.'
        ]
      ],
      [
        'Buildings',
        [
          'It is forbidden to build buildings in the form of obscene inscriptions, having the form of something obscene, indecent pictures, and symbols aimed at humiliating and insulting someone.' +
            'Punishment: demolition of the building.'
        ]
      ],
      [
        'Game World',
        [
          'Obscene language, lies, insults, threats in the game world, provocations (on signs, on information boards, etc.) are prohibited.' +
            'Punishment: demolition of the building and ban for 1 day.'
        ]
      ],
      [
        'Grifering',
        [
          "Grifering in its usual sense is PROHIBITED. You can destroy other people's buildings and loot only in the following situations: ",
          'An open and explicit conflict of players operating within the framework of the RP.',
          'Open and explicit clan conflict leading to clan war, other armed conflicts operating within the framework of the RP. ',
          "It is forbidden to fill other people's houses / warps with oil / water, to fill them with sand / gravel.and it's also just messy and pointless to spill water or lava. ",
          "It is forbidden to kill other people's animals(peaceful) if they are in pens and do not belong to the RP conflict. ",
          'It is forbidden to siphon/extract resources from chests (and any other blocks storing resources) belonging to another player.',
          'Grifering is punishable: the first time is 7 days of ban, with relapse - eternal.'
        ]
      ],
      [
        'Chat communication',
        [
          'The main chat language is Russian, Belarusian and English. Communication in other languages in the general chat and transliteration is prohibited and punishable, use BOS. Punishment: mutation for 10 minutes in case of relapse - 1 hour.',
          'Impersonating the Administration, posting Moderator/Administrator teams in the chat is prohibited. Punishment: mutation from 5 hours to 24 hours / ban at the discretion of the Moderator.',
          'It is strictly forbidden to insult other players/Administration. Treat other people with respect. Punishment: mutation from 15 minutes to 48 hours, depending on the severity of the utterance.',
          'It is forbidden to mention (in an insulting/humiliating form) relatives. Punishment: mutation from 15 minutes to eternal.',
          'Prohibited messages: degrading human dignity, sexual nature (sexual acts), inciting ethnic strife, aggressive discussion of politics, threats of violence in real life, threats of ban, discrimination of people on religious or other grounds, propaganda / discussion of Nazism, drugs, alcoholism and tobacco smoking. Punishment: mutation from 15 minutes to 12 hours.',
          'The administration is not obliged to fulfill the wishes of the players, for example, changing the time of day, teleporting to another player, issuing resources/ rights. If you are calling for help, you must definitely indicate the reason for teleportation. Messages like "moder tp pliz" "moder help!" are regarded as Flood and are punished accordingly. You can be seriously punished for being annoying. Punishment: mutation from 15 minutes to 12 hours. With frequent relapses, the mutation lasts up to 24 hours.',
          'Flooding is prohibited. Flood is considered statements that have no semantic load, as well as messages repeated more than three times in a row. The repetition of signs (more than 5 in a row) is equated to a flood. Punishment: mutation from 15 minutes to 12 hours. With frequent relapses, the mutation lasts up to 24 hours.',
          'Advertising of shops/ services / the desire to buy / sell, can be given only once every 5 minutes. Punished by 5.8.',
          'Caps are prohibited in messages (with the exception of abbreviations and names of devices in the game (such as ECHO, MFE, etc.)). Caps — a message consisting entirely (or one of the words of the message) of CAPITAL letters or a large number of them. Punishment: mutation from 15 minutes to 6 hours.',
          'Discrimination of inexperienced players, misinformation, ridicule, sending provocative messages to the chat, interfering with the communication of other players is prohibited. Punishment: mutation for 3 hours, in case of relapse is punished by 5.6.',
          'It is allowed to post links only to well-known resources, such as vk.com , google.com , wikipedia, etc. All other URLs should be sent only in private messages to a certain player. Punishment: mutation for 3 hours, if malware, viruses, phishing sites are detected after clicking on your link, you will be punished according to 6.1.',
          "Attempts to take over someone else's account, to lure out a login / password are punishable. Punishment: eternal ban.",
          'It is prohibited to incite third parties to violate the rules, to substitute players, to tell false information from any player in the third person. Punishment: mut from 15 minutes.',
          'Public criticism/discussion of the actions of the Administrator or the Server Administration is prohibited. In the game, the Administration may first give you a warning that you are violating rule 5.14 and inform you that you will receive mutation if you continue the discussion in the game, and not on the forum. If the player continues, he will receive a mutation. Punishment: warning, then mutation for 1 day.',
          'Public criticism of the project/servers is prohibited. Punishment: mutation from the 1st hour to the eternal ban on all servers, depending on the severity of the statement.',
          'It is forbidden to send false information about the vape. Punishment: mutation for 3 hours.',
          'It is prohibited to post messages that violate state legislation (drug sales, distribution of DP, planning of terrorist acts, mention of organizations/movements banned in the Russian Federation, etc.). Punishment: eternal mutation.'
        ]
      ],
      [
        'Other',
        [
          'It is prohibited in (any form) advertising /hidden advertising of other projects, the use/distribution/discussion/mention of programs, malware, bugs, dupes, bugs, plug-in vulnerabilities, games that give an advantage over other players - "cheating". Punishment: eternal ban.',
          'It is forbidden to write commands used in cheats in the chat. Punishment: mutation for 1 day (relapse - from 3 days of ban).',
          'It is forbidden to use cheats that give an advantage over other players. Punishment: ban from 4 days.',
          'Destabilizing work, creating lags/lag zones, causing server crashes is prohibited and punishable. It is also not desirable to install too many devices, Create mechanisms, residents of huge sizes, etc. (at the discretion of the administration). Punishment: ban from the 1st day to the eternal. Demolition of mechanisms that create lags.',
          'It is forbidden to create accounts for downloading chunks / used for negative purposes (violating the rules of the project). Punishment: if for loading chunks, then ban the twin that was used. If for negative purposes, then ban on the basis of a violated clause from the rules.',
          "It is prohibited to use someone else's account to log into the game, even with the permission of the account owner, as well as providing your account data to another player.Punishment: Warning / ban 1-3 days.",
          'It is forbidden to deceive players and the administration, to mislead. Punishment: ban 5-10 days / eternal.',
          'The player has no right to interfere with the work of the Administration on the server. Punishment: ban for 3 hours.',
          'The player has no right to impersonate the administration or make nicknames similar to the nicknames of Administrators, Moderators, Helpers. Punishment: eternal ban.',
          'It is forbidden to try to cheat the system of blocking your account, to cheat the system of blocking your account. Punishment: ban on the subnet forever.',
          'The player has no right to sell anything on the servers for real currency. It is allowed only in-game sales and exchanges within one server exclusively game resources for game resources. Any sale of donation services in any form is prohibited Punishment: eternal ban.',
          'It is prohibited to use accounts and items for commercial purposes. It is prohibited to sell, buy or offer accounts and items in exchange for items in the game, currency, accounts in other games, services or any other benefits. Punishment: eternal ban. ',
          'If a player randomly gave you a donation service or threw it to you, you are immediately obliged to return the received to the administration. Punishment: ban 5-10 days, withdrawal.',
          'The player has no right to interfere with the comfortable gaming activities of other players. Punishment: ban from 3 hours'
        ]
      ],
      [
        'Rules and regulations for Project Administration',
        [
          'The moderator is a VOLUNTARY assistant to the project administration.',
          'Moderators are chosen by representatives of the administration independently and are not subject to discussion.',
          'The moderator is obliged to comply with all of the above rules and punish players only for the reason indicating the violated rule.',
          'The moderators do not bear any additional obligations to the players, other than those mentioned above, and have every right to refuse to help them.',
          'The server moderator cannot punish or protect the player for personal reasons.',
          'The server moderator is obliged to understand the conflict situations of the players.',
          'The moderator, not understanding the situation, should contact the Administrator to help.',
          'The moderator must always be responsible for what he does on the server.',
          'The server moderator cannot kick, ban, teleport a player without a serious reason.',
          'The server moderator is always obliged to monitor the gameplay on the server.',
          'The moderator should not use the authority for his own purposes.',
          'The moderator is obliged to do good for the good of the server.',
          'The moderator must be competent, sociable and active.',
          'The moderator is obliged to observe censorship and speech norms when communicating with players.',
          'The moderator can be removed from office at any time, without warning.',
          "The moderator must always respond to the Administrators' messages and follow all instructions assigned to them that do not violate the server's norms.",
          'The moderator is obliged to report the malice or conspiracy of any of the staff or players to the chief Administrator of the server.'
        ]
      ]
    ]
  },

  activateChangePass: {
    pageTitle: 'SpectruMine - Confirm password change',
    passwordChanged: 'Password was changed',
    error: 'Password changing error',
    logOutFromAllDevices: 'Logout all devices',
    changePass: 'Change password',
    toMain: 'On home page'
  },

  activateRegisterCode: {
    pageTitle: 'SpectruMine - Confirm register',
    loadTip: 'Confirm register'
  },

  hardcoreServer: {
    pageTitle: 'SpectruMine - Hardcore server',
    ipAddress: 'IP Address',
    points: [
      {
        icon: '/icons/server.svg',
        title: 'About server',
        description:
          'Vanilla gameplay, minimal number of plugins. Only hardcore! Pay for your death with time spent on the server.'
      },

      {
        icon: '/icons/headphones.svg',
        title: 'Voice chat',
        description:
          'There is a PlasmoVoice plugin on the server for voice communication inside the game. Once installed on your client, you will be able to communicate seamlessly using a microphone.'
      },

      {
        icon: '/icons/gears.svg',
        title: 'How is working?',
        description:
          'We have made a plugin that makes it possible to be reborn after the time you spent on the server, because it would be too difficult to die forever.'
      },

      {
        icon: '/icons/discord.svg',
        title: 'Community',
        description:
          'Friendly community. Discord server and other buns. Register and login to the server!'
      }
    ]
  },

  notFound: {
    pageTitle: 'SpectruMine - 404',
    text(path) {
      return `Page${path} not found`
    }
  },

  profile: {
    pageTitle: 'SpectruMine - Profile',
    needAuth: 'You unauthorized',
    auth: 'Sign in',
    changePass: 'Change password',
    logOut: 'Logout',
    logOutFromAllDevices: 'Logout all devices'
  },

  userHardcoreStatistics: {
    pageTitle: 'SpectrumMine - Statistics'
  },

  auth: {
    pageTitle: 'SpectruMine - Authorization'
  },

  main: {
    pageTitle: 'SpectruMine - Minecraft servers'
  },

  inventoryCms: {
    inventory: 'Inventory'
  },

  hardcoreTop: {
    cantLoad: 'Raiting load is failed',
    lastTime: 'Last played on',
    nickname: 'Username',
    deaths: 'Deaths',
    played: 'Time played'
  },

  hardcoreChat: {
    chat: 'Chat',
    cantLoad: 'Failed to load'
  }
}
export default en
