import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPage from "./components/NewPage";
import Details from "./components/Details";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={1} preventDuplicate>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Details />} />
            {/* <Route path="/delete" element={<DeleteModal />} /> */}
            <Route path="/newpage" element={<NewPage />} />
            {/* <Route path="/editPage/:id" element={<NewPage />} /> */}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
