# Seoul R&D Menu with Firebase function

### To-dos
- log 삭제
  - currentHour is 15
  - currentDay is Tuesday
  - Data from cache 2식당-저녁 > Get data from web
  - (하하)빅스비 추천 메뉴 나갑니다. 마음에 드셨으면 좋겠습니다.
  - currentDate is 20181106
  - set-datebase> set first => Saving data (Lunch at 1)
- message.photoOnlyType()도 context 기반으로
- DB에서 데이터 가지고 오기
- View more 링크 제공

### Done
- 식당 이름 처리
  - *** No restaurant: /img/menu/seoulrnd/dayMenu/cafeteria_1_menu_dodam_02.gif 
- cache timeout: 1시간에서 6시간
  - 밤 11시에 한 경우 다음날 5시 만기
- Restaurant name 제외
  - 깔끔한 내용 보여 주기
- apiai.js 오류 수정
  - getMenu is not defined at TextRequest.<anonymous> (/srv/apiai.js:45:29) 
