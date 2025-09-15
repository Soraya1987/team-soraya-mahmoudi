import { gql } from '@apollo/client';

export const GET_DOCTOR_APPOINTMENTS = gql`
  query GetDoctorAppointments {
    getAppointmentsForDoctor {
      id
      date
      time
      status
      notes
      doctor {
        id
        email
      }
      patient {
        id
        email
      }
    }
  }
`;
