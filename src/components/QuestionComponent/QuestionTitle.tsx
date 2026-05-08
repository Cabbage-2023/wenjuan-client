import React,{CSSProperties, FC} from 'react';

type PropsType={
  //不需要fe_id,因为title不提交数据，只渲染就行了
  text:string
  level:number
  isCenter?:boolean
}

const QuestionTitle:FC<PropsType>=({text,level,isCenter})=>{
  //样式
  const style:CSSProperties={}
  if(isCenter) style.textAlign='center'

  if(level===1) return <h1 style={style}>{text}</h1>
  if(level===2) return <h2 style={style}>{text}</h2>
  if(level===3) return <h3 style={style}>{text}</h3>
  if(level===4) return <h4 style={style}>{text}</h4>
  if(level===5) return <h5 style={style}>{text}</h5>
}

export default QuestionTitle