import { Link } from "react-router-dom";

function Movie({id, title, summary, img, genres}){

    return(
        <>
            <h3>
                <Link to={`/movie/${id}`}>{title}</Link>
            </h3>
            <img src={img} alt={title}/>
            <div>
                <ul>
                    {
                        genres.map((item) => (
                            <li key={item}>{item}</li>
                        ))
                    }
                </ul>
                <p>{summary}</p>
            </div>
        </>
    );
}
export default Movie;