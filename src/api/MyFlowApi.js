import axios from "axios";

const Backend = "http://localhost:8111";



const MyFlowApi = {

    // 새 플로우 쓰기
    newFlow: async(email, lat, lng, content, img, flowId, place) => {
				const token = localStorage.getItem('token');
        const flowData = {
					email : email,
					place : place,
					lat : lat,
					lng  :lng,
					content : content,
					img : img,
				};

			try {
					const response = await axios.post('/auth/myflownew', flowData, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
					}
					});
					return response;

				} catch (error) {
					throw new error("새 플로우 게시 실패");
				}
		},

		getmyFlow: async (email) => {
			const token = localStorage.getItem('token');
			return await axios.post(Backend + "/auth/myflow", email, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
			}
			});
		}

}

export default MyFlowApi;




