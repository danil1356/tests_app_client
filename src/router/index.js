import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: ()=> import('../views/Home')
  // },

  //  todo ...
  {
    path: '/',
    name: 'Loader',
    component: ()=> import('../views/Loader')
  },
    //TODO сделать хеадер приоритетнее апп
  {
    path: '/app',
    name: 'App',
    component: () => import('../App'),
    children: [
      {
        path: '',
        name: 'appHeader',
        component: () => import('../views/AppHeader'),
        children:[
          {
            path: '/home',
            name: 'home',
            component: ()=> import('../views/Home')
          },
          {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
          },
          {
            path: '/testOne',
            name: 'testOne',
            component: () => import('../components/TestTypeOne')
          },

          {
            path: '/TestCreator',
            name: 'testCreator',
            component: ()=> import('../views/TestCreator')
          },

          {
            path: '/secure',
            name: 'secure',
            component: ()=> import('../components/SecureTest'),
            meta: {
              requiresAuth: true
            }
          },
          {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login')
          },
          {
            path: '/testList',
            name: 'testList',
            component: ()=> import('../views/TestList'),
          },
          {
            path: '/QuestionsCreator/:id',
            name: 'QuestionsCreator',
            component: ()=> import('../views/QuestionsCreator'),
          },
          {
            path: '/PassingTheTest/:id',
            name: 'PassingTheTest',
            component: () => import('../views/PassingTheTest')
          },
          {
            path: '/Registration',
            name: 'Registration',
            component: () => import('../components/Registration')
          },
          {
            path: '/UserPage',
            name: 'UserPage',
            component: ()=>import('../views/UserPage')
          },
          {
            path: '/Error403',
            name: 'Error403',
            component: ()=> import('../views/Errors/Error403Page')
          },
          {
            path: '/RingChart',
            name: 'RingChart',
            component: ()=> import('../components/RingChart')
          }
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
