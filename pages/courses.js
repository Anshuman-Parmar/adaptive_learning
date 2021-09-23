import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import cookies from "js-cookie"
import jwt from 'jsonwebtoken'

export class courses extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            createCourse:false,
        }
        this.createCourse=this.createCourse.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    async onSubmit(e){
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/createcourse', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:this.state.name,
            })
        })

        const res2 = await res.json()
        if(res2.error){
            console.log(res2.error)
        }
    }
    createCourse(){
        this.setState({createCourse:true})
    }

    componentDidMount(){
        const token = cookies.get("token")
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
}
    
    render() {
        return (
            <>
            <Navbar/>
            <div>
                <button className={this.state.isTeacher?"createcoursebutton":"hidden"} onClick={this.createCourse}>Create Course</button>
                <form onSubmit={this.onSubmit}>
                    <input placeholder="Name of Course" type="text" className={this.state.createCourse?"createcourseinput":"hidden"} onChange={(e)=>{this.setState({name:e.target.value})}}></input>
                    <button type="submit" className={this.state.createCourse?"createcoursesubmit":"hidden"}>Save</button>
                </form>
            </div>
            </>
        )
    }
}

export default courses
