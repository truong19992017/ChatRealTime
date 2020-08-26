var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const PORT = 3000;
app.listen(PORT, function(){
    console.log(`Example app listening at http://localhost:${PORT}`)
})