import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(id);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setData(json.data);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={data.movie.medium_cover_image} alt={data.movie.title} />
          <h1>{data.movie.tile}</h1>
          <h4>
            {data.movie.year} | {data.movie.runtime} min |{" "}
            {data.movie.genres.map((g) => `${g} `)}
          </h4>
        </div>
      )}
    </div>
  );
}

export default Detail;
