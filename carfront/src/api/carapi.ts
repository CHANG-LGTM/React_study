import { CarResponse, Car, CarEntry } from "../types";
import axios, { AxiosRequestConfig } from "axios";

// Axios 요청 시 사용하는 공통 헤더 구성 함수
const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt"); // 세션 스토리지에서 JWT 토큰을 가져옴

  return {
    headers: {
      'Content-Type': 'application/json', // JSON 데이터 타입 명시
      'Authorization': token // JWT 토큰을 Authorization 헤더에 추가
    }
  }
}

// 서버에서 자동차 목록을 조회하는 함수
export const getCars = async (): Promise<CarResponse[]> => {
  // GET 요청을 통해 자동차 목록 데이터를 가져옴
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, getAxiosConfig());

  // 응답 데이터에서 _embedded 내부의 자동차 목록을 반환
  return response.data._embedded.cars;
}

// 특정 자동차를 삭제하는 함수
export const deleteCar = async (link: string): Promise<CarResponse> => {
  // 전달받은 자동차의 URL로 DELETE 요청을 전송하여 자동차를 삭제함
  const response = await axios.delete(link, getAxiosConfig());

  // 삭제된 자동차의 데이터를 반환
  return response.data;
}

// 새 자동차를 추가하는 함수
export const addCar = async (car: Car): Promise<CarResponse> => {
  // POST 요청을 통해 새 자동차 데이터를 서버에 추가함
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, getAxiosConfig());

  // 추가된 자동차 데이터를 반환
  return response.data;
}

// 기존 자동차 데이터를 수정하는 함수
export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  // PUT 요청을 통해 기존 자동차 데이터를 업데이트함 (URL은 carEntry에 저장된 값을 사용)
  const response = await axios.put(carEntry.url, carEntry.car, getAxiosConfig());

  // 업데이트된 자동차 데이터를 반환
  return response.data;
}
