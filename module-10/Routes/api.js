const express = require('express');
const db = require('../Config/db');
const { UniqueCharOTP } = require('unique-string-generator');

const route = express.Router();

route.post('/create', async (req, res) => {
    const { username, email, password, refferalCode } = req.body;
    const userRefferalCode = await UniqueCharOTP(8);

    try {
        let [response] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        
        if (response.length) {
            return res.status(500).json({ message: "username already exist" });
        } else {
            try {
                let [emailCheck] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
                
                if (emailCheck.length) {
                    return res.status(500).json({ message: "email already exist" });
                } else {
                    const demoConnection = await db.getConnection();
                    try {
                        await demoConnection.beginTransaction();
                        await demoConnection.query("INSERT INTO users (username, password, email, refferal_code, credit_point) VALUES (?,?,?,?,?) ", [username, password, email, userRefferalCode, 2]);

                        await demoConnection.query("UPDATE users SET credit_point = credit_point + ? WHERE refferal_code = ?", [10, refferalCode]);

                        let [refferedByRows] = await demoConnection.query("SELECT username FROM users WHERE refferal_code = ?", [refferalCode]);
                        let refferedBy = refferedByRows[0];

                        await demoConnection.query("INSERT INTO credit_history (username, credit_point, credit_action, transaction_date) VALUES (?, ?, ?, CURRENT_DATE) ,(?, ?, ?, CURRENT_DATE)", [username, 2, "signup", refferedBy.username, 10, "reffer"]);

                        await demoConnection.commit();

                        return res.status(200).json({ message: "User Created Sucessfuly" });
                    } catch (error) {
                        await demoConnection.rollback();
                        // console.log(error);

                        return res.status(500).json({ message: "something went wrong 1",error: error });
                    } finally {
                        demoConnection.release();
                    }
                }
            } catch (error) {
                return res.status(500).json({ message: "something went wrong" });
            }

        }

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    

});

route.get('/user/:username', async (req, res) => {
    let [creditHistory] = [];

    try {
        [creditHistory] = await db.query("SELECT credit_point, credit_action, transaction_date FROM credit_history WHERE username = ?", [req.params.username]);
        // console.log(creditHistory);

        if (!creditHistory[0]) {
            return res.status(500).json({ message: "user not exist" });
        }
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" });
    }

    try {
        let [totalCredit] = await db.query("SELECT credit_point FROM users WHERE username = ?", [req.params.username]);

        return res.status(200).json({ totalCredit: totalCredit[0].credit_point, history: creditHistory });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "something went wrong" });
    }
});

route.post("/post",async (req,res)=>{
    let {username,postTitle, postContent} =req.body;
    if ( username && postTitle && postContent ) {
        const demoConnection = await db.getConnection();
        try {
            await demoConnection.query("INSERT INTO posts (username, postTitle, postContent) VALUE (?, ?, ?)",[username, postTitle, postContent]);
            
            await demoConnection.query("INSERT INTO credit_history (username, credit_point, credit_action, transaction_date) VALUE (?, ?, ?, CURRENT_DATE)", [username, 5, "post"]);
    
            await demoConnection.query("UPDATE users SET credit_point = credit_point + ? WHERE username = ?", [5, username]);
            
            await demoConnection.commit();

            return res.status(200).json({message: "post created sucessfully"});

        } catch (error) {
            await demoConnection.rollback();
            return res.status(200).json({message: "something went Wrong"});
        }finally{
            demoConnection.release();
        }
    }else{
        return res.status(400).json({ message: "Missing required fields" });
    }
});

// ✅ CommonJS style
module.exports = route;


