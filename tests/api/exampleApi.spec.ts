import { test, expect } from "@playwright/test";

test.describe("@API example", () => {
    const baseURL="https://reqres.in"
  test("@API status endpoint returns 200", async ({ request }) => {
    const response= await request.get(`${baseURL}/api/users/2`)
    const body=await response.json()
    console.log(body.data.id)
    expect(response.status()).toBe(200)
    expect(body.data.id).toBe(2)

  });
  test("post call api", async ({request})=>{
    const reqbody={
        "name": "morpheus",
        "job": "leader"
      }
    const response= await request.post(`${baseURL}/api/users`,{data:reqbody})
    console.log(response.status())
    console.log(await response.json())

    const genid=await response.json()
    console.log(genid.id)
    
  });
  test("post auth",async ({request})=>{
    const response=await request.post(`${baseURL}/api/register`,{
        headers:{
            "Content-Type": "application/json"
        },
        data:{
            
                "email": "eve.holt@reqres.in",
                "password": "pistol"
              
        }
    })
    const body=await response.json()
    console.log(body.token)
  })
  
});

