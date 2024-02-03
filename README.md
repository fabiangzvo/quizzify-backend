# Quizzify Backend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`LOG_LVL` - log level.

`DATABASE_URI` - mongodb host.

`DATABASE_USER` - mongodb user.

`DATABASE_PASS` - mongodb password.

`DATABASE_NAME` - database name.

`JWT_SECRET` - jsonwebtoken secret.

`JWT_EXP_TIME` - jsonwebtoken expire time in ms.

`JWT_ISSUER` - jsonwebtoken issuer.

- Example based on the .env.example file, located in the root of the application.

  ```bash
        LOG_LVL=info
        PORT=3000
        DATABASE_URI=mongodb+srv://your-own-cluster.zekomn0.mongodb.net
        DATABASE_USER=user
        DATABASE_PASS=password
        DATABASE_NAME=databaseName
        JWT_SECRET=3EK6FD+o0+c7tzBNVfjpMkNDi2yARAAKzQlk8O2IKoxQu4nF7EdAh8s3TwpDasdfT6R
        JWT_EXP_TIME=600000
        JWT_ISSUER=issuer
  ```

## Installation

- Clone the project

  ```bash
    git clone https://github.com/fabiangzvo/quizzify-backend.git
  ```

- Go to the project directory

  ```bash
    cd ~/Documents/quizzify-frontend
  ```

- Install dependencies

  ```bash
    npm install || yarn install
  ```

- Start app

  ```bash
    npm run dev || yarn dev
  ```

  And open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Reference

#### Create test

```http
  POST /api/test
```

#### Body of request

| Parameter     | Type              | Mandatory | Description                 |
| :------------ | :---------------- | :-------- | :-------------------------- |
| `title`       | `string`          | X         | Title of quiz               |
| `description` | `string`          | X         | Description of quiz         |
| `questions`   | `Array<Question>` | X         | **Min 10 items.** Questions |

#### Create resume

```http
  POST /api/resume
```

#### Body of request

| Parameter        | Type     | Mandatory     | Description                    |
| :--------------- | :------- | :------------ | :----------------------------- |
| `time`           | `number` | **Required**. | Time taken to solve the test   |
| `correctAnswers` | `number` | **Required**. | Number of correct answers      |
| `rating`         | `number` | **Required**. | Score of quiz                  |
| `test`           | `string` | **Required**. | Solved test ID                 |
| `presentedAt`    | `date`   | **Required**. | Date of submission of the quiz |

#### Get all tests

```http
  GET /api/test
```

#### Response

Array of:

| Parameter     | Type     | Description         |
| :------------ | :------- | :------------------ |
| `id`          | `string` | Id test             |
| `title`       | `string` | Test title          |
| `total`       | `number` | Number of questions |
| `description` | `string` | Test description    |
| `topic`       | `string` | Topic               |

#### Get test by ID

```http
  GET /api/test/:testId
```

#### Response

| Parameter   | Type              | Description |
| :---------- | :---------------- | :---------- |
| `_id`       | `string`          | Id test     |
| `title`     | `string`          | Title       |
| `questions` | `Array<Question>` | Questions   |
| `topic`     | `string`          | Topic       |
| `topic`     | `string`          | Topic       |

#### Get question by ID

```http
  GET /api/question/:questionId
```

#### Response

| Parameter     | Type            | Description          |
| :------------ | :-------------- | :------------------- |
| `_id`         | `string`        | Id question          |
| `description` | `string`        | question description |
| `options`     | `Array<Option>` | Questions            |

## API models

```code
interface Option {
  _id: string;
  description: string;
  createdAt: Date;
  isCorrect: boolean;
  createdAt: Date;
}

interface Question {
  _id: string;
  description: string;
  options: Array<ObjectId> | Array<Option>;
  createdAt: Date;
}

interface Test {
  title: string;
  description: string;
  questions: Array<ObjectId> | Array<Question>;
}
```

## Author

- [@fabiangzvo](https://www.github.com/fabiangzvo)
