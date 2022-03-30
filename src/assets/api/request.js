//这里写请求
import axios from './base'
import url from './url'

/*比如：用户登录判断*/
export function login(cAccount,cPassword,cGrant) {
  return axios.post(url.LOGIN,{cAccount:cAccount,cPassword:cPassword,cGrant:cGrant});
}
/*获取士兵分数*/
export function getAllSoldierTrainingScore() {
  return axios.get(url.SOLDIERSCORE);
}
/*轮巡训练数据*/
export function getNextStepInfo() {
  return axios.get(url.GETNEXTSTEPINFO);
}
/*获取所有的评分规则*/
export function getAllAssessment() {
  return axios.get(url.GETALLASSESSMENT,{});
}
/*新增评分规则      已弃用*/
export function addAssessment(cItem, cRequire, cDeductionScore) {
  return axios.post(url.ADDASSESSMENT,{cItem:cItem,cRequire:cRequire,cDeductionScore:cDeductionScore});
}
/*修改评分规则     已弃用*/
export function editAssessment(cItem, cRequire, cDeductionScore,id) {
  return axios.post(`${url.EDITASSESSMENT}/${id}`,{cItem:cItem,cRequire:cRequire,cDeductionScore:cDeductionScore});
}
/*修改考核标准*/
export function updateDeduction(obj) {
  return axios.post(url.UPDATEDEDUCTION,{obj:JSON.stringify(obj)});
}
/*删除评分规则      已弃用*/
export function delAssessment(id) {
  return axios.post(`${url.DELASSESSMENT}/${id}`);
}
/*新增士兵*/
export function addNewSoldier(cSoldierId,cSoldierName) {
  return axios.post(url.ADDNEWSOLDIER,{cSoldierId:cSoldierId,cSoldierName:cSoldierName});
}
/*修改士兵信息*/
export function updateSoldier(cSoldierId,cSoldierName,cid) {
  return axios.post(`${url.UPDATESOLDIER}/${cid}`,{cSoldierId:cSoldierId,cSoldierName:cSoldierName});
}
/*删除士兵*/
export function deleteSoldier(cid) {
  return axios.post(`${url.DELETESOLDIER}/${cid}`);
}
/*excel导入士兵*/
export function addByUploadExcel(formData) {
  let newInstance = axios.create({
    timeout:50000,
  });
  newInstance.defaults.baseURL = axios.defaults.baseURL;
  return newInstance.post(url.UPLOADEXCEL, formData,{
    headers:{
      "Content-Type":"multipart/form-data",
      'token': localStorage.getItem("token")
    }
  });
}
/*确认Excel添加*/
export function confirmExcel(data) {
  return axios.post(url.CONFIRMEXCEL,{data:JSON.stringify(data)});
}
/*获取士兵训练结果*/
export function getSoliderTrainInfo(soliderId,startDate,endDate) {
  return axios.post(url.GETSOLIDERTRAINRECORD,{soliderId:soliderId,startDate:startDate,endDate:endDate});
}
/*获取所有士兵*/
export function getAllSoldier(){
  return axios.get(url.GETALLSOLIDER);
}
/*获取摄像机IP设置*/
export function getCameraConfigInfo() {
  return axios.get(url.GETCAMERACONFIGINFO);
}
/*修改摄像机IP*/
export function updateCameraConfigInfo(ctype,cip) {
  return axios.post(url.UPDATECAMERACONFIGINFO,{ctype:ctype,cip:cip});
}
/*获取原始数据*/
export function getOriginData(originId) {
  return axios.post(url.GETORGINDATA,{originId});
}
