import MobileDetect from 'mobile-detect';

const useUserAgent = setUserAgent => {
  const userAgent = window.navigator.userAgent
  if (userAgent) {
    let ua = new MobileDetect(userAgent);
    setUserAgent(ua.mobile() ? true : false)
  }

  return true
}

export default useUserAgent;