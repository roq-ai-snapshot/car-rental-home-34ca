import { GetQueryInterface } from 'interfaces';

export interface PaymentInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  payment_type?: string;
  transaction_id: string;
  payment_status?: string;
  payment_date: any;
  payment_method?: string;
  payment_amount: number;
  payment_confirmation_code?: string;
  payment_description?: string;
  payment_receipt_url?: string;
  payment_reference_number?: string;

  _count?: {};
}

export interface PaymentGetQueryInterface extends GetQueryInterface {
  id?: string;
  payment_type?: string;
  transaction_id?: string;
  payment_status?: string;
  payment_method?: string;
  payment_confirmation_code?: string;
  payment_description?: string;
  payment_receipt_url?: string;
  payment_reference_number?: string;
}
