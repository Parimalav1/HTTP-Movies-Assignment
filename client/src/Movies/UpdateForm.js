import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

// {
//     id: 5,
//     title: 'Tombstone',
//     director: 'George P. Cosmatos',
//     metascore: 89,
//     stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
//   }

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

export default function UpdateForm({updateMovieInList}) {
    // const location = useLocation();
    const params = useParams();
    const { push } = useHistory();
    const [updateMovie, setupdateMovie] = useState(initialMovie);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => setupdateMovie(res.data))
            .catch(err => console.log(err));
    }, [params.id]);

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, updateMovie)
            .then(res => {
                setupdateMovie(res.data);
                updateMovieInList(res.data);
                push('/movies');
            })
            .catch(err => console.log('ERROR'));
    };

    const handleUpdate = (evt) => {
        evt.persist();
        setupdateMovie({
            ...updateMovie,
            [evt.target.name]: evt.target.value
        })
    };

    return (
        <div className='update-movie'>
            <h2>Update Movie</h2>
            <form onSubmit={onSubmit}>
                <input
                    placeholder='Movie'
                    type="text"
                    name="title"
                    value={updateMovie.title}
                    onChange={handleUpdate}
                />
                <input
                    placeholder='Director'
                    type="text"
                    name="director"
                    value={updateMovie.director}
                    onChange={handleUpdate}
                />
                <input
                    placeholder='Rating'
                    type='number'
                    name="metascore"
                    value={updateMovie.metascore}
                    onChange={handleUpdate}
                />
                <input
                    placeholder='Stars'
                    type='text'
                    name="stars"
                    value={updateMovie.stars}
                    onChange={handleUpdate}
                />
                <button className='Btn' onClick={() => push(`/update-movie/${params.id}`, updateMovie)}>Update</button>
                <br />
                <br />
                <br />
            </form>
        </div>
    )
};