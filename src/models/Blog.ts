import mongoose, {Document} from "mongoose"

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    }
})

export interface Iblog extends Document {
    title:string,
    img:string,
    des:string
}

const Blog = mongoose.model<Iblog>("Blog", blogSchema)

export default Blog;