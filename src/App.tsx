import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from "./components/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalProvider } from "./context/globalContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AllRoutes />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GlobalProvider>
    </>
  );
}

export default App;
