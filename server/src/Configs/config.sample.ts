export const typeorm = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "",
  password: "",
  database: "",
  entities: [
    __dirname + "/../Infrastructure/typeOrm/Entity/*.ts"
  ],
  synchronize: true,
}

export const config = {

  site: {
    phone: '',
    email: '',
  },

  server: {
    "port": 3005
  },
  
  protocol: 'http://',
  baseUrl: 'localhost:3005',


  apiUrl: 'http://localhost:3005',
  mysql: {
    "client": "mysql",
    "connection": {
      "host": "",
      "user": "",
      "password": "",
      "database": ""
    },
    "pool": { "min": 0, "max": 7 },
    "migrations": {
      "tableName": "knex_migrations",
      "directory": "./src/Infrastructure/SQL/Migrations"
    },
    "acquireConnectionTimeout": 60000
  },

}
