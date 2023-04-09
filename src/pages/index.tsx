import { lazy } from 'react'

const Main = lazy(() => import('./Main'))
const NotFound = lazy(() => import('./NotFound'))
const Auth = lazy(() => import('./Auth'))
const Profile = lazy(() => import('./Profile'))
const ActivateRegisterCode = lazy(() => import('./ActivateRegisterCode'))
const HardcoreServer = lazy(() => import('./HardcoreServer'))
const ConditionOfUse = lazy(() => import('./ConditionOfUse'))
const ActivateChangePassCode = lazy(() => import('./ActivateChangePassCode'))

export default {
  Main,
  NotFound,
  Auth,
  Profile,
  ActivateRegisterCode,
  HardcoreServer,
  ConditionOfUse,
  ActivateChangePassCode
}
