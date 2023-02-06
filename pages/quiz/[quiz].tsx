import axios from "axios";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { QuestionsWithoutQuestions } from ".";
import { api_url } from "../../utils/config";
import { errorHandler } from "../../utils/errorHandler";

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
      {quiz && (
       <div className="hero min-h-screen bg-base-200">
       <div className="hero-content flex-col lg:flex-row-reverse">
         <img src={quiz.image}  className="max-w-sm rounded-lg shadow-2xl" />
         <div>
           <h1 className="text-5xl font-bold"> {quiz.Name} Quiz </h1>
           <p className="py-6">Created by - {quiz.created_by}</p>
           
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default QuizPage;
