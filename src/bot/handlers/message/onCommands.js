import User from "../../../models/User.js";
import { bot } from "../../bot.js";

async function onCommands(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  if (text == "/start") {
    const existingUser = await User.findOne({ chatId: chatId });

    if (!existingUser) {
      const newUser = new User({
        chatId: chatId,
        firstname: firstname,
        username: msg.chat.username,
      });

      newUser.save();
    } else {
      console.log(existingUser);
    }

    return bot.sendMessage(
      chatId,
      `Assalomu aleykum, xush kelibsiz, ${firstname}`
    );
  }

  if (text == "/help") {
    return bot.sendMessage(chatId, `Yordam kerakmi, ${firstname}?`);
  }

  if (text == "/users") {
    const userSoni = await User.countDocuments();

    return bot.sendMessage(chatId, `Foydanuvchilar [${userSoni}]:`);
  }

  return bot.sendMessage(chatId, `Xatolik, buyruq topilmadi... /start bosing!`);
}

export default onCommands;
