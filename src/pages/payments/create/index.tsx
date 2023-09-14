import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPayment } from 'apiSdk/payments';
import { paymentValidationSchema } from 'validationSchema/payments';
import { PaymentInterface } from 'interfaces/payment';

function PaymentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PaymentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPayment(values);
      resetForm();
      router.push('/payments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PaymentInterface>({
    initialValues: {
      payment_type: '',
      transaction_id: '',
      payment_status: '',
      payment_date: new Date(new Date().toDateString()),
      payment_method: '',
      payment_amount: 0,
      payment_confirmation_code: '',
      payment_description: '',
      payment_receipt_url: '',
      payment_reference_number: '',
    },
    validationSchema: paymentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Payments',
              link: '/payments',
            },
            {
              label: 'Create Payment',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Payment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.payment_type}
            label={'Payment Type'}
            props={{
              name: 'payment_type',
              placeholder: 'Payment Type',
              value: formik.values?.payment_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.transaction_id}
            label={'Transaction Id'}
            props={{
              name: 'transaction_id',
              placeholder: 'Transaction Id',
              value: formik.values?.transaction_id,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.payment_status}
            label={'Payment Status'}
            props={{
              name: 'payment_status',
              placeholder: 'Payment Status',
              value: formik.values?.payment_status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="payment_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Payment Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.payment_date ? new Date(formik.values?.payment_date) : null}
              onChange={(value: Date) => formik.setFieldValue('payment_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.payment_method}
            label={'Payment Method'}
            props={{
              name: 'payment_method',
              placeholder: 'Payment Method',
              value: formik.values?.payment_method,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Payment Amount"
            formControlProps={{
              id: 'payment_amount',
              isInvalid: !!formik.errors?.payment_amount,
            }}
            name="payment_amount"
            error={formik.errors?.payment_amount}
            value={formik.values?.payment_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('payment_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.payment_confirmation_code}
            label={'Payment Confirmation Code'}
            props={{
              name: 'payment_confirmation_code',
              placeholder: 'Payment Confirmation Code',
              value: formik.values?.payment_confirmation_code,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.payment_description}
            label={'Payment Description'}
            props={{
              name: 'payment_description',
              placeholder: 'Payment Description',
              value: formik.values?.payment_description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.payment_receipt_url}
            label={'Payment Receipt Url'}
            props={{
              name: 'payment_receipt_url',
              placeholder: 'Payment Receipt Url',
              value: formik.values?.payment_receipt_url,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.payment_reference_number}
            label={'Payment Reference Number'}
            props={{
              name: 'payment_reference_number',
              placeholder: 'Payment Reference Number',
              value: formik.values?.payment_reference_number,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/payments')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'payment',
    operation: AccessOperationEnum.CREATE,
  }),
)(PaymentCreatePage);
