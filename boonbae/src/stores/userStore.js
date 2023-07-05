import { create } from 'zustand';
import axios from 'axios';

export const useUserStore = create((set, get) => ({
  user: null,
  /**
  * 사용자 데이터를 설정합니다.
  * @param {Object} userData - 사용자 데이터
  */
  setUser: (userData) => set({ user: userData }),
  /**
   * 사용자 로그아웃을 처리합니다.
  */
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
  /**
   * 토큰 유효성을 확인하고 사용자 데이터를 설정합니다.
   * @async
   * @param {string} token - 확인할 토큰
  */
  checkValid: async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PROXY}/token/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data.isValid) {
        const user = response.data.user;
        get().setUser(user);
      } else {
        console.log('토큰이 유효하지 않습니다.');
        get().logout();
      }
    } catch (error) {
      console.log('토큰 유효성 확인 실패',error);
      get().logout();
    }
  },
}));
