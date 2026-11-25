import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const DartsListPage = () => {
  const [darts, setDarts] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    axios.get('https://darts.sulla.hu/darts')
      .then((res) => setDarts(res.data))
      .catch((error) => console.error(error))
      .finally(() => setFetchPending(false));
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Dartsozók</h2>
          {darts.map((dartsPlayer) => (
            <div className="card col-sm-3 d-inline-block m-1 p-2" key={dartsPlayer.id}>
              <p className="text-dark">Dartsozó neve: {dartsPlayer.name}</p>
              <p className="text-danger">Születési dátuma: {dartsPlayer.birth_date}</p>
              <p className="text-danger">Nyert világbajnokságai: {dartsPlayer.world_ch_won}</p>
              <div className="card-body">
                <NavLink to={`/darts/${dartsPlayer.id}`}>
                  <img
                    alt={dartsPlayer.name}
                    className="img-fluid"
                    style={{ maxHeight: 200 }}
                    src={dartsPlayer.image_url ? dartsPlayer.image_url : 'https://placeholder.co'}
                  />
                </NavLink>
                <br />
                <a href={dartsPlayer.profile_url} target="_blank" rel="noreferrer">
                  Wikipédia link
                </a>
              </div>
              <div>
                <NavLink to={`/darts/${dartsPlayer.id}`}>
                  <i className="bi bi-text-paragraph fs-6 btn btn-primary"></i>
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink to={`/mod-darts/${dartsPlayer.id}`}>
                  <i className="bi bi-pencil-square fs-6 btn btn-warning"></i>
                </NavLink>
                &nbsp;&nbsp;&nbsp;
                <NavLink to={`/del-darts/${dartsPlayer.id}`}>
                  <i className="bi bi-trash3 fs-6 btn btn-danger"></i>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
