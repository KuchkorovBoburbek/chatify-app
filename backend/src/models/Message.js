import mongoose, { Schema } from "mongoose";


const masssageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    trim: true,
    maxlength:2000
  },
  image: {
    type: String,

  }
}, 
{
    timestamps: true
});

const Message = mongoose.model("Message", masssageSchema); 
export default Message;