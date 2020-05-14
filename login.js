let mysql = require('mysql');
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let passwordHash = require('password-hash');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
});

let app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/css'));

app.get('/', function(req, res){
    if(req.session.loggedin){
        res.redirect('/home')
    } else {
        res.sendFile(path.join(__dirname + '/login.html'));
    }
});

app.get('/css/style.css', function(req, res) {
    res.sendFile(__dirname + "/css/style.css");
});

app.get('/img/profile.svg', function(req, res) {
    res.sendFile(__dirname + "/img/profile.svg");
});

app.get('/js/app.js', function(req, res) {
    res.sendFile(__dirname + "/js/app.js");
});

app.post('/login', function(req, res){
    let username = req.body.logusername;
    let password = req.body.logpassword;
    if(username && password){
        connection.query("SELECT * FROM accounts WHERE username=?", [username], function(err, result, field){
            if (parseInt(result.length) > 0) {
                if (passwordHash.verify(password, result[0].password)) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect("/home");
                    res.end();
                } else {
                    res.send("Incorrect Password !");
                    res.end();
                }
            } else {
                res.send("Incorrect Username !");
                res.end();
            }
        })
    } else{
        res.send("Plz input !");
        res.end();
    }
});

app.post('/register', function(req, res){
    let username = req.body.regusername;
    let email = req.body.regemail;
    let password = req.body.regpassword;
    let confirmpassword = req.body.regconfirmpassword;
    if(username && password && email && confirmpassword){
        if(password != confirmpassword) {
            res.send("Password isn't match !");
            return false;
        }

        connection.query("SELECT * FROM accounts WHERE username=? OR email=?", [username, email], function(err, result, field){
            if (parseInt(result.length) > 0) {
                res.send("Already Have Username or Email !")
                res.end();
            } else {
                var hashedPassword = passwordHash.generate(password);
                let sql = "INSERT INTO accounts (username, password, email) VALUES (?,?,?)";
                connection.query(sql, [username, hashedPassword, email], function(err, result, field){
                    if (err) throw err;
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect("/home");
                    res.end();
                })
            }
        })
    } else {
        res.send("Plz input !");
        res.end();
    }
});

app.get("/home", function(req, res){
    if (req.session.loggedin) {
        res.send("welcome back, " + req.session.username + "<br><a href='/logout'>Logout</a>");
    } else {
        res.send("plz, login!");
    }
    res.end();
})

app.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect("/");
})

app.listen(3000);