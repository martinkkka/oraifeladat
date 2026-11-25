import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export function DartsSinglePage() {
  const params = useParams();
  const id = params.dartsId;
  const [dartsPlayer, setDartsPlayer] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    axios.get(`https://darts.sulla.hu/darts/${id}`)
      .then((res) => setDartsPlayer(res.data))
      .catch((error) => console.log(error))
      .finally(() => setPending(false));
  }, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !dartsPlayer.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3">
          <div className="card-body">
            <h5 className="card-title">Dartsozó neve: {dartsPlayer.name}</h5>
            <div className="lead">Születési éve: {dartsPlayer.birth_date}</div>
            <div className="lead">Nyert világbajnokságai: {dartsPlayer.world_ch_won}</div>
            <img
              alt={dartsPlayer.name}
              className="img-fluid rounded"
              style={{ maxHeight: '500px' }}
              src={dartsPlayer.image_url ? dartsPlayer.image_url : 'https://placeholder.co'}
            />
            <br />
            <a href={dartsPlayer.profile_url} target="_blank" rel="noreferrer">
              Wikipédia link
            </a>
          </div>
          <div>
            <NavLink to="/">
              <i className="bi bi-backspace fs-6 btn btn-primary"></i>
            </NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink to={`/mod-darts/${dartsPlayer.id}`}>
              <i className="bi bi-pencil-square fs-6 btn btn-warning"></i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
