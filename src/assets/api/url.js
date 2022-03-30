//这里写请求路径
export default {
  LOGIN:'/login',/*登录系统*/
  SOLDIERSCORE:'/user/getAllSoldierTrainingScore', /*获取所有士兵训练结果*/
  GETNEXTSTEPINFO:'/user/getNextStepInfo', /*轮巡士兵训练信息*/
  GETALLASSESSMENT:'/user/getAllDeduction', /*获取所有的评分规则*/
  ADDASSESSMENT:'/user/addDeduction',
  EDITASSESSMENT:'/user/updateDeduction',
  DELASSESSMENT:'/user/deleteDeduction',
  ADDNEWSOLDIER:'/user/addNewSoldier',
  UPDATESOLDIER:'/user/updateSoldier',
  DELETESOLDIER:'/user/deleteSoldier',
  DOWNLOADEXCEL:'/download/excel',
  UPLOADEXCEL:'/user/excel',
  CONFIRMEXCEL:'/user/excel/confirm',
  UPDATEDEDUCTION:'/user/updateDeduction',
  GETSOLIDERTRAINRECORD:'/user/getSoliderTrainInfo',
  GETALLSOLIDER:'/user/getAllSoldier',
  GETCAMERACONFIGINFO:'/user/getCameraConfigInfo',
  UPDATECAMERACONFIGINFO:'/user/updateCameraConfigInfo',
  GETORGINDATA:'/user/getOriginData',






}
