import PageWrapper from "@/components/PageWrapper";
import styles from '@/styles/Question.module.scss';
import {getQuestionById} from '@/services/question';
import {getComponent} from '@/components/QuestionComponent';

type PropType = {
  errno:number,
  data?:{
    id:string,
    title:string,
    desc?:string,
    js?:string,
    css?:string,
    isPublished:boolean,
    isDeleted:boolean,
    componentList:Array<any>,
  },
  msg?:string,
};

//临时引用
import QuestionInput from "@/components/QuestionComponent/QuestionInput";
import QuestionRadio from "@/components/QuestionComponent/QuestionRadio";

export default function Question(props: PropType) {
  const {errno,data,msg=''}=props

  //数据错误
  if(errno!==0){
    return <PageWrapper title='错误' >
      <h1 style={{marginTop:'0'}}>错误</h1>
      <p>{msg}</p>
    </PageWrapper>
  }

  const {id,title='',desc='',isDeleted,isPublished,componentList=[]}=data||{}
  //问卷已被删除
  if(isDeleted){
    return <PageWrapper title={title} desc={desc}>
      <h1 style={{marginTop:'0'}}>{title}</h1>
      <p>问卷已被删除</p>
    </PageWrapper>
  }
  //问卷未发布
  if(!isPublished){
    return <PageWrapper title={title} desc={desc}>
      <h1 style={{marginTop:'0'}}>{title}</h1>
      <p>问卷未发布</p>
    </PageWrapper>
  }

  //遍历组件
  const ComponentListElem =<>
    {componentList.map(c=>{
      const ComponentElem=getComponent(c)
      return <div key={c.fe_id} className={styles.componentWrapper}>
        {ComponentElem}
      </div>
    })}
  </>
  

  return (
    <PageWrapper title={title} desc={desc}>
      <form method="POST" action="/api/answer">
        <input type="hidden" name="questionId" value={id} />
        
        {ComponentListElem}

        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
}

//http://localhost:3000/question/1523 C端H5的url规则

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;

  //根据id await 获取问卷数据
  const data= await getQuestionById(id)

  return {
    props:data
  };
}
