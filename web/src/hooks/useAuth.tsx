import {createContext , useState , useContext, ReactNode} from 'react'
import { getAuth,
   createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup ,
    FacebookAuthProvider,
    signOut ,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
  } from "firebase/auth";
import  {initializeFirebase}  from '../services/firebase';
import { toast , ToastContainer } from 'react-toastify';
import notification from '../components/Notification'
type User = {
    id: string;
    name: string | null;
    avatar: string | null;
    email: string | null;
    emailVerified: boolean;
  }

type AuthSignInFormData = {
  email: string;
  password: string
}

type AuthContextType = {
    user : User | null | undefined;
    logoutUser : () => void;
    loading : boolean
    signInWithEmail: (data : AuthSignInFormData) => Promise<void>
    forgotEmailOrPassword: (email : string) => Promise<void>
    signInWithGoogle : () => Promise<void>;
    signInWithFacebook: () => Promise<void>
  }

  
type AuthContextProviderProps = {
    children : ReactNode;
  }

  const AuthContext = createContext({} as AuthContextType)


  export function useAuth(){
    return useContext(AuthContext)
  }

  export function AuthContextProvider({children} : AuthContextProviderProps) {
    const [user, setUser] = useState<User>(() => {

      const userStorage = localStorage.getItem(import.meta.env.VITE_STORAGE_KEY) ?? '@feedbackWidget-dev:user';

      if(userStorage) {
        return JSON.parse(userStorage)
      }

      return {} as User
    });
    const [loading, setLoading] = useState(false)

    initializeFirebase()
    const auth = getAuth()
    
    async function signInWithEmail (data : AuthSignInFormData) {
      const {email, password} = data
      
      setLoading(true)
      await signInWithEmailAndPassword(auth, email , password).then((userCredential) => {
        const user = userCredential.user

        const {uid , displayName , photoURL, email , emailVerified } = user

            const dataFormatted = {
              id : uid,
              name : displayName,
              avatar : photoURL,
              email,
              emailVerified
            }
            toast.success(`Bem vindo ${email}`, {
              autoClose: 3000,
              
              });
            localStorage.setItem(import.meta.env.VITE_STORAGE_KEY, JSON.stringify(dataFormatted))

              setUser(dataFormatted)
        

      })
      .catch((error) => {
        
        if(error.code === 'auth/wrong-password'){
          notification.error('Senha Incorreta')
      
          
        }
        if(error.code === 'auth/user-not-found'){
          
          createUserWithEmailAndPassword(auth , email, password).then((userCredential) => {
            const {uid , displayName , photoURL, email , emailVerified } = userCredential.user

            const dataFormatted = {
              id : uid,
              name : displayName,
              avatar : photoURL,
              email,
              emailVerified
            }
            notification.success(`Usuário ${email} cadastrado com sucesso`)
           
            localStorage.setItem(import.meta.env.VITE_STORAGE_KEY, JSON.stringify(dataFormatted))

              setUser(dataFormatted)
          }).catch((error) => {
            console.log(error)
          })
        }
        
      })
      .finally(() => {
        
        setLoading(false)
      })

    }

    async function forgotEmailOrPassword(email : string){
      setLoading(true)
      auth.useDeviceLanguage()
      sendPasswordResetEmail(auth, email)
      .then(() => {
        
          notification.info(`O link para resetar a senha do email : ${email} foi enviada`)
          
      }).catch((error) => {
        if(error.code === 'auth/invalid-email'){
          toast.error(`E-mail inválido`, {
            autoClose: 3000,
            
            });
        }
        if(error.code === 'auth/user-not-found'){
        
          notification.error(`O email: ${email} não foi encontrado na nossa Base de Dados`)
          
        }
      }).finally(() => {
        setLoading(false)
      })
    }

    async function signInWithGoogle () {
    const provider = new GoogleAuthProvider();
        
        setLoading(true)
        await signInWithPopup(auth , provider).then((result) => {
            if(result.user) {
                const {email , displayName , photoURL, uid, emailVerified } = result.user
                if(!displayName || !photoURL || !email){
                  throw new Error('Missing information from Google Account.')
                }

                const dataFormatted = {
                  id : uid,
                  name : displayName,
                  avatar : photoURL,
                  email,
                  emailVerified
                }

                localStorage.setItem(import.meta.env.VITE_STORAGE_KEY, JSON.stringify(dataFormatted))

                setUser(dataFormatted)
                
              }
        }).catch((error) => {
           
            console.log(error.code);
            console.log(error.message)
        })
        .finally(() => {
          setLoading(false)
        })
      }
      async function signInWithFacebook() {
        
        const provider = new FacebookAuthProvider();

       
        setLoading(true)

        await signInWithPopup(auth, provider).then((result) => {
          if(result.user){
            const {email , displayName , photoURL, uid, emailVerified } = result.user

            if(!displayName || !photoURL || !email){
              throw new Error('Missing information from Google Account.')
            }

            const dataFormatted = {
              id : uid,
              name : displayName,
              avatar : photoURL,
              email,
              emailVerified
            }

            localStorage.setItem(import.meta.env.VITE_STORAGE_KEY, JSON.stringify(dataFormatted))

            setUser(dataFormatted)
          }
        })
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        }).finally(() => {
          setLoading(false)
        })
      }

      const logoutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          
          localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY)
          setUser({} as User)
        
        }).catch((error) => {
         
          console.log(error)
        });
        
  
      }

      return (
        <AuthContext.Provider value={{loading, forgotEmailOrPassword,signInWithEmail, signInWithGoogle , user, logoutUser , signInWithFacebook}}>
            <ToastContainer/>
            {children}
        </AuthContext.Provider>
      )
  }