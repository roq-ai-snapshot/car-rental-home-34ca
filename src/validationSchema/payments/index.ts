import * as yup from 'yup';

export const paymentValidationSchema = yup.object().shape({
  payment_type: yup.string().nullable(),
  transaction_id: yup.string().required(),
  payment_status: yup.string().nullable(),
  payment_date: yup.date().required(),
  payment_method: yup.string().nullable(),
  payment_amount: yup.number().required(),
  payment_confirmation_code: yup.string().nullable(),
  payment_description: yup.string().nullable(),
  payment_receipt_url: yup.string().nullable(),
  payment_reference_number: yup.string().nullable(),
});
