import { useContext, createContext, useState, useEffect } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setDada] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (
    url = "https://rickandmortyapi.com/api/character"
  ) => {
    const res = await fetch(url);
    const data = await res.json();
    setDada(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MyContext.Provider value={{ data, loading, setLoading, fetchData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(MyContext);
};
