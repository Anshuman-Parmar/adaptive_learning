import React, { Component } from 'react'
import Link from "next/link"
export class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <span><Link href="/"><a className="inline-block">Home</a></Link></span>
                <div>
                <Link href="/login"><a className="mr-7">Login</a></Link>
                <Link href="/signup"><a className="ml-2">Signup</a></Link>
                </div>
            </div>
        )
    }
}

export default Navbar
