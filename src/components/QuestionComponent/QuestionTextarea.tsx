import React,{FC} from 'react';

import styles from './QuestionTextarea.module.scss';


type PropsType={
  fe_id:string,
  props:{
    title:string,
    placeholder?:string,
  }
}

const QuestionInput: FC<PropsType> = ({fe_id,props}) => {
  const {title,placeholder=''} = props;

  return <>
    <p>{title}</p>
    <div className={styles.textareaWrapper}>
      <textarea name={fe_id} placeholder={placeholder || "请输入问题"} rows={5} />
    </div>
  </>
}

export default QuestionInput; 
