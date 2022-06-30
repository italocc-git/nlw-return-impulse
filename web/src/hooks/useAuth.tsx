import {createContext , useState , useContext, ReactNode} from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import  {initializeFirebase}  from '../services/firebase';
import { useNavigate } from 'react-router-dom';
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
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(false)
    async function signInWithGoogle () {
        initializeFirebase()
        const provider = new GoogleAuthProvider();
        const auth = getAuth()
        setLoading(true)
        await signInWithPopup(auth , provider).then((result) => {
            if(result.user) {
                const {email , displayName , photoURL, uid, emailVerified } = result.user
          
                if(!displayName || !photoURL || !email){
                  throw new Error('Missing information from Google Account.')
                }
          
                setUser({
                  id : uid,
                  name : displayName,
                  avatar : photoURL,
                  email,
                  emailVerified
                })
                setLoading(false)
              }
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message)
        })

        /* const credential = GoogleAuthProvider.credentialFromResult(result) */

        
        
        
     
      }

      const logoutUser = () => {
        setUser(null)
  
      }

      return (
        <AuthContext.Provider value={{loading, signInWithGoogle , user, logoutUser}}>
            {children}
        </AuthContext.Provider>
      )
  }