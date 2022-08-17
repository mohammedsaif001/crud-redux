import axios from "axios";

export const updateFunction = async (
  pathId,
  name,
  age,
  phone,
  address,
  navigate
) => {
  let message = "";
  let variant = "";
  const putURL = `http://192.168.1.158:7000/api/updateProfile/${pathId}`;
  await axios
    .put(putURL, {
      name: name,
      age: age,
      ph: phone,
      address: address,
    })
    .then((res) => {
      message = res.data.msg;
      variant = "success";
      console.log(res);
      console.log(message);
      navigate("/");
      return res;
    })
    .catch((err) => {
      let statusCode = err.response.data.status;
      if (statusCode === 409) {
        message = "User Already Exist";
        variant = "error";
        return err;
      } else if (statusCode === 404) {
        message = "User Not Found";
        variant = "error";
        return err;
      } else if (statusCode === 500) {
        message = "Internal Server Error";
        variant = "alert";
        return err;
      } else if (statusCode === 400) {
        message = err.response.data.data[0];
        variant = "error";
        return err;
      }
    });
  console.log(name, age, typeof age, typeof phone, address);
  return [message, variant];
};

export const createFunction = async (name, age, phone, address, navigate) => {
  const postURL = `http://192.168.1.158:7000/api/createProfile`;
  let message = "";
  let variant = "";
  await axios
    .post(postURL, {
      name: name,
      age: age,
      ph: phone,
      address: address,
    })
    .then((res) => {
      // let message = res.data.msg;
      // let variant = "success";
      message = "User Inserted Successfully";
      variant = "success";
      navigate("/");
      return res;
    })
    .catch((err) => {
      let statusCode = err.response.data.status;
      if (statusCode === 409) {
        message = "User Already Exist";
        variant = "error";
        console.log(statusCode, message);
        return err;
      } else if (statusCode === 404) {
        message = "User Not Found";
        variant = "error";
        console.log(statusCode, message);
        return err;
      } else if (statusCode === 500) {
        message = "Internal Server Error";
        variant = "alert";
        console.log(statusCode, message);
        return err;
      } else if (statusCode === 400) {
        message = err.response.data.data[0];
        variant = "error";
        console.log(statusCode, message);
        return err;
      }
    });
  console.log(name, typeof age, typeof phone, address);
  return [message, variant];
};

export const deleteUserAxios = async (delId) => {
  let message = "User Deleted";
  let variant = "error";
  try {
    const deleteURL = `http://192.168.1.158:7000/api/deleteProfile/${delId}`;
    console.log(delId);
    let response = await axios.delete(deleteURL);
    return [message, variant];
  } catch {
    message = "Some Error Occurred";
    variant = "error";
    console.log(delId, message);
    return [message, variant];
  }
};
