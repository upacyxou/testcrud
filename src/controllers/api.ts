import { Context } from "koa";
import { Controller, Post, Get, Delete, Put } from "koa-router-ts";
import { UserMessagesModel } from "../models/api";

const db = UserMessagesModel;

@Controller("/api")
export default class {
  @Get("/getMessage")
  async getMessage(ctx: Context) {
    await db.find({}, (err, data) => {
      if (err) console.log("Произошла ошибка при загрузке соообщений");
      ctx.body = data;
    });
  }

  @Post("/sendMessage")
  async sendMessage(ctx: Context) {
    await db.insertMany(ctx.request.body, (err, data) => {
      if (err) console.log("Произошла ошибка при отправке");
    });
  }

  @Delete("/deleteMessage")
  async deleteMessage(ctx: Context) {
    await db.findByIdAndRemove(ctx.request.body, (err, data) => {
      if (err || !data) console.log("Произошла ошибка при удалении");
    });
  }

  @Put("/editMessage")
  async editMessage(ctx: Context) {
    await db.findByIdAndUpdate(
      ctx.request.body._id,
      { text: ctx.request.body.text },
      { new: true },
      (err, data) => {
        if (err) console.log("Произошла ошибка при обновлении сообшения");
      }
    );
  }
}
