import axios from "axios";

export const updateFunction = (pathId, name, age, phone, address, navigate) => {
  const putURL = `http://192.168.1.143:8000/api/updateProfile/${pathId}`;
  axios
    .put(putURL, {
      name: name,
      age: age,
      ph: phone,
      address: address,
    })
    .then((res) => {
      let message = res.data.msg;
      let variant = "success";
      console.log(res);
      console.log(message);
      navigate("/");
      return [message, variant];
    })
    .catch((err) => {
      let statusCode = err.response.data.status;
      if (statusCode === 409) {
        let message = "User Already Exist";
        let variant = "error";
        return [message, variant];
      } else if (statusCode === 404) {
        let message = "User Not Found";
        let variant = "error";
        return [message, variant];
      } else if (statusCode === 500) {
        let message = "Internal Server Error";
        let variant = "alert";
        return [message, variant];
      } else if (statusCode === 400) {
        let message = err.response.data.data[0];
        let variant = "error";
        return [message, variant];
      }
    });
  console.log(name, age, typeof age, typeof phone, address);
};

export const createFunction = (name, age, phone, address, navigate) => {
  const postURL = `http://192.168.1.143:8000/api/createProfile`;
  axios
    .post(postURL, {
      name: name,
      age: age,
      ph: phone,
      address: address,
    })
    .then((res) => {
      let message = res.data.msg;
      let variant = "success";
      console.log(res);
      console.log(message);
      navigate("/");
      return [message, variant];
    })
    .catch((err) => {
      let statusCode = err.response.data.status;
      if (statusCode === 409) {
        let message = "User Already Exist";
        let variant = "error";
        return [message, variant];
      } else if (statusCode === 404) {
        let message = "User Not Found";
        let variant = "error";
        return [message, variant];
      } else if (statusCode === 500) {
        let message = "Internal Server Error";
        let variant = "alert";
        return [message, variant];
      } else if (statusCode === 400) {
        let message = err.response.data.data[0];
        let variant = "error";
        return [message, variant];
      }
    });
  console.log(name, age, typeof phone, address);
};
