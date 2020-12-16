# Did the rocket launch yet?

Rocket-Launchet is a bot that guess when the rocket has been launched. The video I used is Falcon Heavy Test Flight.
I use a API to bring this video. This API allow me to chunk a video frame by frame, then I use bisection formulae that allow me to guess when the rocket has been launched.
I leave you the link below to more information.

[FrameX API](https://framex-dev.wadrid.net/api/video/)


### Configuration

- Needs to have a Telegram Token, which you receive from Botfather after create one.

[How do I create a bot](https://core.telegram.org/bots#3-how-do-i-create-a-bot)
- There is a conexion with Firebase Realtime Database, so you will need admin-sdk.json that you can create in Firebase console.
In this code, you will not need to export that json, you just need to create it. Inside of code, firebase admin initializeApp will do everything for you.

[How to setup admin sdk Firebase](https://firebase.google.com/docs/admin/setup#add-sdk)

```typescript
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: '<DOMAIN-URL-DATABASE>',
});
```

- I upload my API to Heroku, which is great because any change you want to do, just pushing changes, deploy automaticly to public server but
There is a little problem. If you use Heroku free server, you machine will get to sleep every 30 min. To solve that I use this [Keep alive Heroku with Kaffeine](http://kaffeine.herokuapp.com/). This ping your website every 30 minutes to keep server awake, you must leave your app sleep 6 hours but you can choose when your app can go to bed! This is really useful for little projects.


### How to use

There are two commands allow right now.

- `/start` Allow you to interact with your bot.

- `/restart` Allow you to restart game at any point.

-  After use one of those, you will respond what bot ask. Type **yes** or **no** if the rocket have been launched, otherwise the bot will ask you the same question again.

### What to improve

Bernard Framework is a good idea to add here. It makes connection between chatbots (Whatsapp, Telegram, etc) and then you can connected to different API if you like.
this will make all project more scalable.

[Bernard Framework](https://github.com/BernardFW/bernard)

### Why I did this

This project it was request by a company to make a test and it was a challenge and I enjoyed doing this.
I will add and improve some this funtionality that I think could be interesting, feel free to use this to make it better and add your ideas too.
