
const url = "http://localhost:3000/api"



export async function request<Data>(requestUrl: string,init?:RequestInit) {

    const response =  await fetch(`${url}/${requestUrl}`,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...init?.headers,
        },
        credentials: 'include',
        cache: 'default',
        ...init,
    
    }
    )
 

  if( response.status != 204) {
    return response.json()
  }
    return
  }