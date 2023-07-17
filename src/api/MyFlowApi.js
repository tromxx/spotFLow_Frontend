import axios from "axios";

const Backend = "http://localhost:8111";



const MyFlowApi = {

    // 새 플로우 쓰기
    newFlow: async(email, lat, lng, content, img, place) => {
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
					throw new error("새 플로우 게시에 실패했습니다.");
				}
		},

		getClickedFlow: async (flowId) => {
			const token = localStorage.getItem('authToken');
			try {
				const response = await axios.post(Backend + "/auth/clickedflow", flowId, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
				}
				});
				return response;
			} catch (error) {
				throw new error("클릭한 플로우 정보를 가져오는 데 실패했습니다.");
			}
			
		},

		getmyFlow: async (token) => {
			
			return await axios.post(Backend + "/myflow/getmyflow",{},{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
		},

	

}

export default MyFlowApi;




