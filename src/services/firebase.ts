import axios from 'axios';

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

const API_BASE_URL = 'https://rdvdoctor.tigerdigital.tech/v1/';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});


interface LoginData {
  email: string;
  password: string;
}

export const registerUser = (userData: RegistrationData) => {
  return apiService.post('register', userData);
};

export const loginUser = (loginData: LoginData) => {
  return apiService.post('login', loginData);
};

export default apiService;
