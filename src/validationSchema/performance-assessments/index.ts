import * as yup from 'yup';

export const performanceAssessmentValidationSchema = yup.object().shape({
  average_usage: yup.number().integer().required(),
  peak_usage: yup.number().integer().required(),
  low_usage: yup.number().integer().required(),
  total_reservations: yup.number().integer().required(),
  vehicle_id: yup.string().nullable().required(),
});
