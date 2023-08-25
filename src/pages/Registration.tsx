import React, { useState } from 'react';
import * as apiService from '../../src/services/apiService';


interface RegistrationData {
    name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
    address: string;
    date_of_birth: string;
    role: string;
  }

function Registration() {
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    address: '',
    date_of_birth: '',
    role: 'doctor', // Change to 'patient' if needed
  });

  const handleRegistration = async () => {
    try {
      const response = await apiService.registerUser(registrationData);
      console.log('Registration success:', response.data);

      setRegistrationData({
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        address: '',
        date_of_birth: '',
        role: 'doctor',
      });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form>
        <input
          type="text"
          placeholder="First Name"
          value={registrationData.name}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={registrationData.last_name}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, last_name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={registrationData.email}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={registrationData.password}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={registrationData.password_confirmation}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, password_confirmation: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={registrationData.phone_number}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, phone_number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={registrationData.address}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, address: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={registrationData.date_of_birth}
          onChange={(e) =>
            setRegistrationData({ ...registrationData, date_of_birth: e.target.value })
          }
        />
        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
}

export default Registration;
