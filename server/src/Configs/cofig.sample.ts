const config = {

  site: {
    phone: '',
    email: '',
  },

  typeorm: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    entities: [
        __dirname + "/entity/*.js"
    ],
    synchronize: true,
},


  server: {
    "port": 3005
  },
  protocol: 'http://',
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

export default config;
