import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 12301;

app.use(bodyParser.json());

// Обработка несуществующих маршрутов
app.use((req: Request, res: Response) => {
  res.status(404).send('Страница не найдена');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
