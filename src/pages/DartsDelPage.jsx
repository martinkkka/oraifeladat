import { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export const DartsDelPage = () => {
  const { dartsId } = useParams();
  const navigate = useNavigate();
  const [dartsPlayer, setDartsPlayer] = useState(null);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    // A teljes listából keressük ki az adott ID-jú játékost, így biztosan betölt
    axios.get('https://sulla.hu')
      .then((res) => {
        const found = res.data.find((item) => String(item.id) === String(dartsId));
        setDartsPlayer(found || null);
      })
      .catch((error) => console.error('Hiba lekérdezéskor:', error))
      .finally(() => setPending(false));
  }, [dartsId]);

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await axios.delete(`https://sulla.hu/${dartsId}`);
      navigate('/');
    } catch (error) {
      console.error('Hiba törléskor:', error);
      alert('Nem sikerült a törlés! Nézd meg az F12 -> Console fület a pontos hibáért.');
    }
  };

  if (isPending) {
    return (
      <div className="p-5 m-auto text-center content bg-lavender">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (!dartsPlayer) {
    return (
      <div className="p-5 m-auto text-center content bg-lavender">
        <h4>A dartsozó nem található.</h4>
        <NavLink to="/" className="btn btn-primary mt-3">Vissza a listához</NavLink>
      </div>
    );
  }

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      <div className="card p-3">
        <div className="card-body">
          <h5 className="card-title">Törlendő dartsozó: {dartsPlayer.name}</h5>
          <div className="lead">Születési dátuma: {dartsPlayer.birth_date}</div>
          <div className="lead">Nyert világbajnokságai: {dartsPlayer.world_ch_won}</div>
          <img
            alt={dartsPlayer.name}
            className="img-fluid rounded"
            style={{ maxHeight: '500px' }}
            src={dartsPlayer.image_url ? dartsPlayer.image_url : 'https://placehold.co'}
          />
        </div>
        <form onSubmit={handleDelete}>
          <div>
            <NavLink to="/">
              <button type="button" className="btn btn-warning">
                <i className="bi bi-backspace"></i> Mégsem
              </button>
            </NavLink>
            &nbsp;&nbsp;
            <button type="submit" className="btn btn-danger">
              <i className="bi bi-trash3"></i> Törlés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};