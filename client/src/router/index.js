import Vue from 'vue'
import Router from 'vue-router'

// Pages
const Dashboard = () => import('@/pages/Dashboard')
const Profile = () => import('@/pages/Profile')
const Matches = () => import('@/pages/Matches')

// Account
const AccountSocialSuccess = () => import('@/pages/account/social/Success')
const AccountConfirmation = () => import('@/pages/account/Confirm')
const AccountProfile = () => import('@/pages/account/Profile')
const Account = () => import('@/pages/account/Account')
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
      path: '/account/profile',
      name: 'AccountProfile',
      component: AccountProfile
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
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
