import Link from 'next/link';
import router, {useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts';


function Score() {
    const router = useRouter();
const score = router.query.score as string;

const [authToken, setAuthtoken] = useLocalStorage("authToken", "");

useEffect(() => {
    if (!authToken) {
        router.push("/");
    }
}, [authToken]);



  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Score : {score}</h1>
        <p></p>
        <Link className="btn btn-primary my-4" href={'../quiz'}>Go Back</Link>
      </div>
    </div>
  </div>
  )
}

export default Score