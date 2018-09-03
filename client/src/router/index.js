import Vue from 'vue'
import Router from 'vue-router'

// Pages
const Dashboard = () => import('@/pages/Dashboard')
const Profile = () => import('@/pages/Profile')
const Matches = () => import('@/pages/Matches')
const Clubs = () => import('@/pages/Clubs')

// Settings
const AccountSettings = () => import('@/pages/settings/AccountSettings')
const ProfileSettings = () => import('@/pages/settings/ProfileSettings')

// Account
const AccountSocialSuccess = () => import('@/pages/account/social/Success')
const AccountConfirmation = () => import('@/pages/account/Confirm')
const ResetPassword = () => import('@/pages/account/ResetPassword')
const Register = () => import('@/pages/account/Register')
const Login = () => import('@/pages/account/Login')

// Training
const Scoreboard = () => import('@/pages/training/Scoreboard')

// Components (for testing)
const Camera = () => import('@/components/Camera')

// Errors
const PageNotFound = () => import('@/errors/PageNotFound')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // Tools
    {
      path: '/components/camera',
      name: 'CameraComponent',
      component: Camera
    },
    // Training
    {
      path: '/training/scoreboard',
      name: 'TrainingScoreboard',
      component: Scoreboard
    },
    // Clubs
    {
      path: '/clubs',
      name: 'Clubs',
      component: Clubs
    },
    // Matches
    {
      path: '/matches',
      name: 'Matches',
      component: Matches
    },
    // Social auth
    {
      path: '/account/social/success',
      name: 'AccountSocialSuccess',
      component: AccountSocialSuccess
    },
    // Profile
    {
      path: '/profile',
      name: 'ProfileSettings',
      component: ProfileSettings,
      meta: { requiresAuth: true }
    },
    {
      path: '/@:username',
      name: 'Profile',
      component: Profile
    },
    // Account
    {
      path: '/account/confirm',
      name: 'AccountConfirmation',
      component: AccountConfirmation
    },
    {
      path: '/account/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/account',
      name: 'AccountSettings',
      component: AccountSettings,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // Root
    {
      path: '/',
      name: 'Root',
      component: Dashboard
    },
    {
      path: '*',
      name: 'FourOhhFour',
      component: PageNotFound
    }
  ]
})
