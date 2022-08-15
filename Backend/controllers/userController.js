const db = require('../config/database')
const bcrypt = require('bcrypt')


module.exports.register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        // Binary is used for case sensitivity else rishav and Rishav give same result
        const [userNameCheck] = await db.promise().query('SELECT * FROM USERS WHERE BINARY userName=? limit 1', [userName])
        if (userNameCheck.length > 0) {
            return res.json({ mssg: "Username already exists", status: false })
        }
        const [emailCheck] = await db.promise().query('SELECT * FROM USERS WHERE email=? limit 1', [email])
        if (emailCheck.length > 0) {
            return res.json({ mssg: "Email already exists", status: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO USERS(userName,email,password)VALUES(?,?,?)"
        const parameters = [
            userName,
            email,
            hashedPassword
        ]
        const user = await db.promise().query(query, parameters);
        res.send({ status: true });

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports.logIn = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        // Binary is used for case sensitivity else rishav and Rishav give same result
        // Here i have done double destructring 
        const [[user]] = await db.promise().query('SELECT * FROM USERS WHERE BINARY userName=? limit 1', [userName])
        if (!user) {
            return res.json({ mssg: "Incorrect username or password", status: false });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.json({ mssg: "Incorrect username or password", status: false });
        }
        return res.json({ status: true, user })
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const query = 'SELECT userName FROM USERS';
        const [users] = await db.promise().query(query);
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
