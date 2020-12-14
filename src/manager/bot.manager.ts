import botModel from '../model/bot.model';

class BotManager {
  constructor() {}

  public inicializeBots() {
    botModel.initializaBot();
  }
}

export default new BotManager();
