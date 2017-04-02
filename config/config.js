module.exports = {
    server: {
      host: 'localhost',
      port: 3000
    },
    database: "mongodb://localhost/kamusAPI",
    key: {
        privateKey: '1234567890',
        tokenAlgorithms: [ 'HS256' ],
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    email: {
        username: "test@test.com",
        password: "password",
        accountName: "Cronj"
    }
};
