import telegramBotRepository from '../repository/telegram-bot-repository';

class BotModel {
  constructor() {}

  public initializaBot() {
    telegramBotRepository.initializaBot();
  }
}

export default new BotModel();
