export function changeTime(time){
  if(time){
    let oDate = new Date(time),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth()+1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime = oYear +'-'+ getBz(oMonth) +'-'+ getBz(oDay) +' '+ getBz(oHour) +':'+ getBz(oMin) +':'+getBz(oSen);//拼接时间
    return oTime;
  }else{
    return "";
  }
}
//补0
function getBz(num){
  if(parseInt(num) < 10){
    num = '0'+num;
  }
  return num;
}
