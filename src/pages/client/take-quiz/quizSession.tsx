import { apiClient } from "@/api/axiosClient"
import Quiz from "@/components/fragments/client/quizsession/quiz"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function QuizSessionPage(){
    const [quizData,setQuizData]=useState([])
    const {type,testId}=useParams()
    const data=useQuery({queryKey:['quiz-session',type,testId],queryFn:async()=>{
        const res =await apiClient.get(`/get-all-question/${type}/${testId}`)
        setQuizData(res.data.data)
                    return res.data.data
    }})
    useEffect(()=>console.log(quizData),[quizData,data])
    return (
<Quiz/>
    )
}