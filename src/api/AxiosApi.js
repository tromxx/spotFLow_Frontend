import axios from "axios";

const Backend = "http://localhost:8111";
const EF_DOMAIN = "http://localhost:3737";



const AxiosApi = {
	// 로그인
	memberLogin: async(id, pw) => {
			const loginData = {
				id: id,
				pwd: pw,
			};
		
			try {
				const response = await axios.post('/login', loginData);
				const { authToken } = response.data; // 서버에서 발급한 토큰 받아오기
		
				// 토큰 저장 (로컬 스토리지 등에 저장)
				localStorage.setItem('authToken', authToken);
		
				// 이후에 API 요청 시 헤더에 토큰 포함하여 보내기
				// axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
		
				return response.data; // 로그인 성공 시 추가 작업을 위해 필요한 데이터 반환
			} catch (error) {
				// 로그인 실패 처리
				throw new Error('로그인에 실패했습니다.');
			}


		},

	// 닉네임 중복 조회

	memberNickname: async(nickname) => {
			return await axios.get(Backend + `/    nickname?nickname=${nickname}`);
	},

	// 회원조회 

	memberGet : async(id) => {
			try {
				const authToken = localStorage.getItem('authToken');
				
				if (authToken) {
					// 헤더에 토큰 포함하여 보내기
					axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
				} else {
					// 토큰이 없을 경우에 대한 처리
					throw new Error('로그인이 필요합니다.');
				}
		
				const response = await axios.get(`${Backend}/member?id=${id}`);
				// 데이터 처리 등 추가 작업 수행
				return response.data;

			} catch (error) {
				// 오류 처리
				throw new Error('회원 조회에 실패했습니다.');
			}
	},

	// 회원가입 여부 확인

	memberRegCheck : async(id) => {
			return await axios.get(Backend + `/check?id=${id}`);
	},

	// 회원가입

	memberReg : async(id, pwd, nickname) => {
			const member ={
					id : id,
					pwd: pwd,
					nickname: nickname,
	};
	return await axios.post(Backend + "/new", member);
	},

	// 회원 탈퇴
	memberDel: async(data) => {
			const deleteData = {
					id: data.id,
					token: data.token
			};
			return await axios.post(Backend + "/del", deleteData);
	},

	findPw: async(id) => {
			const data = {
					id: id
			};
			return await axios.post(Backend + "/findpw", data);
	}

    

 
}

export default AxiosApi;




