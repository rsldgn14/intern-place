import {useRouter} from "next/router";
import {useEffect} from "react";

export function Index() {
    const router = useRouter()

    useEffect(()=> {

      router.push("/dashboard")

    },[])


  return (
   ""
  );
}

export default Index;


