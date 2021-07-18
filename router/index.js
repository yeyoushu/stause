import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'
import home from '@/views/home'
import Management from '@/views/Management'
import catagorys from '@/views/catagorys'
import poroducts from '@/views/poroducts'
import supply from '@/views/supply'
import supplier from '@/views/supplier'
import supplierv from '@/views/supplierv'
import Purchase from '@/views/Purchase'
import suppliermodify from '@/views/suppliermodify'
import suppPurchase from '@/views/suppPurchase'
import registration from '@/views/registration'
import rgn from '@/views/rgn'
import customermen from '@/views/customermen'
import sales from '@/views/sales'
import salesadd from '@/views/salesadd'
import salesedit from '@/views/salesedit'
import salesabout from '@/views/salesabout'
import storage from '@/views/storage'
import inquiry from '@/views/inquiry'
import stock from '@/views/stock'
import collectmoney from '@/views/collectmoney'
import expenditure from '@/views/expenditure'
import mpurchasing from '@/views/mpurchasing'
import msales from '@/views/msales'
import missue from '@/views/missue'
import mwarehousing from '@/views/mwarehousing'
import minventory from '@/views/minventory'
import mexpenditure from '@/views/mexpenditure'

import settlement from '@/views/settlement'




Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        {
          path: '/Management',
          name: 'Management',
          component: Management,
        },
        {
          path: '/catagorys',
          name: 'catagorys',
          component: catagorys,
        },
        {
          path: '/poroducts',
          name: 'poroducts',
          component: poroducts,
        },
        {
          path: '/supply',
          name: 'supply',
          component: supply,
        },
        {
          path: '/supplier',
          name: 'supplier',
          component: supplier,
         },
         {
          path: '/supplierv',
      name: 'supplierv',
      component: supplierv,
        },
        {
          path: '/Purchase',
      name: 'Purchase',
      component: Purchase,
        },
        {
          path: '/suppliermodify/:id/:value',
      name: 'suppliermodify',
      component: suppliermodify,
        },
        {
          path: '/suppPurchase',
      name: 'suppPurchase',
      component: suppPurchase,
        },
        {
          path: '/registration',
      name: 'registration',
      component: registration,
        },
        {
          path: '/rgn',
      name: 'rgn',
      component: rgn,
        },
        {
          path: '/customermen',
      name: 'customermen',
      component: customermen,
        },
        {
          path: '/sales',
      name: 'sales',
      component: sales,
        },
        {
          path: '/salesadd',
      name: 'salesadd',
      component: salesadd,
        },
        {
          path: '/salesedit/:id/:value',
      name: 'salesedit',
      component: salesedit,
        },
        {
          path: '/salesabout',
      name: 'salesabout',
      component: salesabout,
        },
        {
          path: '/storage',
      name: 'storage',
      component: storage,
        },
        {
          path: '/inquiry',
      name: 'inquiry',
      component: inquiry,
        },
        {
          path: '/stock',
      name: 'stock',
      component: stock,
        },
        {
          path: '/collectmoney',
      name: 'collectmoney',
      component: collectmoney,
        },
        {
          path: '/expenditure',
      name: 'expenditure',
      component: expenditure,
        },
        {
          path: '/settlement',
      name: 'settlement',
      component: settlement,
        },
        {
          path: '/mpurchasing',
      name: 'mpurchasing',
      component: mpurchasing,
        },
        {
          path: '/msales',
      name: 'msales',
      component: msales,
        },
        {
          path: '/missue',
      name: 'missue',
      component: missue,
        },
        {
          path: '/mwarehousing',
      name: 'mwarehousing',
      component: mwarehousing,
        },
        {
          path: '/minventory',
      name: 'minventory',
      component: minventory,
        },
        {
          path: '/mexpenditure',
      name: 'mexpenditure',
      component: mexpenditure,
        },
      ]
    },
  ]
  
})
