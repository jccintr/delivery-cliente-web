import { createContext,useState,useEffect } from "react";
import Api from "../Api";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [produtos, setProdutos] = useState([]);
    const [produtosBackup, setProdutosBackup] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [taxas, setTaxas] = useState([]);
    const [pagamentos, setPagamentos] = useState([]);
    const [tenant,setTenant] = useState({});
    const [corFundo,setCorFundo] = useState('');
    const [corTexto,setCorTexto] = useState('');
    


    const getData = async () => {
        let tenantData = await Api.getTenant(1);
        setTenant(tenantData);
        setProdutos(tenantData.produtos);
        setProdutosBackup(tenantData.produtos);
        setCategorias(tenantData.categorias);
        setTaxas(tenantData.taxas);
        setPagamentos(tenantData.pagamentos);
        setCorFundo(tenantData.cor_fundo);
        setCorTexto(tenantData.cor_texto);
    }

    useEffect(() => {
        getData();
      }, []);


  return (
      <DataContext.Provider value={{
       
        produtos,
        produtosBackup,
        setProdutos,
        categorias,
        taxas,
        pagamentos,
        tenant,
        corFundo,
        corTexto
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
