//const HOST='http://localhost:3001'//服务端mock地址
const HOST='http://localhost:3005'//nest服务端地址

export async function get(url:string){
  const res=await fetch(HOST+url)
  const data=res.json()
  return data
}

export async function post(url:string,body:any){
  const res=await fetch(HOST+url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
  })
  const data=res.json()
  return data
}