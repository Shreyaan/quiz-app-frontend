import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeroText } from "../components/HeroText";
import { api_url, toastifyConfig } from "../utils/config";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import Link from "next/link";
import { Question } from "./quiz";
import { toast } from "react-toastify";

interface Questions {
  Name: string;
  Slug?: string;
  image: string;
  created_by?: string;
  quizId?: string;
  questions: Question[];
}

const Quiz: NextPage = () => {
  const [authToken, setAuthtoken] = useLocalStorage("authToken", "");
  const [formData, setFormData] = useState({
    Name: "",
    image: "",
    questions: [] as Question[],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

//   const handleQuestionChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const questions = formData.questions.map((question, i) => {
//       if (i === index) {
//         return {
//           ...question,
//           [event.target.name]: event.target.value,
//         };
//       }
//       return question;
//     });
//     setFormData({ ...formData, questions });
//   };

    const handleQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
    ) => {
    const questions = formData.questions.map((question, i) => {
        if (i === index) {
        return {
            ...question,
            question: event.target.value,
        };
        }
        return question;
    });
    setFormData({ ...formData, questions });
    };

    const handleAnswerChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
    ) => {
    const questions = formData.questions.map((question, i) => {
        if (i === index) {
        return {
            ...question,
            answer: event.target.value,
        };
        }
        return question;
    });
    setFormData({ ...formData, questions });
    };




    const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    option: string
    ) => {
    const questions = formData.questions.map((question, i) => {
        if (i === index) {
        return {
            ...question,
            options: {
            ...question.options,
            [option]: event.target.value,
            },
        };
        }
        return question;
    });
    setFormData({ ...formData, questions });
    };


  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { question: "", options: { a: "", b: "", c: "", d: "" }, answer: "" },
      ],
    });
  };

  const removeQuestion = (index: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    if (!authToken) {
      Router.push("/");
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
          <div className="card w-[80vw] lg:w-[40vw]  shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quiz Name</span>
                </label>
                <input
                  name="Name"
                  type="text"
                  placeholder="Quiz Name"
                  className="input input-bordered"
                    onChange={handleChange}
                    value={formData.Name}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Image Link (we will be adding functionality to dicrectly
                    upload an image file real soon. till now please use a
                    service like tenor or imgur and test url)
                  </span>
                </label>
                <input
                  name="image"
                  type="text"
                  placeholder="image link"
                  className="input input-bordered"
                    onChange={handleChange}
                    value={formData.image}
                />
              </div>

              {formData.questions.map((question, index) => (
                <div key={index}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Question {index + 1}</span>
                    </label>
                    <input
                      name="question"
                      type="text"
                      placeholder="Enter question"
                      className="input input-bordered"
                      value={question.question}
                      onChange={(event) => handleQuestionChange(event, index)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option A</span>
                    </label>
                    <input
                      name="a"
                      type="text"
                      placeholder="Enter option A"
                      className="input input-bordered"
                      value={question.options.a}
                      onChange={(event) => handleOptionChange(event, index, "a")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option B</span>
                    </label>
                    <input
                      name="b"
                      type="text"
                      placeholder="Enter option B"
                      className="input input-bordered"
                      value={question.options.b}
                      onChange={(event) => handleOptionChange(event, index, "b")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option C</span>
                    </label>
                    <input
                      name="c"
                      type="text"
                      placeholder="Enter option C"
                      className="input input-bordered"
                      value={question.options.c}
                      onChange={(event) => handleOptionChange(event, index, "c")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Option D</span>
                    </label>
                    <input
                      name="d"
                      type="text"
                      placeholder="Enter option D"
                      className="input input-bordered"
                      value={question.options.d}
                      onChange={(event) => handleOptionChange(event, index, "d")}
                    />
                  </div>

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Answer</span>
                    </label>
                    <select

                        name="answer"
                        className="select select-bordered w-full max-w-xs"
                        value={question.answer}
                        onChange={(event) => handleAnswerChange(event, index)}
                    >
                        <option value="">Select Answer</option>
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                        <option value="d">Option D</option>
                    </select>
                    </div>




                  <button onClick={() => removeQuestion(index)} className="btn btn-error my-4">
                    Remove Question
                  </button>
                </div>
              ))}
              <button className="btn btn-accent" onClick={addQuestion}>Add Question</button>

              <div className="form-control mt-6">
                <button className="btn btn-primary btn-block" onClick={()=>{
                    console.log(formData)

                    var config = {
                        method: 'post',
                        url: api_url + '/quiz/new',
                        headers: { 
                          'Authorization': 'Bearer ' + authToken,
                        },
                        data : formData
                      };
                      
                      axios(config)
                      .then(function (response) {
                        console.log(JSON.stringify(response.data));
                        toast.success("Quiz Created Successfully" , toastifyConfig)
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                      
                }}>
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
