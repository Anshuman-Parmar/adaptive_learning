import React from 'react'

function id(data) {
    return (
        <div>
            {console.log(params)}
        </div>
    )
}

export default id
export async function getServerSideProps(context){
    const {id} = context.query;
    const res = await fetch(`/api/getcourses`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data = await res
    return data
}
