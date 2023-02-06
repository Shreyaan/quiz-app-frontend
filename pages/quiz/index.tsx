import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeroText } from "../../components/HeroText";
import { api_url } from "../../utils/config";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { errorHandler } from "../../utils/errorHandler";
import Link from "next/link";

export interface Question {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  answer: string;
}

export interface QuestionsWithoutQuestions {
  Name: string;
  Slug: string;
  image: string;
  created_by: string;
  quizId: string;
  questions?: Question[];
}

function Card({
  Name,
  Slug,
  image,
  created_by,
  quizId,
}: QuestionsWithoutQuestions) {
  return (
    <div className="card w-96 max-w-[90vw] bg-base-100 shadow-xl">
      <figure className="px-10 pt-10 ">
        <img
          src={image}
          alt={Name}
          className="rounded-xl   object-cover h-60   "
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{Name} Quiz</h2>
        <p>Created by {created_by}</p>
        <div className="card-actions">
          <Link className="btn btn-primary" href={`./quiz/${Slug}`}>
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
}

const Quiz: NextPage = () => {
  const [authToken, setAuthtoken] = useLocalStorage("authToken", "");
  const [quiz, setQuiz] = useState<QuestionsWithoutQuestions[]>([]);

  useEffect(() => {
    if (!authToken) {
      Router.push("/");
    } else {
      var config = {
        method: "get",
        url: api_url + "/quiz/",
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };

      axios(config)
        .then(function (response: { data: QuestionsWithoutQuestions[] }) {
          setQuiz(response.data);
        })
        .catch(function (error: any) {
          errorHandler(error);
        });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>quiz app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">Quiz App</div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  <Link href="">My account</Link>
                </li>
                {/* <li>
                  <a>Navbar Item 2</a>
                </li> */}
              </ul>
            </div>
          </div>
          <main className="hero  bg-base-200 ">
            <div className="hero-content flex-col items-center justify-center   ">
              <h1 className="text-3xl font-bold my-8 mt-16">
                {" "}
                Here are all the avaiable quizes. You can even{" "}
                <Link className="link link-primary" href={"./createNewQuiz"}>
                  create a new one
                </Link>{" "}
              </h1>
              <div className="flex flex-row flex-wrap justify-center  items-center gap-4">
                {quiz.map((quiz) => (
                  <Card
                    Name={quiz.Name}
                    Slug={quiz.Slug}
                    image={quiz.image}
                    created_by={quiz.created_by}
                    quizId={quiz.quizId}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100">
          <li>
                  <Link href="">My account</Link>
                </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
