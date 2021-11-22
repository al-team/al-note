function funcFlat(arr){
  return arr.reduce((current,curVal)=>{
    const result=current
    if(Array.isArray(curVal)){
      result.push(...funcFlat(curVal))
    }else{
      result.push(curVal)
    }
    return  result
  },[])
}
//