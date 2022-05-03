import { useEffect, useState } from "react";
import Movie from "../movieList/Movie";
import PropTypes from 'prop-types';

function Home(){
    const [load, setLoad] = useState(true);
    const [movieArr, setMovieArr] = useState([]);

    const getMovie = async () => {
        const json = await(
            await (await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year'))
        ).json()
        setLoad(false);
        setMovieArr(json.data.movies);
    }
    useEffect(() => {
        getMovie();
    },[])

    return(
        <>
            <div>
                {
                    load 
                    ?
                    <p>loading</p>
                    :
                    <div>
                        <span>Movie List</span>
                        {
                            movieArr.map((item) => (
                                <div key={item.id}>
                                    <Movie
                                        id={item.id}
                                        title={item.title}
                                        summary={item.summary}
                                        img={item.medium_cover_image}
                                        genres={item.genres}
                                    />
                                </div>
                            ))
                        }
                    </div>                        
                } 
            </div>
        </>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Home;