import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('search movie');
  const [movie, setMovie] = useState([]);

  const changeText = (e) => {
    setText(e.target.value);
  }
  const getMovies = (e) => {
    e.preventDefault();
    axios.get(`https://www.omdbapi.com/?s=${text}&apikey=6c996a`)
    .then((response) => {
      console.log(response);
      if (response.data.Response == 'True') {
        setMovie(response.data.Search);
      }
    })
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Movie APP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" onSubmit={getMovies}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={changeText} />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className='container my-5 py-5'>
        <div className='row'>
          <div className='col-12'>
            {
              <div className='alert alert-primary' role="alert">
                <strong>Total Movie Search:</strong> {movie.length}
              </div>
            }
          </div>
          {
            movie.length > 0 &&
            movie.map((value, index) => {
              return (
                <div className='col-md-3 my-3 d-flex' key={value.imdbID}>
                  <div className="card w-100"
                    style={{
                      backgroundColor: (value.Title.toLowerCase().includes('red')) ? 'red' : ''
                    }}
                    >
                    <img src={value.Poster} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{value.Year}</h5>
                      <h4 className="card-text">{value.Title}</h4>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App;
