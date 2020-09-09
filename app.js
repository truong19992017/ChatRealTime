var express = require('express');
var expbs  = require('express-handlebars');
var hbs = require('hbs');
var path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.engine('hbs', expbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function(err) {});
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(express.static('controllers'));

// de dung duoc req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// cac bien goi router
const index = require('./routes/index');


app.use('/', index);



// bat du kien co nguoi truy cam server
var manguser= [];
io.on('connection', function (socket) {
    console.log('Welcome to server chat '  + socket.id);

    socket.on("guiuserlenclient", function(data){
        if(manguser.indexOf(data)>=0)
        {
            socket.emit("dangnhapthatbai");
        }
        else
        {
            socket.username = data;
            manguser.push(data);
            socket.emit("dangnhapthanhcong", data)
            io.sockets.emit("guidanhsachuser", manguser)
        }
    });

    socket.on("guichatlensever", function(data){
        io.sockets.emit("guichotatcauser", {user:socket.username , data:data});
    });

    socket.on("disconnect", function(){
        console.log(socket.id + " ngat ket noi");
        manguser.splice(
            manguser.indexOf(socket.username), 1
        );
        io.sockets.emit("guidanhsachuser", manguser)
    })
});

// tao 1 socket server voi port 3000
const PORT = 3000;
server.listen(PORT, function(){
    console.log(`Example app listening at http://localhost:${PORT}`)
})