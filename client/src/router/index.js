import Vue from 'vue'
import Router from 'vue-router'

// Pages
const Dashboard = () => import('@/pages/Dashboard')
const MatchesList = () => import('@/pages/matches/MatchesList')

// Components (for testing)
const Camera = () => import('@/components/Camera')

// Errors
const PageNotFound = () => import('@/errors/PageNotFound')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/components/camera',
      name: 'CameraComponent',
      component: Camera
    },
    {
      path: '/matches',
      name: 'Matches',
      component: MatchesList
    },
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
