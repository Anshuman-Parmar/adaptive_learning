import React, { Component } from 'react'
import cookies from 'js-cookie'
import  jwt  from 'jsonwebtoken'
import Navbar from '../../components/Navbar'
import Question from '../../components/Question'
export class id extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            score:0,
            name:"",
            questions:[]
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.fetchQuiz=this.fetchQuiz.bind(this)
        this.submitQuiz=this.submitQuiz.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
        this.changeScore=this.changeScore.bind(this)
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
        if(this.state.ans1 && this.state.ans2 && this.state.ans3 && this.state.ans4 && this.state.question1){
        const question1 = await {
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
            ],point:this.state.point
        }
        this.setState(prevState => ({
            questions: [...prevState.questions,question1]
        }))
            console.log(this.state.questions);
            const res = await fetch(`/api/${this.state.createorupdate}quiz`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({courseId:this.state.courseId,name:this.state.name,questions:this.state.questions,_id:this.state._id})
            })
            const res2 = await res.json()
            alert(res2.message)
            window.location.reload()
        }
        else{
            alert("question and answers required to save")
        }
        
        
    }
    submitQuiz(){
        alert(this.state.score)
        window.location.reload()
    }
    addQuestion(){
        this.setState({addQuestion:true})
    }
    changeScore(){
        if(this.state.currentAnswerIsCorrect){
            this.setState(prevState=>({score:prevState.score+this.state.currentQuestionPoint}))
        }
        else{
            this.setState(prevState=>({score:prevState.score-this.state.currentQuestionPoint}))
        }
    }
    render() {
        
        {   if(this.state.isTeacher){
                return(
                    <>
                    <Navbar/>
                    <div>
                    <form onSubmit={this.onSubmit}>
                    <input placeholder="Name of Quiz" type="text" value={this.state.name} className="createcourseinput" onChange={(e)=>{this.setState({name:e.target.value})}}></input>                                      
                    <div className={this.state.addQuestion?"addnewquestion":"hidden"}>
                        <input className="question1" placeholder="question" type="text" onChange={(e)=>{this.setState({question1:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans1checkbox:true})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans1:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans2checkbox:true})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans2:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans3checkbox:true})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans3:e.target.value})}}></input>
                        <input  type="checkbox" className="anscheckbox" onChange={(e)=>{if(e.target.value == "on"){this.setState({ans4checkbox:true})}}}></input>
                        <input className="answer"  placeholder="answer" type="text" onChange={(e)=>{this.setState({ans4:e.target.value})}}></input>
                        <input  placeholder="points" className="points" type="text" onChange={(e)=>{this.setState({point:parseInt(e.target.value)})}}></input>
                    </div>
                    <button type="submit" className="createcoursesubmit">Save</button>
                    </form>
                    <button className={this.state.addQuestion?"hidden":"addquestion"} onClick={this.addQuestion}>Add Question</button>
                    </div>
                    <div>
                        {this.state.questions.map((element)=>{

                            return(
                                <Question question={element} isTeacher={this.state.isTeacher}/>
                            )
                        })}
                    </div>
                    </>
                    )
            }
            
            else{
                return(
                    <div>
                        <h1 className="text-center text-7xl">{this.state.name.toUpperCase()} QUIZ</h1>
                        {this.state.questions.map((element)=>{

                            return(
                                <div className="questioncontainer">
                                <h1 className="questiontext">{element.name}</h1>
                                {element.answers.map((element)=>{
                                    return(<>
                                        <input type="checkbox" className="studentcheckbox" onChange={(e)=>{if(e.target.value=="on" && element.isCorrect){this.setState(prevState=>({score:prevState.score+1}))}else{this.setState(prevState=>({score:prevState.score-1}))}}}></input>
                                        <h2 className="answerstudenttext">{element.name}</h2>
                                        </>
                                        )
                                    })}         
                            </div>
                            )
                        })}
                        <button className="quizendbutton" onClick={this.submitQuiz}>Save</button>
                        
                    </div>
                )
            }
        }
        
    }
}

export default id
