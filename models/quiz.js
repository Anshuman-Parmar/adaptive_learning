import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    quiz:{
        name:{
            type:String,
            required:true
        },
        questions:[
            {
                name:{
                    type:String,
                    required:true
                },
                answer:[
                    {
                        name:{
                            type:String,
                            required:true
                        },
                        isCorrect:{
                            type:Boolean,
                            required:true
                        }

                    }
                ],
                point:{
                    type:Number,
                    required:true,
                    default:1
                }
            }
        ]

    }
}, 
    {timestamps: true
})

export default mongoose.models.quiz || mongoose.model('quiz', quizSchema)