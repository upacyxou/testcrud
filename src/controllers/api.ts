import { Context } from 'koa'
import { Controller, Post, Get, Delete, Put } from 'koa-router-ts'
import { UserMessagesModel } from '../models/api'

const db = UserMessagesModel

@Controller('/api')
export default class {
  @Get('/getMessage')
  async getMessage(ctx: Context) {
    try {
      const allMessages = await db.find({})
      ctx.body = allMessages
    } catch (err) {
      ctx.throw(400, err.message)
    }
  }

  @Post('/sendMessage')
  async sendMessage(ctx: Context) {
    try {
      const sendedMessage = await db.insertMany(ctx.request.body)
      ctx.body = sendedMessage
    } catch (err) {
      ctx.throw(400, err.message)
    }
  }

  @Delete('/deleteMessage')
  async deleteMessage(ctx: Context) {
    try {
      const deletedMessage = await db.findByIdAndRemove(ctx.request.body)
      ctx.body = deletedMessage
    } catch (err) {
      ctx.throw(400, err.message)
    }
  }

  @Put('/editMessage')
  async editMessage(ctx: Context) {
    try {
      const editedMessage = await db.findByIdAndUpdate(ctx.request.body._id, {
        text: ctx.request.body.text,
      })
      if (!editedMessage)
        ctx.throw(404, "Can't find a message. Please, try again.")
      ctx.body = editedMessage
    } catch (err) {
      ctx.throw(400, err.message)
    }
  }
}
