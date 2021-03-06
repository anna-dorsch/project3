import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  getSpots() {
    return service
      .get("/spots")
      .then(res => res.data)
      .catch(errHandler);
  },

  addSpot(data) {
    return service
      .post("/spots", data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getProfile(id) {
    return service
      .get("/profile")
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get("/secret")
      .then(res => res.data)
      .catch(errHandler);
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  },
  deleteUser(id) {
    return service
      .delete("/users/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },
  
  editProfile(body) {
    return service
      .put("/users/profile", body)
      .then(res => res.data)
      .catch(errHandler);
  },

  addSimplePicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/simple-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  addPicture2(picFile) {
    const formData = new FormData();
    formData.append("picture", picFile);
    return service
      .post("/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  }

  // addSpotPicture(spotPicture) {
  //   const formDataSpot = new FormData();
  //   formDataSpot.append("spots", spotPicture);
  //   return service
  //     .post("/spots", formDataSpot, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     })
  //     .then(res => res.data)
  //     .catch(errHandler);
  // }
};
