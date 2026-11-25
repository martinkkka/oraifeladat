import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const CreateDartsPage = () => {
  const navigate = useNavigate();
  const [showModal, setModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://darts.sulla.hu/darts', {
        name: event.target.elements.name.value,
        birth_date: event.target.elements.birth_date.value,
        world_ch_won: Number(event.target.elements.world_ch_won.value),
        profile_url: event.target.elements.profile_url.value,
        image_url: event.target.elements.image_url.value
      });
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
                <h5 className="modal-title">Sikeres létrehozás!</h5>
              </div>
              <div className="modal-body">
                Az új dartsozó adatait sikeresen rögzítettük!
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
        <h2>Új dartsozó Felvitele</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
            <div className="col-sm-9">
              <input type="text" name="name" className="form-control" required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Születési dátuma:</label>
            <div className="col-sm-9">
              <input type="date" name="birth_date" className="form-control" required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
            <div className="col-sm-9">
              <input type="number" name="world_ch_won" className="form-control" required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Profil Url-je:</label>
            <div className="col-sm-9">
              <input type="text" name="profile_url" className="form-control" required />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-sm-3 col-form-label">Kép Url-je:</label>
            <div className="col-sm-9">
              <input type="text" name="image_url" className="form-control" required />
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
