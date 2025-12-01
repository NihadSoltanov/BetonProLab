import { FC, createContext, useState } from "react";
import { FilterContextData, FilterData } from "src/domain/models/FilterContextData";

export const FilterContext = createContext<FilterContextData>({} as FilterContextData);

export const FilterProvider:FC<any> = ({ children }) => {
    const [filterData, setFilterData] = useState<FilterData>();

    const searchData = (data:FilterData)=>{
    setFilterData(data);
    }
return (
        <FilterContext.Provider value={{filterData, searchData}}>
          {children}
        </FilterContext.Provider>
      );
};

