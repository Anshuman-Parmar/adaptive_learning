import dbConnect from "../../helpers/dbconnect"
import course from "../../models/course"


dbConnect()
export default async(req, res)=>{
    try{if(!req.body.name){
        return res.status(422).json({error:"Course Name is Compulory"})
    }
    else{
        console.log(course.name);
        // const newCourse = await new course({
        //     name: req.body.name,       
        // }).save()
        // console.log(newCourse)
        // res.status(201).json({message:"Course submit successful"})
    }}
    catch(err){
        console.log(err);
    }
}
