export type FilterData = {
    period: string;
    waybill: string;
    client: string;
  };

  export type FilterContextData = {
    filterData?: FilterData;
    searchData(data:FilterData): void;
  };