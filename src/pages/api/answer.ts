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
    res.status(405).json({errno:-1,msg:"method 错误"})
  }
  //获取并格式化表单数据，提交到服务端mock
  const answerInfo = genAnswerInfo(req.body)
  console.log('收到表单数据:', answerInfo)

  try{
    //提交到服务端mock
    const resData=await postAnswer(answerInfo)
    if(resData.errno===0){
      // 成功：302 重定向到成功页
      return res.redirect(302, '/success');
    }else{
      // 业务错误
      return res.redirect(302, '/fail');
    }
  }catch(err){
    console.error(err);
    // 运行时错误：直接跳到失败页，不要再发 json 了
    return res.redirect(302, '/fail');
  }
}
