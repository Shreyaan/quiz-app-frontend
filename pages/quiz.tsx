import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeroText } from "../components/HeroText";
import { api_url } from "../utils/config";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
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
}

function Card({
  Name,
  Slug,
  image,
  created_by,
  quizId,
}: QuestionsWithoutQuestions) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
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
          <button className="btn btn-primary">Play Now</button>
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
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col items-center justify-center ">
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
  );
};

export default Quiz;
