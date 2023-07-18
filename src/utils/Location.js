import { useState } from "react";

const useCurrentLocation = (options = {}) => {
  // 위치 정보와 에러 상태를 저장하는 상태 변수 선언
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  // Geolocation의 getCurrentPosition 메소드에 대한 성공 콜백 핸들러
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    // 위치 정보 업데이트
    setLocation({
      latitude,
      longitude,
    });
  };

  // Geolocation의 getCurrentPosition 메소드에 대한 실패 콜백 핸들러
  const handleError = (error) => {
    // 에러 상태 업데이트
    setError(error.message);
  };

  // 현재 위치 정보를 가져오는 함수
  const getCurrentLocation = () => {
    const { geolocation } = navigator;

    // Geolocation API를 지원하지 않는 경우 에러 상태 업데이트 후 종료
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Geolocation API를 사용하여 현재 위치 정보 요청
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  };

  // 위치 정보, 에러 상태, getCurrentLocation 함수 반환
  return { location, error, getCurrentLocation };
};

export default useCurrentLocation;
