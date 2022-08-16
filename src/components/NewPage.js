import React, { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import { Button, InputAdornment } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createFunction, updateFunction } from "../function/axiosFunctions";

const NewPage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  const location = useLocation();
  const path = useParams();

  useEffect(() => {
    const [nameEdit, ageEdit, phoneEdit, addressEdit] = location.state;
    console.log(path.id);
    setName(nameEdit);
    setAddress(addressEdit);
    setAge(parseInt(ageEdit));
    setPhone(phoneEdit);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let pathId = path.id;
    if (pathId) {
      async function updateUser() {
        let [message, variant] = await updateFunction(
          pathId,
          name,
          age,
          phone,
          address,
          navigate
        );
        enqueueSnackbar(message, { variant: variant });
      }
      updateUser();
    } else {
      async function createUser() {
        let [message, variant] = await createFunction(
          name,
          age,
          phone,
          address,
          navigate
        );
        console.log("HEllo lorem23");
        // console.log(message, variant);
        enqueueSnackbar(message, { variant: variant });
      }
      createUser();
    }
  };

  return (
    <>
      {/* {enqueueSnackbar("message", { variant: "error" })} */}
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          style={{ margin: "10% 34%" }}
        >
          <TextField
            required
            id="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            onInvalid={(e) => e.target.setCustomValidity("Enter Your Name")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <TextField
            required
            id="age"
            label="Age"
            type="number"
            onChange={(e) => setAge(parseInt(e.target.value))}
            value={age ? age : ""}
            onInvalid={(e) => e.target.setCustomValidity("Age is Required")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <TextField
            required
            id="mobile"
            label="Mobile"
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10,
              minLength: 10,
            }}
            onChange={(e) => setPhone(String(e.target.value))}
            value={String(phone)}
            onInvalid={(e) => e.target.setCustomValidity("Enter Mobile Number")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <TextField
            id="address"
            label="Address"
            multiline
            required
            rows={3}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            onInvalid={(e) => e.target.setCustomValidity("Address is Required")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Button
              variant="contained"
              color="success"
              endIcon={<SendRoundedIcon />}
              type="submit"
            >
              {path.id ? "Update" : "Submit"}
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<BackspaceIcon />}
              onClick={() => {
                navigate(`/`);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default NewPage;
