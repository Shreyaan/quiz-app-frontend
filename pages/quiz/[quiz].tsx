import axios from "axios";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { QuestionsWithoutQuestions } from ".";
import { api_url } from "../../utils/config";
import { errorHandler } from "../../utils/errorHandler";
import Link from "next/link";

const QuizPage = () => {
  const router = useRouter();
  const quizId = router.query.quiz as string;

  const [authToken, setAuthtoken] = useLocalStorage("authToken", "");
  const [quiz, setQuiz] = useState<QuestionsWithoutQuestions>();

  useEffect(() => {
    if (!authToken) {
      Router.push("/");
    } else {
      if (!quizId) {
        return;
      }
      var config = {
        method: "get",
        url: api_url + "/quiz/" + quizId,
        headers: {
          Authorization: "Bearer " + authToken,
        },
      };

      axios(config)
        .then(function (response: { data: QuestionsWithoutQuestions[] }) {
          setQuiz(response.data as unknown as QuestionsWithoutQuestions);
        })
        .catch(function (error: any) {
          errorHandler(error);
        });
    }
  }, [quizId]);

  return (
    <div>
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
                  <Link href="./">Home</Link>
                </li>
                {/* <li>
                  <a>Navbar Item 2</a>
                </li> */}
              </ul>
            </div>
          </div>
          {quiz && (
        <div className="hero  bg-base-200">
          <div className="hero-content flex-col">
            <div>
              <h1 className="text-5xl font-bold"> {quiz.Name} Quiz </h1>
              <p className="py-6">Created by - {quiz.created_by}</p>
              <img
                src={quiz.image}
                className=" md:max-w-sm rounded-lg shadow-2xl mx-auto my-5 mb-10 max-h-64 max-w-[90vw]"
              />
              {quiz.questions &&
                quiz.questions.map((question, index) => {
                  return (
                    <div>
                      <p>
                        Q{index + 1} {question.question}
                      </p>
                      {/* <ul>
                    {question.options.map((option) => {
                        return <li>{option}</li>;
                    })}
                    </ul> */}
                      <div className="my-4">
                        <p>a : {question.options.a}</p>
                        <p> b : {question.options.b} </p>
                        <p> c : {question.options.c}</p>
                        <p> d : {question.options.d}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100">
          <li>
                  <Link href="./">Home</Link>
                </li>
          </ul>
        </div>
      </div>
    
    </div>
  );
};

export default QuizPage;
