mysql = require('mysql2/promise')
class DatabaseInterface{
    #connection;
    constructor(host, user, password, database){
        this.host = host
        this.user = user
        this.password = password
        this.database = database
    }
    async connect(){
        try{
            //https://youtu.be/kIc1edMoBu4
            this.#connection = await mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database
            })
        } catch (err){
            console.error(`Failed to connect to database: ${err.message}`)
            throw err;
        }
    


    }
    async isAlive(){
        this.#connection.ping(function (err) {
            if (err) return false;
            return true
          })
    }
    async query(sql){
        return await this.#connection.query(sql)
    }
}
module.exports = {DatabaseInterface}