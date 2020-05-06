import { useLocation } from 'react-router-dom';

// let query = useQuery(); query.get('yourQuery')
const useQuery = () => new URLSearchParams(useLocation().search);

export default useQuery;
