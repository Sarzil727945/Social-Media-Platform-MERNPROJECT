import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../AuthProvider/AuthProvider'
import useAxiosSecure from './useAxiouSeoure';
const useCard = () => {
     const { user, loading } = useContext(AuthContext);
     // jwt verify part 
     // const token = localStorage.getItem('access-token')
     const [axiosSecure] = useAxiosSecure();

     const { refetch, data: card = [] } = useQuery({
          queryKey: ['cards', user?.email],
          enabled: !loading,
          queryFn: async () => {
               const res = await axiosSecure(`/cards?email=${user?.email}`)
               return res.data;
          },
     })
     return [card, refetch]
}
export default useCard;