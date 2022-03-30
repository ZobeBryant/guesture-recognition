import Vue from 'vue'
import Router from 'vue-router'
import SuperAdmin from '../components/Main/SuperAdmin'

import Login from '../components/Common/Login'
import SystemIndex from '../components/Functions/SystemIndex'
import Assessment from "../components/Functions/Assessment"
import CameraSet from '../components/Functions/CameraSet'
import Score from '../components/Functions/Score'
import TrainingDynamic from "../components/Functions/TrainingDynamic"
import TrainingStatic from "../components/Functions/TrainingStatic"
import TrainingRecord from '../components/Functions/TrainingRecord'
import TrainingDetail from '../components/Functions/TrainingDetail'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/admin',
      component:SuperAdmin,
      children: [
        {path: 'systemIndex',component: SystemIndex,name:'systemIndex'},
        {path: 'assessment', component: Assessment,name:'assessment'},
        {path: 'cameraSet', component: CameraSet,name:'cameraSet'},
        {path: 'score', component: Score,name:'score'},
        {path: 'training', component: TrainingDynamic,name:'training'},
        {path: 'trainingStatic', component: TrainingStatic, name:'trainingStatic'},
        {path: 'trainingRecord', component: TrainingRecord,name:'trainingRecord'},
        {path: 'trainingDetail', component: TrainingDetail,name:'trainingDetail'},

      ]
    }
  ]
})
