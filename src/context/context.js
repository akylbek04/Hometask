import { useContext, createContext, useState, useEffect } from "react";

const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setDada] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [character, setCharacter] = useState({});
  const popular = Math.max(...data.map((char) => char.episode.length));

  const handleMode = () => {
    setIsDark(!isDark);
  };

  const fetchCharacter = async (id) => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      if (!res.ok) throw new Error("Bad request");
      const data = await res.json();
      setCharacter(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character`);
      if (!res.ok) throw new Error("Bad request");
      const data = await res.json();
      setDada(data.results);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCharacter();
    }, 1000);

    return () => clearTimeout(timer);
  }, [character]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MyContext.Provider
      value={{
        isDark,
        data,
        loading,
        input,
        character,
        popular,
        setLoading,
        setInput,
        fetchData,
        handleMode,
        fetchCharacter,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(MyContext);
};
