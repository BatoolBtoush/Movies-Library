// Requiring express and cors
const express = require ('express');
const cors = require ('cors');

// Calling express and cors
const app = express();
app.use(cors());



// Require the data.json for the movie app
const movieAppData = require('./data.json');



// Create a constructor to specifiy what I want exactly from the data.json file
function movieApp(title,poster_path,overview){
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview
}




/// Endpoint:
app.get('/',homeHandler);
app.get('/favorite',favHandler);
app.get('*',notFoundHandler);
// app.get('',serverHandler);



// Mapping
function homeHandler(req,res){
    let movieHome = [];
    movieAppData.data.map(movie =>{
        let newMovieApp = new movieApp(movie.title,movie.poster_path,movie.overview)
        movieHome.push(newMovieApp)
    })
    console.log(movieHome)
    return res.status(200).json(movieHome)
}




function favHandler(req,res){
    return res.status(200).send("Welcome to Favorite Page");

}




function notFoundHandler(req,res){
    return res.status(404).send('page not found error')
}



// function serverHandler(req,res){

// }





/// Port listening
/// localhost:4020
app.listen(4020, ()=>{

    console.log('listening to port 4020')
})
