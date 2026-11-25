import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsModPage = () => {
  const { dartsId } = useParams();
  const navigate = useNavigate();
  const [showModal, setModal] = useState(false);
  const [dartsPlayer, setDartsPlayer] = useState({
    name: '',
    birth_date: '',
    world_ch_won: 0,
    profile_url: '',
    image_url: ''
  });

  useEffect(() => {
    axios.get(`https://darts.sulla.hu/darts/${id}`)
      .then((res) => setDartsPlayer(res.data))
      .catch((error) => console.error(error));
  }, [dartsId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDartsPlayer((prevState) => ({
      ...prevState,
      [name]: name === 'world_ch_won' ? Number(value) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://darts.sulla.hu/darts/${id}`, dartsPlayer);
      setModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Sikeres módosítás!</h5>
              </div>
              <div className="modal-body">
                A dartsozó adatait sikeresen módosítottuk!
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={() => navigate('/')}>
                  Rendben
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-5 content bg-ivory text-center">
        <h2>Dartsozó Módosítása</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
            <div className="col-sm-9">
              <input type="text" name="name" className="form-control" value={dartsPlayer.name} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Születési dátuma:</label>
            <div className="col-sm-9">
              <input type="date" name="birth_date" className="form-control" value={dartsPlayer.birth_date} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
            <div className="col-sm-9">
              <input type="number" name="world_ch_won" className="form-control" value={dartsPlayer.world_ch_won} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Profil Url-je:</label>
            <div className="col-sm-9">
              <input type="text" name="profile_url" className="form-control" value={dartsPlayer.profile_url} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Kép Url-je:</label>
            <div className="col-sm-9">
              <input type="text" name="image_url" className="form-control" value={dartsPlayer.image_url} onChange={handleInputChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-success">Küldés</button> &nbsp;&nbsp;
          <Link to="/" className="btn btn-warning">
            <i className="bi bi-arrow-return-left"></i> Vissza
          </Link>
        </form>
      </div>
    </>
  );
};
