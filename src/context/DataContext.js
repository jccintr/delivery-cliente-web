import { createContext,useState,useEffect } from "react";
//import { Routes, Route } from "react-router-dom";
import Api from "../Api";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [produtos, setProdutos] = useState([]);
    const [produtosBackup, setProdutosBackup] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [taxas, setTaxas] = useState([]);
    const [pagamentos, setPagamentos] = useState([]);
    //const [getProdutosError, setGetProdutosError] = useState(null);
    //const [getCategoriasError, setGetCategoriasError] = useState(null);
    //const [getTaxasError, setGetTaxasError] = useState(null);
    //const [getPagamentosError, setGetPagamentosError] = useState(null);
    //const [isLoading, setLoading] = useState(true);


    const getData = async () => {
        let tenantData = await Api.getTenant(1);
        setProdutos(tenantData.produtos);
        setProdutosBackup(tenantData.produtos);
        setCategorias(tenantData.categorias);
        setTaxas(tenantData.taxas);
        setPagamentos(tenantData.pagamentos);
    }

    useEffect(() => {
        getData();
      }, []);


    /*  
    const getAllProdutos = async () => {
        try {
          const response = await fetch(
            "https://x8ki-letl-twmt.n7.xano.io/api:p7GSSb0k/produtos"
          );
    
          if (!response.ok) throw Error("Falha ao obter dados!");
    
          const responseJson = await response.json();
          setProdutos(responseJson);
          setProdutosBackup(responseJson);
         setGetProdutosError(null);
        } catch (error) {
         setGetProdutosError(error.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getAllProdutos();
      }, []);
   

  const getAllCategorias = async () => {
    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:p7GSSb0k/categorias"
      );
      if (!response.ok) throw Error("Falha ao obter dados!");
      const responseJson = await response.json();
      setCategorias(responseJson);
      setGetCategoriasError(null);
    } catch (error) {
     setGetCategoriasError(error.message);
    } finally {
     setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategorias();
  }, []);

  const getAllTaxas = async () => {
    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:p7GSSb0k/taxas"
      );
      if (!response.ok) throw Error("Falha ao obter dados!");
      const responseJson = await response.json();
      setTaxas(responseJson);
     setGetTaxasError(null);
    } catch (error) {
      setGetTaxasError(error.message);
    } finally {
     setLoading(false);
    }
  };


  useEffect(() => {
    getAllTaxas();
  }, []);


  const getAllPagamentos = async () => {
    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:p7GSSb0k/pagamentos"
      );
      if (!response.ok) throw Error("Falha ao obter dados!");
      const responseJson = await response.json();
      setPagamentos(responseJson);
      setGetPagamentosError(null);
    } catch (error) {
     setGetPagamentosError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllPagamentos();
  }, []);
*/


  return (
      <DataContext.Provider value={{
       
        produtos,
        produtosBackup,
        setProdutos,
        categorias,
        taxas,
        pagamentos
        //getProdutosError,
        //getCategoriasError,
        //getTaxasError,
        //getPagamentosError,
        //isLoading
      

      }}>
        {children}
      </DataContext.Provider>
  )

}

export default DataContext;
