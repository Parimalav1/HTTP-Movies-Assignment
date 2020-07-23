import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// {
//     id: 5,
//     title: 'Tombstone',
//     director: 'George P. Cosmatos',
//     metascore: 89,
//     stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
//   }

const nextMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

export default function AddmovieForm({setMovieList}) {
    const { push } = useHistory();
    const [newMovie, setnewMovie] = useState(nextMovie);

    const addMovie = (evt) => {
        evt.preventDefault();
        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then(res => {
                setMovieList(res.data);
                push('/movies');
            })
            .catch(err => console.log('ERROR'));
    };

    const handleChange = (evt) => {
        evt.persist();
        let value = evt.target.value;
        if (evt.target.name === 'stars') {
            value = value.split(',')
        }
        setnewMovie({
            ...newMovie,
            [evt.target.name]: value
        })
    };

    return (
        <div className='add-movie'>
            <h2>Add A Movie</h2>
            <form onSubmit={addMovie}>
                <input
                    placeholder='Movie'
                    type="text"
                    name="title"
                    value={newMovie.title}
                    onChange={handleChange}
                />
                <input
                    placeholder='Director'
                    type="text"
                    name="director"
                    value={newMovie.director}
                    onChange={handleChange}
                />
                <input
                    placeholder='Rating'
                    type='number'
                    name="metascore"
                    value={newMovie.metascore}
                    onChange={handleChange}
                />
                <input
                    placeholder='Actor 1, Actor 2, ...'
                    type='text'
                    name="stars"
                    value={newMovie.stars.join(',')}
                    onChange={handleChange}
                />
                <button className='Btn'>Add</button>
                <br />
                <br />
                <br />
            </form>
        </div>
    )
};
