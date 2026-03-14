export const API = "http://localhost:5000/api/ideas"

export async function analyzeIdea(data:any){

  const res = await fetch(`${API}/validate`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })

  const result = await res.json()

  return result

}