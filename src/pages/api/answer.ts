import type { NextApiRequest, NextApiResponse } from "next";

import { postAnswer } from "@/services/answer";


function genAnswerInfo(reqBody:any){
  const answerList:any =[]

  Object.keys(reqBody).forEach((key)=>{
    if(key==='questionId') return
    answerList.push({
      componentId:key,
      value:reqBody[key]
    })
  })

  return {
    questionId:reqBody.questionId||'',
    answerList,
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if(req.method !== "POST"){
    res.status(200).json({errno:-1,msg:"method 错误"})
  }
  //获取并格式化表单数据，提交到服务端mock
  const answerInfo = genAnswerInfo(req.body)
  //console.log(answerInfo)

  try{
    //提交到服务端mock
    const resData=await postAnswer(answerInfo)
    if(resData.errno===0){
      //提交成功
      res.redirect('/success')
    }else{
      //提交失败
      res.redirect('/fail')
    }
  }catch(err){
    res.status(200).json({errno:-1,msg:"提交失败"})
    res.redirect('/fail')
  }
}
