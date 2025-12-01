import { useMutation } from "react-query";
import { axios } from "src/api/axios-lib";
import { queryClient } from "src/api/react-query-lib";
import { OrderTransLab } from "src/domain/models/OrderTransLab";


const updateOrderTranspLab = (data: OrderTransLab,plant_id: string,delivery_id: string): Promise<string> =>
        axios.post('saveOrderTranspLab&plant_id=' +plant_id 
        +'&delivery_id=' +delivery_id,data)
        .then(response => response.data);

export {updateOrderTranspLab};
        