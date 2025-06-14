# Pokemons (React Next js Fullstack)
Посмотреть на [Netlify](https://virtanen-pokemon-next-ts.netlify.app/)

## 📚 Описание

Это SRR приложение, разработанное с использованием React, Next.js и TypeScript, которое отображает покемонов.
Данные получаются из открытого [Pokemon API](https://pokeapi.co/). 
Приложение позволяет пользователям регистрироваться и логиниться, просматривать список покемонов, детальную информацию о каждом покемоне, а также отмечать лайком и добавлять в избранное.

## 🚀 Функциональность
- **Авторизация с помощью сервиса Auth0**: регистрация и логин пользователей через форму Auth0 с возможностью регистрации через соцсети.
- **Список покемонов**: отображение по 20 карточек покемонов. На каждой карточке изображение покемона, имя, общие данные и кнопки: добавить в любимые, добавить в избранное, посмотреть подробнее. Внизу списка расположена кнопка загрузить еще покемонов. Загрузка происходит по 20 покемонов.
- **Поиск**: возможность поиска покемона по его имени.
- **Фильтрация и сортировка**: возможность отбора покемонов по росту, весу, типу, способностям, а также сортировка по имени по возрастаниюи и по убыванию.
- **Адаптивный дизайн**: интерфейс оптимизирован для различных устройств.

## 🛠️ Используемые технологии

- **React Next.js**: основной фреймворк для создания пользовательского интерфейса.
- **Axios**: для выполнения HTTP-запросов к API.
- **Auth0**: для авторизации пользователей.
- **MongoDB Atlas**: для хранения данных о пользователе (почта, имя, список любимых покемонов и добавленных в избранное)
- **Prisma**: для подключения базы данных.
- **Shadcn, Tailwind, Lucide-React**: для стилизации.

## 🚀 Установка и запуск
1. Клонируйте репозиторий:
   git clone https://github.com/HelenVirtanen/pokemon-react-ts-next
2. Перейдите в папку проекта:
   cd pokemon-react-ts-next
3. Установите зависимости: 
   npm i
4. Запустите приложение:
   npm run start
   
Приложение будет доступно по адресу http://localhost:3000


Дополнительно

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
