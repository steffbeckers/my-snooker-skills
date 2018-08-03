import Vue from 'vue'
import Router from 'vue-router'

// Pages
const Dashboard = () => import('@/pages/Dashboard')
const Matches = () => import('@/pages/Matches')

// Components (for testing)
const Camera = () => import('@/components/Camera')

// Errors
const PageNotFound = () => import('@/errors/PageNotFound')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/components/camera',
      name: 'CameraComponent',
      component: Camera
    },
    {
      path: '/matches',
      name: 'Matches',
      component: Matches
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
