import Vue from 'vue'
import Router from 'vue-router'

// Pages
const Dashboard = () => import('@/pages/Dashboard')
const Profile = () => import('@/pages/Profile')
const Matches = () => import('@/pages/Matches')
const MatchesPlay = () => import('@/pages/matches/Play')
const Tournaments = () => import('@/pages/Tournaments')
const Players = () => import('@/pages/Players')
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
const Logout = () => import('@/pages/account/Logout')

// Training
const TrainingOverview = () => import('@/pages/training/Overview')
const TrainingScoreboard = () => import('@/pages/training/Scoreboard')

// Generic components
const Loader = () => import('@/components/Loader')

// Errors
const PageNotFound = () => import('@/errors/PageNotFound')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Tools
    {
      path: '/components/loader',
      name: 'LoaderComponent',
      component: Loader
    },
    // Training
    {
      path: '/training/scoreboard',
      name: 'TrainingScoreboard',
      component: TrainingScoreboard
    },
    {
      path: '/training',
      name: 'TrainingOverview',
      component: TrainingOverview
    },
    // Clubs
    {
      path: '/clubs',
      name: 'Clubs',
      component: Clubs
    },
    // Players
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    // Tournaments
    {
      path: '/tournaments',
      name: 'Tournaments',
      component: Tournaments
    },
    // Matches
    {
      path: '/matches/play/against/:username',
      name: 'MatchesPlayAgainst',
      component: MatchesPlay
    },
    {
      path: '/matches/play',
      name: 'MatchesPlay',
      component: MatchesPlay
    },
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
      path: '/@:username/matches',
      name: 'ProfileMatches',
      component: Profile
    },
    {
      path: '/@:username/tournaments',
      name: 'ProfileTournaments',
      component: Profile
    },
    {
      path: '/@:username/statistics',
      name: 'ProfileStatistics',
      component: Profile
    },
    {
      path: '/@:username/friends',
      name: 'ProfileFriends',
      component: Profile
    },
    {
      path: '/@:username/favorites',
      name: 'ProfileFavorites',
      component: Profile
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
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
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
