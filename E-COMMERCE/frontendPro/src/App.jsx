import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "./routes/router";
import { Toaster } from "sonner";
import store from "./redux/store";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
