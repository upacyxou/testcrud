import { prop, buildSchema, addModelToTypegoose } from '@typegoose/typegoose';
import { model } from 'mongoose'

class userMessages {
    @prop({ required: true })
    nickname!: string;
  
    @prop({ required: true })
    text!: string;
}
  
const userMessagesSchema = buildSchema(userMessages);
  
const UserMessagesModel = addModelToTypegoose(
    model("UserMessage", userMessagesSchema),
    userMessages
);
  
export { userMessages, UserMessagesModel };


