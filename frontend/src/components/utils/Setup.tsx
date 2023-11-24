import useVerify from '@/hooks/useVerify';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function Setup(){
    useVerify()
    return ( <ToastContainer/> );
}
 
export default Setup;