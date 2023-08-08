import { createContext,useState,useEffect } from "react";
import Api from "../Api";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [produtos, setProdutos] = useState([]);
    const [produtosBackup, setProdutosBackup] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [taxas, setTaxas] = useState([]);
    const [pagamentos, setPagamentos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [tenant,setTenant] = useState({});
    const [corFundo,setCorFundo] = useState('');
    const [corTexto,setCorTexto] = useState('');
    const [slug,setSlug] = useState('');
    const [loadingPage,setLoadingPage] = useState(true);

    const getData = async () => {
        if (slug.length>0){
          let tenantData = await Api.getTenant(slug);
          setTenant(tenantData);
          setProdutos(tenantData.produtos);
          setProdutosBackup(tenantData.produtos);
          setCategorias(tenantData.categorias);
          setTaxas(tenantData.taxas);
          setHorarios(tenantData.horarios);
          setPagamentos(tenantData.pagamentos);
          setCorFundo(tenantData.cor_fundo);
          setCorTexto(tenantData.cor_texto);
          setLoadingPage(false)
        }
    }

    useEffect(() => {
        getData();
      }, [slug]);


  return (
      <DataContext.Provider value={{
       
        produtos,
        produtosBackup,
        setProdutos,
        categorias,
        taxas,
        pagamentos,
        horarios,
        tenant,
        corFundo,
        corTexto,
        slug,
        setSlug,
        loadingPage
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
