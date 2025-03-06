
export type FormData = {
  name: string;
  email: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  product: string;
  quantities?: {
    [productName: string]: number;
  };
};

export const initialFormData: FormData = {
  name: '',
  email: '',
  street: '',
  zipCode: '',
  city: '',
  country: 'Deutschland',
  product: '',
  quantities: {},
};
