// 如果在服务端（Node.js），访问 Docker 内部地址
// 如果在客户端（浏览器），访问 Nginx 转发的相对路径 /api
const HOST = typeof window === 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://backend:3005') 
  : '';

export async function get(url:string){
  const res=await fetch(HOST+url)
  const data= await res.json()
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
  const data= await res.json()
  return data
}