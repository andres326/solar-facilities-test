## About The Project

Facility Management System is a project made to allow users to add, edit, delete and upload performance metrics in CSV format

## Getting Started

### Prerequisites

To run this software locally you need: 
* NodeJS >= v18 
* MongoDB installed locally (or with docker)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/andres326/solar-facilities-test.git
   ```
3. Install libraries on frontend
   ```sh
   cd solar-facilities-frontend
   npm install
   ```
4. Install libraries on backend
   ```sh
   cd solar-facilities-backend
   npm install
   ```

### Running 

#### Backend

To have the project running locally without problems, you will need to create and `.env` file at root directory (solar-facilities-backend) and add the following variables: 

```sh
DB_URI=PATH_TO_MONGODB_URI
JWT_KEY=YOUR_KEY
```

After that, you can run `npm run dev` and it will start a server at port 4000. You can specify the port adding `PORT` variable to `.env` file.

#### Frontend

To have the project running locally without problems, you will need to create an .env file at root directory (solar-facilities-frontend) and add the followings variables:

```sh
VITE_GRAPHQL_URI=https://URL_TO_API_SERVER/graphql
VITE_API_URI=https://URL_TO_API_SERVER
```

We need to add two different urls because all endpoints use Graphql but one, the endpoint to upload CSV files was made with Express router.

After that, you can run the following command:

```sh
npm run dev
```

It starts a development server and you can access the url from terminal

<!-- USAGE EXAMPLES -->
## Features

### Sign In and Sign Up

To use the application you will need to create an account with your name, email and password. After that you will be inmeddiately redirected to Dashboard page.

![Signup screenshot][signup-screenshot]

If you have already an account you can login directly using your email and password.

![Signin screenshot][signin-screenshot]

### Dashboard
You will find all your facilities listed in a table and you can manage them, adding new facilities, editing existing ones, or deleting whicever you want. Also you can upload CSV files for each facility using the upload icon.

![Dashboard screenshot][dashboard-screenshot]

### Performance data graph
Once you upload a csv file for the facility, you can click on _eye icon_ and it will redirects you to the performance data graph for the CSV you uploaded before. In this page you will see how have been the performance for your facility over time.

![Performance screenshot][performance-screenshot]

<!-- ROADMAP -->
## Architecture

In the following image is the basic architecture used for develop this project

![Architecture screenshot][architecture-screenshot]

The client comunicates over http using Graphql queries and mutations for all operations except uploading CSV file. For that operation a regular REST endpoint was created to avoid complexity managing files with Graphql. On backend the same http server receives all requests and redirects them to their corresponding route. Backend is using a MVC model creating controller for each model resource, that approach allows to implement testing easily.

### Graphql

Each type was created separatedly in `schemas` folder to maintain the granularity. There are two types:

```graphql
type Facility {
  id: ID!
  name: String!
  power: Float!
}

type Performance {
  id: ID!
  activePower: Float!
  energy: Float!
  timestamp: String!
}
```

#### Facility queries and mutations

Facility type has two queries, the first one is called `facilities` and it retrieves all facilities in an array for a userId provided, and the second one is called `facility` which receives and id and retrieves the specified facility.

```graphql
type Query {
  facility(id: ID!): Facility
  facilities(userId: ID!): [Facility]
}
```

Facility type has three mutations: `createFacility` which receives and input and returns the facility created; `updateFacility` which receives and input and updates the facility and `deleteFacility` which receives an id and delete the facility on database. It doesn't delete phisically the document from database, the model has a status field that allows to filter between `ENABLED` and `DELETED`. This was made with the purpose of let add filters in client to see all kind of facilities.

```graphql
input CreateFacilityInput {
  name: String!
  power: Float!
  userId: ID!
}

input UpdateFacilityInput {
  id: ID!
  name: String
  power: Float
  userId: ID!
}

type Mutation {
  createFacility(input: CreateFacilityInput!): Facility
  updateFacility(input: UpdateFacilityInput!): Facility
  deleteFacility(id: ID!): Facility
}
```

#### Performance queries 

Performance type is for retrieve the data inserted by CSV uploads, for that reason it just have one query called: `performanceData` which receives a facility id and return an array with the performance data to be render on client.

```graphql
type Query {
  performanceData(facilityId: ID!): [Performance]
}
```


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[dashboard-screenshot]: images/dashboard.png
[performance-screenshot]: images/performance.png
[signup-screenshot]: images/signup.png
[signin-screenshot]: images/signin.png
[architecture-screenshot]: images/architecture.svg
