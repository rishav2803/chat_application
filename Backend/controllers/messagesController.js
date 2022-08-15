const db = require('../config/database');


var recentContacts = [];
module.exports.getMessage = (req, res, next) => {
    getData();
    async function getData() {
        const query = 'SELECT * FROM MESSAGE WHERE SENDER=? AND RECEIVER=? OR SENDER=? AND RECEIVER=?';
        const parameters = [req.params.sender, req.params.receiver, req.params.receiver, req.params.sender]
        try {
            const messages = await db.promise().query(query, parameters);
            res.send(messages[0])
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports.insertMessage = async (req, res, next) => {
    try {
        const { sender, receiver, message, time } = req.body;
        const query = "INSERT INTO MESSAGE (sender,receiver,message_text,created_at)VALUES(?,?,?,?)"
        const parameters = [
            sender,
            receiver,
            message,
            time
        ]
        const result = await db.promise().query(query, parameters);
        res.send(result[0])
    } catch (error) {
        console.log(error);
        // return res.status(500).json(error);
    }

}

module.exports.getRecentlyContacted = async (req, res, next) => {
    try {
        sender = req.params.sender;
        const query = "SELECT DISTINCT RECEIVER FROM MESSAGE WHERE SENDER=(?)"
        const [users] = await db.promise().query(query, [sender]);
        recentContacts = [...users];
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports.validateUser = () => {
    console.log(recentContacts)
};