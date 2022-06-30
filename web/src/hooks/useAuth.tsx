import {createContext , useState , useContext, ReactNode} from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import  {initializeFirebase}  from '../services/firebase';
type User = {
    id: string;
    name: string;
    avatar : string;
    email: string;
    emailVerified: boolean;
  }

type AuthContextType = {
    user : User | null | undefined;
    logoutUser : () => void;
    loading : boolean
    signInWithGoogle : () => Promise<void>;
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

      const userStorage = localStorage.getItem('@feedbackWidget:user');

      if(userStorage) {
        return JSON.parse(userStorage)
      }

      return {} as User
    });
    const [loading, setLoading] = useState(false)
    async function signInWithGoogle () {
        initializeFirebase()
        
        /* const credential = GoogleAuthProvider.credentialFromResult(result) */
        const provider = new GoogleAuthProvider();
        const auth = getAuth()
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

                localStorage.setItem('@feedbackWidget:user', JSON.stringify(dataFormatted))

                setUser(dataFormatted)
                setLoading(false)
              }
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message)
        })
      }

      const logoutUser = () => {
        localStorage.removeItem('@feedbackWidget:user')
        setUser({} as User)
  
      }

      return (
        <AuthContext.Provider value={{loading, signInWithGoogle , user, logoutUser}}>
            {children}
        </AuthContext.Provider>
      )
  }