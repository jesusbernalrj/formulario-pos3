import { createContext, useContext, useState } from "react"
import { CartItem, CategoryProps, CierresDeCajas, NuevoClienteProps, NuevoEmpleadoProps, NuevoProvedorProps, PosContextGlobal, RegistrarNewProducts, Rol, Users, VentaProps, children, montos } from "../interface/interface"
import { useLocalStorage } from "../hooks/useLocalStorage"

 export const PosContext = createContext({} as PosContextGlobal)

 export const usePosContext = () => {
    return useContext(PosContext)
 }

 export const PosProvider = ({children}: children) => {
    const [indice, setIndice] = useState('1')

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
          setIndice(event.currentTarget.value);
        };
    const [cartItems, setCartItems] = useLocalStorage<{ [key: string]: CartItem[] }>("cartitems", ({
        '1': [], 
        '2': [], 
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': [],
      }));
      const [usersByIndex, setUsersByIndex] = useLocalStorage<{ [key: string]: Users[]}>('usuario' , ({
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': [],
    }))
      const [crearNewProducto, setCrearNewProducto] = useLocalStorage<RegistrarNewProducts[]>('nuevoProducto', [])
      const [openSideBar, setOpenSideBar] = useState<null | boolean>(null)
      const [descuentos, setDescuentos] = useState<{ [key: number]: number }>({});
      const [totalDescuentoSum, setTotalDescuentoSum] = useState<{[key: number]:number}>({})
      const [inputsCompras, setInputsCompras] = useState({
        count: '',
        transferencia: '',
        tarjeta: '',
        countUSD: '',
        transferenciaUSD: '',
        tarjetaUSD: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputsCompras((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      };
      const [ventas, setVentas] = useLocalStorage<VentaProps[]>("shopping-venta", [])
      const [nuevoCliente, setNuevoCliente] = useLocalStorage<NuevoClienteProps[]>('clientes', [])
      const [nuevoEmpleado, setNuevoEmpleado] = useLocalStorage<NuevoEmpleadoProps[]>('empleado', [])
      const [nuevoProvedor, setNuevoProvedor] = useLocalStorage<NuevoProvedorProps[]>('provedor', [])
      const [montosSalida, setmontosSalida] = useLocalStorage<montos[]>('montoSalida',[])
      const [modal, setModal] = useState(false)

      const handleModal = (getModal: boolean) => {
       setModal(getModal)
      }
      const [rolCreated, setRolCreated] = useLocalStorage<Rol[]>('rol', [])
      const [categoriaCreated, setCategoriaCreated] = useLocalStorage<CategoryProps[]>('category', [])
      const [categoryNew, setCategoryNew] = useState('')
      const [getName, setGetName] = useState('')
      const [modalEditar, setModalEditar] = useState(false)
      const [validMontoInicial, setValidMontoInicial] = useLocalStorage<boolean>('validacion', false)
      const [cierresDeCajas, setCierresDeCajas] = useLocalStorage<CierresDeCajas[]>('cierresDeCaja', [])
      const [showTeclado, setShowTeclado] = useState(false)
      const [modalOpen, setModalOpen] = useState('')
      const handleModalOpen = (nombre: string) => () => {
        setModalOpen(nombre)
      }

    return (
        <PosContext.Provider value={{cartItems, setCartItems, indice, 
        setIndice, handleChangePage, crearNewProducto, setCrearNewProducto, openSideBar, setOpenSideBar,
        descuentos, setDescuentos, totalDescuentoSum, setTotalDescuentoSum, inputsCompras,
         handleChange, ventas, setVentas, nuevoCliente,  setNuevoCliente, usersByIndex, setUsersByIndex,
          montosSalida, setmontosSalida, modal, handleModal, rolCreated, setRolCreated,
           nuevoEmpleado, setNuevoEmpleado, categoriaCreated, setCategoriaCreated, categoryNew, 
           setCategoryNew, getName, setGetName, nuevoProvedor, setNuevoProvedor, 
           modalEditar, setModalEditar, validMontoInicial, setValidMontoInicial, 
           cierresDeCajas, setCierresDeCajas, showTeclado, setShowTeclado,
            modalOpen, setModalOpen, handleModalOpen}}>
            {children}
        </PosContext.Provider>
    ) 
 }