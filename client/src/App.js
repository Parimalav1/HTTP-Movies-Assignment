import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm';
import AddmovieForm from './Movies/AddmovieForm';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    let newList = savedList.indexOf(movie) === -1 ? [...savedList, movie] : savedList;
    setSavedList(newList);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const removeFromMovieList = (movie) => {
    let newMovieArray = movieList.filter(x => (x.id !== movie.id));
    setMovieList(newMovieArray);
  };

  const updateMovieInList = (movie) => {
    let updatedArray = movieList.map(x => (x.id === movie.id? movie: x));
    setMovieList(updatedArray);
  };

  // const removeFromSavedList = (movieId) => {
  //   let newMovieArray = movieList.filter(x => (x.id !== movieId));
  //   setMovieList(newMovieArray);
  // };

  return (
    <>
      <SavedList list={savedList} />
      <Switch>
        <Route exact path="/movies">
          <MovieList movies={movieList} />
        </Route>

        <Route exact path="/movies/:id">
          <Movie 
          addToSavedList={addToSavedList}
          removeFromMovieList={removeFromMovieList}
           />
        </Route>
        <Route exact path='/update-movie/:id'
          render={props => <UpdateForm {...props} setMovieList={setMovieList}
           updateMovieInList={updateMovieInList} />}
        />
        <Route exact path='/add-movie'
          render={props => <AddmovieForm {...props} setMovieList={setMovieList} />}
        />
        <Route path='/'>
          <Redirect to='/movies' />
        </Route>
      </Switch>
    </>
  )
};

export default App;
