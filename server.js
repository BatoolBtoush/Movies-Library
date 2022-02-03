'use stricit';
 

// Requiring express, cors, axios and .env
require ('dotenv').config();
const express = require ('express');
const cors = require ('cors');
const axios = require ('axios');
// requiring pg
const pg = require ('pg');

// port
const PORT = process.env.PORT;


// Generate a client with a fixed database url
const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

// Calling express and cors
const app = express();
app.use(cors());
app.use(express.json());


// Require the data.json for the movie app for task 11:
const movieAppData = require('./Movie Data/data.json');



/// Endpoints for task 11, 12, 13 and 14:
app.get('/',homeHandler);
app.get('/favorite',favHandler);
app.get('/trending',trendingHandler);
app.get('/search',searchHandler);
app.get('/genre',genreHandler);
app.get('/providers',providersHandler);
/// database request endpoints (post and get)
app.post('/addMovie',addMovieHandler);
app.get('/getMovies',getMoviesHandler);
/// database request endpoints (update and delete)
app.put('/UPDATE/:id',updateHandler);
app.delete('/DELETE/:id',deleteHandler);
// get endpoint to retrieve certain movies from the database
app.get('/getMovie/:id',getMovieHandler);
/// errors
app.get('*',notFoundHandler);
app.use(serverErrorHandler);





// Create a constructor to specifiy what I want exactly from the data.json file
function movieApp(title,poster_path,overview){
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview
}



// constructor for the trending page
function trendInfo(id,title,release_date,poster_path,overview){
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview
}


// constructor for the search page
function searchInfo(id,title,release_date,poster_path,overview){
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview
}



// constructor for the genre page
function genreInfo(id,name){
    this.id = id;
    this.name = name;
}



// constructor for the providers page
function providerInfo(iso_3166_1,english_name,native_name){
    this.iso_3166_1 = iso_3166_1;
    this.english_name = english_name;
    this.native_name = native_name;
}


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





function trendingHandler(req,res){
    let numberOftrends=1;
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEYTRENDING}&language=en-US&number=${numberOftrends}`;
    axios.get(url)
    .then((result)=>{
       console.log(result.data.results);
       let trends = result.data.results.map(trend =>{
           return new trendInfo(trend.id,trend.title,trend.release_date,trend.poster_path,trend.overview);
       })
       res.status(200).json(trends);

    }).catch((err)=>{
        serverErrorHandler(err,req,res);
    })
        
}



function searchHandler(req,res){
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEYSEARCH}&language=en-US&query=The&page=2`
    axios.get(url)
    .then((result)=>{
       console.log(result.data.results);
       let searches = result.data.results.map(search =>{
           return new searchInfo(search.id,search.title,search.release_date,search.poster_path,search.overview);
       })
       res.status(200).json(searches);

    }).catch((err)=>{
        serverErrorHandler(err,req,res);
    })
        
}




function genreHandler(req,res){
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.APIKEY}&language=en-US`
    axios.get(url)
    .then((result)=>{
       console.log(result.data.genres);
       let genrea = result.data.genres.map(genre =>{
           return new genreInfo(genre.id,genre.name);
       })
       res.status(200).json(genrea);

    }).catch((err)=>{
        serverErrorHandler(err,req,res);
    })
        
}




function providersHandler(req,res){
    let url = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${process.env.APIKEY}&language=en-US`
    axios.get(url)
    .then((result)=>{
       console.log(result.data.results);
       let provide = result.data.results.map(provider =>{
           return new providerInfo(provider.iso_3166_1,provider.english_name,provider.native_name);
       })
       res.status(200).json(provide);

    }).catch((err)=>{
        serverErrorHandler(err,req,res);
    })
        
}



function addMovieHandler(req,res){
    const mov = req.body;
   // console.log(mov);
  let sql = `INSERT INTO batFavMovies(title,release_date,poster_path,overview) VALUES ($1,$2,$3,$4) RETURNING*;`
  let values = [mov.title,mov.release_date,mov.poster_path,mov.overview];
  //console.log(values);
  client.query(sql,values).then(data =>{
      res.status(200).json(data.rows);
  }).catch(error =>{
      serverErrorHandler(error,req,res)
  });
}




function getMoviesHandler(req,res){
    let sql = `SELECT * FROM batFavMovies;`;
    client.query(sql).then(data=>{
       res.status(200).json(data.rows);
    }).catch(error=>{
        serverErrorHandler(error,req,res)
    });
}




function updateHandler (req,res) {
    const id = req.params.id;
    const mov = req.body;
    const sql = `UPDATE batFavMovies SET title =$1, release_date =$2, poster_path =$3 ,overview=$4 WHERE id=$5 RETURNING *;`; 
    let values = [mov.title,mov.release_date,mov.poster_path,mov.overview,id];
    client.query(sql,values).then(data =>{
        res.status(200).json(data.rows);
    }).catch(error =>{
        serverErrorHandler(error,req,res)
    });

}



function deleteHandler(req,res){
    const id = req.params.id;
    const sql = `DELETE FROM batFavMovies WHERE id=${id};`
    client.query(sql).then(()=>{
        res.status(204).json({});
    }).catch(error=>{
        serverErrorHandler(error,req,res)
    });
}




function getMovieHandler(req,res){
    const id = req.params.id;
    const sql = `SELECT * FROM batFavMovies WHERE id=${id};`
    client.query(sql).then(data=>{
        res.status(200).json(data.rows);
    }).catch(error=>{
        serverErrorHandler(error,req,res)
    });
}





function notFoundHandler(req,res){
    return res.status(404).send('page not found error')
}




function serverErrorHandler(error,req,res){
    const servererror = {
            status: 500,
            responseText: "Sorry, something went wrong"            
    }
    res.status(500).send(servererror);
}





/// Port listening
/// localhost port:4020
// Making sure that my server doesn't run unless the database from the client is connected successfully
client.connect().then(() =>{
    app.listen(PORT, ()=>{

        console.log(`listening to port ${PORT}`)
    })
})
