const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

//Initializations
const app = express();

//Settings
app.set('port', 3000); //Usa el puerto de las variables del sistema o el 3000 en su defecto process.env.PORT ||
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', //se dice que extención son los archivos para no poner .handlebars
    //helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Globar Variables

//Routes
app.use(require('./routes')); //Entra y busca el archivo index.js por defecto, si tiene otro nombre se tiene que aclarar

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the Server
app.listen(app.get('port'), () => {
    console.log('Server on port ',app.get('port'));
});