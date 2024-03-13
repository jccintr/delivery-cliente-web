import { createContext,useState,useEffect } from "react";
import Api from "../Api";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [produtos, setProdutos] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [adicionaisPizza,setAdicionaisPizza] = useState([]);
    const [produtosBackup, setProdutosBackup] = useState([]);
    const [pizzaSabor1,setPizzaSabor1] = useState(null);
    const [pizzaSabor2,setPizzaSabor2] = useState(null);
    const [tamanhoPizza,setTamanhoPizza] = useState(1);
    const [saboresPizza,setSaboresPizza] = useState(1);
    const [categorias, setCategorias] = useState([]);
    const [taxas, setTaxas] = useState([]);
    const [pagamentos, setPagamentos] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [tenant,setTenant] = useState({});
    const [corFundo,setCorFundo] = useState('');
    const [corTexto,setCorTexto] = useState('');
    const [slug,setSlug] = useState('');
    const [loadingPage,setLoadingPage] = useState(true);
    const [lastOrder,setLastOrder] = useState(null);

    const getData = async () => {
        if (slug.length>0){
          let tenantData = await Api.getTenant(slug);
          setTenant(tenantData);
          setProdutos(tenantData.produtos);
          setPizzas(tenantData.pizzas);
          setAdicionaisPizza(tenantData.adicional_pizza)
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
        loadingPage,
        lastOrder,
        setLastOrder,
        pizzaSabor1,
        pizzaSabor2,
        setPizzaSabor1,
        setPizzaSabor2,
        tamanhoPizza,
        setTamanhoPizza,
        saboresPizza,
        setSaboresPizza,
        pizzas,
        setPizzas,
        adicionaisPizza

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
