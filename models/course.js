import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        quiz_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:false
        }
}, 
    {timestamps: true
})

export default mongoose.models.course || mongoose.model('course', courseSchema)