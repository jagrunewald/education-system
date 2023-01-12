module.exports = {
  test: {
    client: "mysql",
    connection: {
      host: "162.241.203.130",
      user: "jonath31_jessica_user",
      password: "MySqlDatabase",
      database: "jonath31_jessica_database",
    },
    migrations: {
      directory: "migrations",
    },
  },
};
