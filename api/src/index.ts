import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { AppDataSource } from './data-source';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT || 12301;

app.use(bodyParser.json());

// Обработка несуществующих маршрутов
app.use((req: Request, res: Response) => {
  res.status(404).send('Страница не найдена');
});

AppDataSource.initialize().then(() => {
  console.log("Подключение к базе данных прошло успешно!");
  // Запуск сервера
  app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Подключение к базе данных не удалось:", err);
})