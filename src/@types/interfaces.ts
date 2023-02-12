export interface SaleProps {
  board_salesman: string;
  date_of_sale: string;
  hour_of_sale: string;
  latitude: string;
  longitude: string;
  nearest_unit: string;
  roaming: number;
  sale_id: string;
  sale_value: number;
  salesman: string;
}

export interface DataSalesProps {
  menu: {
    boards: string[],
    salesman: string[],
    units: string[]
  },
  sales: SaleProps[]
  sales_amount: number;
}

export interface LocationProps {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  },
  timestamp: number;
}