import dbConnect from "../../helpers/dbconnect"
import quiz from "../../models/quiz"
dbConnect()
export default async(req,res)=>{
    console.log(req.body.courseId);
    // try{if(!req.body.quiz.name){
    //     return res.status(422).json({error:"Quiz Name is Compulory"})
    // }
    // else{
    //     const newQuiz = await new quiz({
    //         courseId:req.body.quiz.courseId,
    //         name:req.body.quiz.name,
    //         questions:req.body.quiz.question
    //     }).save()
    //     console.log(newQuiz)
    //     res.status(201).json({message:"Course created successful"})
    // }}
    // catch(err){
    //     console.log(err);
    // }
}