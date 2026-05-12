import PageWrapper from "@/components/PageWrapper";
import styles from '@/styles/Question.module.scss';
// 1. 引入 useRouter
import { useRouter } from 'next/router';

import {getQuestionById} from '@/services/question';
import {getComponent} from '@/components/QuestionComponent';
import { postAnswer } from '@/services/answer'; // 确保路径正确

type PropType = {
  errno:number,
  data?:{
    _id:string,
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

export default function Question(props: PropType) {
  const {errno,data,msg=''}=props
  const router = useRouter(); // 2. 初始化路由实例

  //数据错误
  if(errno!==0){
    return <PageWrapper title='错误' >
      <h1 style={{marginTop:'0'}}>错误</h1>
      <p>{msg}</p>
    </PageWrapper>
  }

  const {_id:id,title='',desc='',isDeleted,isPublished,componentList=[]}=data||{}
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止浏览器默认跳转提交

    // 2. 提取表单数据
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    // 3. 关键：组装后端需要的格式
    const { questionId, ...answers } = rawData;
    const answerList = Object.keys(answers).map(key => ({
      componentId: key,
      value: answers[key]
    }));

    try {
      // 4. 调用你写的 postAnswer (它会发送 JSON)
      const res = await postAnswer({
        questionId,
        answerList
      });

      if (res.errno === 0) {
        // 3. 核心修改：前端主动控制跳转
        // alert('提交成功！'); // 如果觉得弹窗烦可以注释掉
        router.push('/success');
      }
      else {
        // 如果后端报错，跳到失败页
        router.push('/fail');
      }
    } catch (error) {
      console.error('提交失败', error);
      router.push('/fail');
    }
  };
  

  return (
    <PageWrapper title={title} desc={desc}>
      {/* 修改点：去掉 action，改用 onSubmit */}
      <form onSubmit={handleSubmit}>
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
