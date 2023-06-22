import CityDataApi from "../api/CityDataApi";

/*
 * 도시데이터 api 접목
 * 로직 :
 * 1. API 를 통해 저장된 장소 배열을 반복해서 인수를 돌려
 *    원하는 데이터만 json 배열로 저장(clear)
 *
 * 2. 저장된 모든 핫플레이스 정보를 맵에 렌더링 될 때 모두 표시
 *
 * 단점 :
 * 1. 단점으로는 한가지만 해도 방대한 양의 데이터를 가져오는데
 *    배열로 반복문을 돌리다보니 상당히 많은 시간이 소요 됨
 *
 * 해결 방안 :
 * 1. 해결 방법으로는 기능 구현은 해당 컴포넌트에서 하되
 *    프로그램을 시작함과 동시에 api에 접근한다면
 *    필요한 데이터를 간추려서 전달하기 때문에
 *    많은 시간 절약이 생길 것으로 생각됨
 */
// async function apiTest()  {
//   let places = ToSpotData.getPlace();
//   const test = await ToSpotData.getCityDataList(places);
//   console.log(test);
// }

/*
 * 혼잡도, 유저 이벤트 컨버트
 * 로직 :
 * 1. 정보공유 허용한 유저만 데이터를 받아와서 웹소켓 세션에 저장
 *    클라이언트는 위치정보를 서버에 보내고 서버는 위치 정보를 받아서 저장한다
 *    당연히 이 모든 통신은 웹소켓으로 이루어진다.
 *
 * 2. 뷰셋이 유저 이벤트로 설정되어 있으면 3-4번을 실행한다.
 *
 * 3. 세션에 저장되어 있는 유저 정보를 웹소켓을 통해 받아옴
 *    (이 기능만 컴포넌트로 분리)
 *
 * 4. 받아온 유저(위치)데이터를 통해 서버에 유저(프로필)데이터를 받아온다.
 *
 * 5. 해당 위치 데이터에 의거해서 마커를 찍고
 *    프로필 데이터를 토대로 오버레이를 생성해준다.
 *
 * 6. 뷰셋이 혼잡도로 설정 되어 있으면 api 접목 로직을 사용한다.
 *
 * 7. 우측 상단버튼은 좌표만 전달 받아 지도 이동,
 *    혹은 지역 이름만 받아 타임라인으로 이동한다.
 */


const ToSpot = {
  getPlace: () => {
    return [{
      num: 1,
      location: "가로수길",
      name: "가로수길",
      lat: 37.5212557526595,
      lng: 127.023032708155
    }, {
      num: 2,
      location: "홍대 관광특구",
      name: "홍대",
      lat: 37.555629126086,
      lng: 126.92370965927591
    }, {
      num: 3,
      location: "이태원 관광특구",
      name: "이태원",
      lat: 37.54040410897566,
      lng: 126.99216997726722
    }, {
      num: 4,
      location: "명동 관광특구",
      name: "명동",
      lat: 37.56576644555232,
      lng: 126.98450443026759
    }, {
      num: 5,
      location: "잠실 관광특구",
      name: "잠실",
      lat: 37.51116222894772,
      lng: 127.09800673535563
    }];
  },

  setMapData: (lat, lng, loc) => {
    const data = {
      latitude : lat,
      longitude : lng,
      location : loc
    }
    console.log(data);
    return data;
  },
  // 배열을 인자 만큼 api 에 접근하여 데이터를 다시 배열로 저장해서 반환한다.
  getCityDataList : async (places) => {
    const arr = [];
    for (let i = 0; i < places.length; i++) {
      console.log(places[i].location);
      const data =  await CityDataApi.getCityData(places[i].location);
      arr.push(data)
    }
    return arr;
  },
  getClusterSample: () => {
    return {
      "positions": [
        {
          "lat": 37.27943075229118,
          "lng": 127.01763998406159
        },
        {
          "lat": 37.55915668706214,
          "lng": 126.92536526611102
        },
        {
          "lat": 35.13854258261161,
          "lng": 129.1014781294671
        },
        {
          "lat": 37.55518388656961,
          "lng": 126.92926237742505
        },
        {
          "lat": 35.20618517638034,
          "lng": 129.07944301057026
        },
        {
          "lat": 37.561110808242056,
          "lng": 126.9831268386891
        },
        {
          "lat": 37.86187129655063,
          "lng": 127.7410250820423
        },
        {
          "lat": 37.47160156778542,
          "lng": 126.62818064142286
        },
        {
          "lat": 35.10233410927457,
          "lng": 129.02611815856181
        },
        {
          "lat": 35.10215562270429,
          "lng": 129.02579793018205
        },
        {
          "lat": 35.475423012251106,
          "lng": 128.76666923366042
        },
        {
          "lat": 35.93282824693927,
          "lng": 126.95307628834287
        },
        {
          "lat": 36.33884892276137,
          "lng": 127.393666019664
        },
        {
          "lat": 37.520412849636,
          "lng": 126.9742764161581
        },
        {
          "lat": 35.155139675209675,
          "lng": 129.06154773758374
        },
        {
          "lat": 35.816041994696576,
          "lng": 127.11046706211324
        },
        {
          "lat": 38.20441110638504,
          "lng": 128.59038671285234
        },
        {
          "lat": 37.586112739308916,
          "lng": 127.02949148517999
        },
        {
          "lat": 37.50380641844987,
          "lng": 127.02130716617751
        },
        {
          "lat": 37.55155704387368,
          "lng": 126.92161115892036
        },
        {
          "lat": 37.55413060051369,
          "lng": 126.92207472929526
        },
        {
          "lat": 36.362321615174835,
          "lng": 127.35000483225389
        },
        {
          "lat": 37.55227862908755,
          "lng": 126.92280546294998
        },
        {
          "lat": 37.490413948014606,
          "lng": 127.02079678472444
        },
        {
          "lat": 35.172358507549596,
          "lng": 126.90545394866643
        },
        {
          "lat": 35.15474103200252,
          "lng": 129.11827889154455
        },
        {
          "lat": 37.516081250973485,
          "lng": 127.02369057166361
        },
        {
          "lat": 36.80711722863776,
          "lng": 127.14020346037576
        },
        {
          "lat": 37.28957415752673,
          "lng": 127.00103752005424
        },
        {
          "lat": 35.83953896766896,
          "lng": 128.7566880321854
        },
        {
          "lat": 37.51027412948879,
          "lng": 127.08227718124704
        },
        {
          "lat": 37.493581783270294,
          "lng": 126.72541955660554
        },
        {
          "lat": 35.135291862962795,
          "lng": 129.10060911448775
        },
        {
          "lat": 35.174574933144065,
          "lng": 126.91389980787773
        },
        {
          "lat": 37.795887691878654,
          "lng": 127.10660416587146
        },
        {
          "lat": 37.59288687521181,
          "lng": 126.96560524627377
        },
        {
          "lat": 37.45076411130452,
          "lng": 127.14593003749792
        },
        {
          "lat": 35.86008337557079,
          "lng": 127.1263912488061
        },
        {
          "lat": 35.23773491330953,
          "lng": 129.08371037429578
        },
        {
          "lat": 37.524297321304886,
          "lng": 127.05018281937049
        },
        {
          "lat": 36.33386658021849,
          "lng": 127.4461721466889
        },
        {
          "lat": 35.72963747546802,
          "lng": 128.27079056365005
        },
        {
          "lat": 36.02726828142973,
          "lng": 129.37257233594056
        },
        {
          "lat": 35.0708030360945,
          "lng": 129.0593185494088
        },
        {
          "lat": 35.86835862950247,
          "lng": 128.59755089175871
        },
        {
          "lat": 33.51133264696746,
          "lng": 126.51852347452322
        },
        {
          "lat": 37.61284289586752,
          "lng": 127.03120547238589
        },
        {
          "lat": 35.851696038722466,
          "lng": 128.59092937125666
        },
        {
          "lat": 37.59084695083232,
          "lng": 127.01872773588882
        },
        {
          "lat": 35.52114874288784,
          "lng": 129.33573629945764
        },
        {
          "lat": 36.362326407439845,
          "lng": 127.33577420148076
        },
        {
          "lat": 37.28941189110747,
          "lng": 127.00446132665141
        },
        {
          "lat": 35.32049801117398,
          "lng": 129.1810343576788
        },
        {
          "lat": 37.53338631541601,
          "lng": 127.00615481678061
        },
        {
          "lat": 37.413461468258156,
          "lng": 126.67735680840826
        },
        {
          "lat": 35.920390371093205,
          "lng": 128.54411720249956
        },
        {
          "lat": 36.65489374054824,
          "lng": 127.48374816871991
        },
        {
          "lat": 37.49491987110441,
          "lng": 127.01493134206048
        },
        {
          "lat": 37.64985695608336,
          "lng": 127.14496345268074
        },
        {
          "lat": 37.55686770317417,
          "lng": 127.16927880543041
        },
        {
          "lat": 37.37014007589146,
          "lng": 127.10614330185591
        },
        {
          "lat": 37.5350236507627,
          "lng": 126.96157681184789
        },
        {
          "lat": 37.40549630594667,
          "lng": 126.8980581820004
        },
        {
          "lat": 34.867950544005744,
          "lng": 128.69069690081176
        },
        {
          "lat": 35.16317059543225,
          "lng": 128.98452978748048
        },
        {
          "lat": 36.607484825953186,
          "lng": 127.48520451195111
        },
        {
          "lat": 37.651724785213986,
          "lng": 126.58306748337554
        },
        {
          "lat": 35.86059690063427,
          "lng": 128.59193087665244
        },
        {
          "lat": 35.25685847585025,
          "lng": 128.59912605060455
        },
        {
          "lat": 33.509258155694496,
          "lng": 126.5109451464813
        },
        {
          "lat": 37.64366155701157,
          "lng": 126.63255039247507
        },
        {
          "lat": 35.82667262227336,
          "lng": 127.1030670574823
        },
        {
          "lat": 35.82003554991111,
          "lng": 127.14810974062483
        },
        {
          "lat": 35.097485195649455,
          "lng": 128.99486181862338
        },
        {
          "lat": 37.32204249590605,
          "lng": 127.95591893585816
        },
        {
          "lat": 37.50535127272031,
          "lng": 127.1047465440526
        },
        {
          "lat": 36.99081407156533,
          "lng": 127.09338324956647
        },
        {
          "lat": 37.323486640444834,
          "lng": 127.12285239871076
        },
        {
          "lat": 35.78973089440451,
          "lng": 127.13644319545601
        },
        {
          "lat": 35.641373953578196,
          "lng": 129.35463220719618
        },
        {
          "lat": 37.47423127310911,
          "lng": 126.97625029161996
        },
        {
          "lat": 35.84357192991226,
          "lng": 128.61143720719716
        },
        {
          "lat": 37.180974984085736,
          "lng": 128.20294526341132
        },
        {
          "lat": 37.57895718642583,
          "lng": 126.9316897337244
        },
        {
          "lat": 33.49077253755052,
          "lng": 126.49314817000993
        },
        {
          "lat": 36.42175925330255,
          "lng": 128.67409133225766
        },
        {
          "lat": 37.46405540570109,
          "lng": 126.7153544119173
        },
        {
          "lat": 37.594758776232126,
          "lng": 127.10099917489818
        },
        {
          "lat": 37.7239966558994,
          "lng": 127.0478671731854
        },
        {
          "lat": 35.86680171505329,
          "lng": 128.5923738376741
        },
        {
          "lat": 37.560573727266785,
          "lng": 126.81239107485251
        },
        {
          "lat": 37.78692224857484,
          "lng": 126.98966010341789
        },
        {
          "lat": 35.10368644802913,
          "lng": 129.0206862606022
        },
        {
          "lat": 37.063839948992644,
          "lng": 127.06856523030079
        },
        {
          "lat": 37.34344643728643,
          "lng": 127.94382181350932
        },
        {
          "lat": 37.512521267219064,
          "lng": 127.40054805648133
        },
        {
          "lat": 35.15286653837983,
          "lng": 126.90419903971498
        },
        {
          "lat": 35.173238445546296,
          "lng": 129.176082844468
        },
        {
          "lat": 36.082394201323524,
          "lng": 129.40330471725923
        },
        {
          "lat": 37.51043665598106,
          "lng": 127.03974070036524
        },
        {
          "lat": 36.627816673285054,
          "lng": 127.44969866021904
        },
        {
          "lat": 37.59194624756919,
          "lng": 127.01817545576053
        },
        {
          "lat": 37.387147045560866,
          "lng": 127.1253365438929
        },
        {
          "lat": 35.89948383848115,
          "lng": 128.60809550730653
        },
        {
          "lat": 37.555316235235324,
          "lng": 127.14038447894715
        },
        {
          "lat": 36.09622092762977,
          "lng": 128.43314679004078
        },
        {
          "lat": 37.582855922985544,
          "lng": 126.91907857008522
        },
        {
          "lat": 37.516000983841586,
          "lng": 128.72798872032757
        },
        {
          "lat": 37.48429363675198,
          "lng": 127.0379630203579
        },
        {
          "lat": 37.54502575965604,
          "lng": 126.95429338245707
        },
        {
          "lat": 35.236247173046394,
          "lng": 128.8677618015292
        },
        {
          "lat": 37.40157536691968,
          "lng": 127.11717457214067
        },
        {
          "lat": 36.95191038001258,
          "lng": 127.91064040877527
        },
        {
          "lat": 37.491526492971346,
          "lng": 126.85463749525812
        },
        {
          "lat": 36.124356479753196,
          "lng": 128.09517052346138
        },
        {
          "lat": 37.15715169307048,
          "lng": 128.15853461363773
        },
        {
          "lat": 37.5808156608605,
          "lng": 126.95109705510639
        },
        {
          "lat": 37.46931787249714,
          "lng": 126.89904775044873
        },
        {
          "lat": 35.52195614910054,
          "lng": 129.3209904841746
        },
        {
          "lat": 37.58625703195563,
          "lng": 126.9496035206742
        },
        {
          "lat": 37.28463639199199,
          "lng": 126.85984474757359
        },
        {
          "lat": 35.534169458631226,
          "lng": 129.31169021536095
        },
        {
          "lat": 37.553341234194285,
          "lng": 127.15481222237025
        },
        {
          "lat": 37.62293367990081,
          "lng": 126.83445005122417
        },
        {
          "lat": 35.5272027005698,
          "lng": 127.72953798950101
        },
        {
          "lat": 35.180032285898854,
          "lng": 128.06954509175367
        }
      ]
    };
  }
}

export default ToSpot;