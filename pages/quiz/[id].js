import React, { Component } from 'react'
import cookies from 'js-cookie'
import  jwt  from 'jsonwebtoken'
import Navbar from '../../components/Navbar'
export class id extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.fetchQuiz=this.fetchQuiz.bind(this)
    }
    async fetchQuiz(){
        const quiz = await fetch("/api/getquiz",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({courseId:this.state.quiz.courseId})
        })
        if(quiz){            
            const res2 = await quiz.json()
            console.log(res2)
        }
            
    }
    componentDidMount(){
        const token = cookies.get("token")
        const id = window.location.href.substr(-24)
        this.setState({quiz:{courseId:id,}})
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
        const res = await fetch("/api/createquiz",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({courseId:this.state.quiz})
        })
    }
    render() {
        
        {   if(this.state.isTeacher){
                return(
                    <>
                    <Navbar/>
                    <div>
                    <form onSubmit={this.onSubmit}>
                    <input placeholder="Name of Quiz" type="text" value={this.state.quiz.name} className="createcourseinput" onChange={(e)=>{this.setState({quiz:{name:e.target.value}})}}></input>                                      
                    <button type="submit" className="createcoursesubmit">Save</button>
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
