import Image from "next/image";
import {useRouter} from "next/router";


export default function Logo() {

  const router = useRouter()

  return   <Image style={{cursor:"pointer"}} onClick={() => router.push("/dashboard")} src={"/logo.webp"} alt={"logo"} height={100} width={100}/>

}
