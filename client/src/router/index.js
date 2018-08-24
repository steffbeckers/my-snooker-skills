import Vue from 'vue'
import Router from 'vue-router'

// Pages
const Dashboard = () => import('@/pages/Dashboard')
const Profile = () => import('@/pages/Profile')
const Matches = () => import('@/pages/Matches')

// Settings
const AccountSettings = () => import('@/pages/settings/Account')
const ProfileSettings = () => import('@/pages/settings/Profile')

// Account
const AccountSocialSuccess = () => import('@/pages/account/social/Success')
const AccountConfirmation = () => import('@/pages/account/Confirm')
const Register = () => import('@/pages/account/Register')
const Login = () => import('@/pages/account/Login')

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
      path: '/@/:username',
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
