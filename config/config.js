module.exports = {
    server: {
      host: 'localhost',
      port: 3000
    },
    database: {
        host: 'localhost',
        port: 27017,
        db: 'kamusAPI',
        username: '',
        password: ''
    },
    key: {
        privateKey: '37LvDSm4XvjYOh9Y',
        tokenAlgorithms: [ 'HS256' ],
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    email: {
        username: "test@test.com",
        password: "password",
        accountName: "Cronj"
    }
};
