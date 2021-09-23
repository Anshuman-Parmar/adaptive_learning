import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
        courseId:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        questions:[
            {
                name:{
                    type:String,
                    required:false
                },
                answer:[
                    {
                        name:{
                            type:String,
                            required:false
                        },
                        isCorrect:{
                            type:Boolean,
                            required:false
                        }

                    }
                ],
                point:{
                    type:Number,
                    required:false,
                    default:1
                }
            }
        ]

    },

    {timestamps: true
})

export default mongoose.models.quiz || mongoose.model('quiz', quizSchema)