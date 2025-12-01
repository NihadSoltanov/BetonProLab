import { useQuery } from "react-query";
import { axios } from "src/api/axios-lib";
import { Plant } from "src/domain/models/Plant";



const getPlants = async (): Promise<Plant> =>{
 const response= await axios.get('getPlants');
 return response.data;
}
 

const usePlants = () => {
    return useQuery({
        queryKey: ['plants'],
        queryFn: () => getPlants(),
      });
};

export {usePlants,getPlants};