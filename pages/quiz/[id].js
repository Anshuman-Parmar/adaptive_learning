import React, { Component } from 'react'
import cookies from 'js-cookie'
import  jwt  from 'jsonwebtoken'
import Navbar from '../../components/Navbar'
export class id extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            courseId:"",
            name:"",
            questions:[{
                name:"",
                answers:[{
                    name:"",
                    isCorrect:false
                }],
                point:1

            }
        ]
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.fetchQuiz=this.fetchQuiz.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
    }
    async fetchQuiz(){
        const quiz = await fetch("/api/getquiz",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({courseId:window.location.href.substr(-24)})
        })
        const res2 = await quiz.json()
        if(res2[0]){
            this.setState({
            name:res2[0].name,
            questions:res2[0].questions,
            createorupdate:"update",
            _id:res2[0]._id
        })
        }
        else{
            this.setState({createorupdate:"create"})
        }
            
        
            
    }
    componentDidMount(){
        const token = cookies.get("token")
        const id = window.location.href.substr(-24)
        this.setState({courseId:id})
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(decoded.userNow.teacherSelector){
                this.setState({isTeacher:true})
            }
        }
        catch(error){
            if(error.message == "invalid token"){
                cookies.remove('token')
                window.location.href="/login"
                
            }
        }
        this.fetchQuiz()
    }
    async onSubmit(e){
        e.preventDefault()
        const question1 = {
            name:this.state.question1,
            answers:[{
                name:this.state.ans1,
                isCorrect:this.state.ans1checkbox
            },{
                name:this.state.ans2,
                isCorrect:this.state.ans2checkbox
            },{
                name:this.state.ans3,
                isCorrect:this.state.ans3checkbox
            },{
                name:this.state.ans4,
                isCorrect:this.state.ans4checkbox
            }
            ],point:parseInt(this.state.point)

        }
        this.setState(prevState => ({
            questions: [...prevState.questions,question1]
        }))
        console.log(this.state);
        // const res = await fetch(`/api/${this.state.createorupdate}quiz`,{
        //     method: "POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({courseId:this.state.courseId,name:this.state.name,questions:this.state.questions,_id:this.state._id})
        // })
        
    }
    addQuestion(){
        this.setState({addQuestion:true})
    }
    render() {
        
        {   if(this.state.isTeacher){
                return(
                    <>
                    <Navbar/>
                    <div>
                    <form onSubmit={this.onSubmit}>
                    <input placeholder="Name of Quiz" type="text" value={this.state.name} className="createcourseinput" onChange={(e)=>{this.setState({name:e.target.value})}}></input>                                      
                    <button className={this.state.addQuestion?"hidden":"addquestion"} onClick={this.addQuestion}>Add Question</button>
                    <div className={this.state.addQuestion?"addnewquestion":"hidden"}>
                        <input className="question1" placeholder="question" type="text" onChange={(e)=>{this.setState({question1:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans1checkbox:true})}else{this.setState({ans1checkbox:false})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans1:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans2checkbox:true})}else{this.setState({ans2checkbox:false})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans2:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans3checkbox:true})}else{this.setState({ans3checkbox:false})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans3:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans4checkbox:true})}else{this.setState({ans4checkbox:false})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans4:e.target.value})}}></input>
                        <input  placeholder="points" className="points" type="text" onChange={(e)=>{this.setState({point:e.target.value})}}></input>
                    </div>
                    <button type="submit" className="createcoursesubmit" onClick={()=>{this.setState({addQuestion:false})}}>Save</button>
                    </form>
                    </div>
                    </>
                    )
            }
            
            else{
                return(
                    <div>
                    </div>
                )
            }
        }
        
    }
}

export default id
