import { useContext, createContext, useState, useEffect } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setDada] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const handleMode = () => {
    setIsDark(!isDark)
  }

  const fetchData = async () => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character`);
      if (!res.ok) throw new Error("Bad request");
      const data = await res.json();
      setDada(data.results);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MyContext.Provider
      value={{ isDark, data, loading, setLoading, fetchData, handleMode }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(MyContext);
};
