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
    async close(){
        await this.#connection.end()
    }

    async addUser(username, email, password){
        const insertQuery = "INSERT INTO uzytkownicy (username, email, password) VALUES (?,?,?)"
        const params = [username, email, password]
        return await this.#connection.execute(insertQuery, params)
    }

    
    async addQuiz(nazwa_quizu, autor, pytania){
        const insertQuery = "INSERT INTO quizy (nazwa_quizu, autor, pytania) VALUES (?,?,?)"
        const params = [nazwa_quizu, autor, pytania]
        return await this.#connection.query(insertQuery, params)
    }

    async addResult(user_id, quiz_id, wynik){
        const insertQuery = "INSERT INTO wyniki (user_id, quiz_id, wynik)"
        const params = [user_id, quiz_id, wynik]
        return await this.#connection.execute(insertQuery, params)
    }

    async removeQuiz(id, nazwa_quizu, autor, pytania){
        const insertQuery = "DELETE FROM quizy WHERE (id, nazwa_quizu, autor, pytania) VALUES (?,?,?,?)"
        const params = [id, nazwa_quizu, autor, pytania]
        return await this.#connection.query(insertQuery, params)
    }

    async removeUser(id, username, email, password){
        const insertQuery = "DELETE FROM uzytkownicy WHERE (id, username, email, password) VALUES (?,?,?,?)"
        const params = [id, username, email, password]
        return await this.#connection.execute(insertQuery, params)
    }

}
module.exports = {DatabaseInterface}