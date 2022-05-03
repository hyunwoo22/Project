import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Detail(){
    const {id} = useParams();
    const [oneMovie, setOneMovie] = useState([]);
    const getMovie = async() => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setOneMovie(json.data.movie)
    }
    useEffect(()=>{
        getMovie();
    },[])
    console.log('oneMovie??', oneMovie)
    return (
        <div>
            <p>
                <Link to='/'>Back</Link>
            </p>
            <h2>{oneMovie.title}</h2>
            <img src={oneMovie.medium_cover_image} />
            <p>{oneMovie.summary ?oneMovie.summary :oneMovie.description_intro}</p>
        </div>

    );
}
export default Detail;