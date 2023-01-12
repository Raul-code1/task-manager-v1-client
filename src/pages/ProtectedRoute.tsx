import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../utils/storeHooks';



const ProtectedRoute = ({children}:{children:JSX.Element}) => {

  const { user }=useAppSelector((state)=>state.user)

  if (!user) {
    return <Navigate to='/register' />
  }

  return (<>{children}</>)
}

export default ProtectedRoute
