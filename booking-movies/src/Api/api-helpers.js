import axios from 'axios';

export const getAllMovies = async () => {
  try {
    const res = await axios.get('http://localhost:5000/movie');
    if (res.status !== 200) {
      console.log('No data');
      return null;
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Fonction pour envoyer une requête d'authentification utilisateur (inscription ou connexion)
export const sendUserAuthRequest = async (data, signup) => {
  try {
    const url = `http://localhost:5000/user/${signup ? 'signup' : 'login'}`;
    const response = await axios.post(url, {
      name: signup ? data.name : '',
      email: data.email,
      password: data.password,
    });
    
    if (response.status !== 200 && response.status !== 201) {
      console.log('Unexpected error');
      return null;
    }
    
    const responseData = response.data;
    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

//Admin authentification
export const sendAdminAuthRequest = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/admin/login", {
      email: data.email,
      password: data.password,
    });

    if (response.status !== 200) {
      console.log('Unexpected error');
      return null;
    }

    const resData = response.data;
    return resData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

//
export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/movie/${id}`);
    if (res.status !== 200) {
      console.log('Unexpected error');
      return null;
    }
    const resData = res.data;
    console.log(resData); // Affiche les détails du film
    return resData;
  } catch (err) {
    console.log(err);
    return null;
  }
};




export const newBooking = async (data) => {
  try {
    const res = await axios.post('http://localhost:5000/bookings', {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem('userId'),
    });

    if (res.status !== 201) {
      console.log('unexpected Error');
      return;
    }

    return res.data;
  } catch (err) {
    console.log(err);
  }
};


export const getUserBooking = async () => {
  const id = localStorage.getItem('userId');
  try {
    const res = await axios.get(`http://localhost:5000/user/bookings/${id}`);

    if (res.status !== 200) {
      console.log('Unexpected error');
      return null;
    }

    const resData = res.data;
    console.log(resData); // Affiche les réservations de l'utilisateur
    return resData;
  } catch (err) {
    console.log(err);
    return null;
  }
};





export const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/bookings/${id}`);
    if (res.status !== 200) {
      console.log("Unexpected error");
      return;
    }
    const resData = res.data;
    return resData;
  } catch (err) {
    console.log('Error deleting booking:', err);
    return null;
  }
};



export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  try {
    const res = await axios.get(`http://localhost:5000/user/${id}`);
    if (res.status !== 200) {
      console.log("Unexpected error");
      return null;
    }
    const resData = res.data;
    return resData;
  } catch (err) {
    console.log('Error getting user details:', err);
    return null;
  }
};



export const addMovie = async (data) => {
  try {
    const res = await axios.post("http://localhost:5000/movie", {
      title: data.title,
      description: data.description,
      posterUrl: data.posterUrl,
      releaseDate: data.releaseDate,
      trailer: data.trailer,
      featured: data.featured,
      actors: data.actors,
      admin: localStorage.getItem('adminId'),
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (res.status !== 201) {
      console.log("Unexpected Error Occurred");
      return;
    }

    const resData = await res.data;
    return resData;
  } catch (err) {
    console.log(err);
  }
};


export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");

  try {
    const res = await axios.get(`http://localhost:5000/admin/${adminId}`);

    if (res.status !== 200) {
      return console.log("Unexpected error occurred");
    }

    const resData = await res.data;
    return resData;
  } catch (err) {
    console.log(err);
  }
};


export const deleteMovie = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/movie/${id}`);
    if (res.status !== 200) {
      console.log("Unexpected error");
      return null;
    }
    const resData = res.data;
    console.log(resData); // Affiche le message "Movie deleted"
    return resData;
  } catch (err) {
    console.log('Error deleting movie:', err);
    return null;
  }
};
