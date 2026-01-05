import axios from "axios";

export const apiRequest = async (method, URL, data = null) => {
  const BASE_URL = "http://localhost:5000/api";
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios({
      method,
      url: `${BASE_URL}${URL}`,
      data,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        const refreshRes = axios.post(
          `${BASE_URL}/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        const retryRefresh = axios({
          method,
          url: `${BASE_URL}${URL}`,
          data,
          withCredentials: true,
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });

        return retryRefresh.data;
      } catch (error) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
  }
};
