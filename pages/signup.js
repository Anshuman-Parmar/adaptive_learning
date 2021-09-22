import React, { Component } from 'react'
import Navbar from '../components/Navbar'
export class signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:"",
             password:"",
             email:"",
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(e){
        e.preventDefault()
        
    }
    render() {
        return (
            <>
                <Navbar/>
                <div className="loginform flex justify-center">
                <form onSubmit={this.onSubmit} className="flex flex-col">
                <div className="flex justify-evenly teacherstudentselector">
                            <span className={this.state.teacherSelector?"":"selected"} onClick={()=>this.setState({teacherSelector:false})}>Student</span>
                            <span className={this.state.teacherSelector?"selected":""} onClick={()=>this.setState({teacherSelector:true})}>Teacher</span>
                        </div>
                    <input type="text" placeholder="Full Name" onChange={(e)=>this.setState({password:e.target.value})}></input>
                    <input type="text" placeholder="Email" onChange={(e)=>this.setState({password:e.target.value})}></input>
                    <input type="password" placeholder="Password" onChange={(e)=>this.setState({password:e.target.value})}></input>
                    <button type="submit" className="bg-blue-500">Signup</button>

                </form>
                </div>
            </>
        )
    }
}

export default signup
