# vue-daum-map
다음 지도를 래핑한 Vue.js 컴포넌트입니다.

## 데모
[Demo](https://okchangwon.github.io/vue-daum-map/demo/index.html)

## 참고 사항
- 중심좌표와 레벨값은 sync 됩니다.
- 지도가 로드되면 load 이벤트가 발생하며, 파라미터로 넘어오는 map 객체를 통해 지도를 직접 컨트롤 가능합니다.
- 지도에서 발생하는 [Events](http://apis.map.daum.net/web/documentation/#Map_Events) 들은 모두 그대로 내어주고 있으므로 필요시 바인딩하여 사용하시면 됩니다.
- appKey 는 [다음 지도  Web API 가이드](http://apis.map.daum.net/web/guide/#ready)를 참고하여 새로 발급받아 사용하세요.

## 개발 환경 & 도구
- Node.js 8.x
- Vue.js 2.x
- ES2015
- Webpack 4.x
- Daum Map SDK 4.0.5

> 하위 버전에서는 테스트하지 않았습니다.

## 설치
```bash
$ npm install vue-daum-map --save
# 혹은
$ yarn add vue-daum-map
```

## 컴포넌트 사용 예제

### 템플릿 예제
```vue
<vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      @center_changed=""
      @zoom_start=""
      @zoom_changed=""
      @bounds_changed=""
      @click=""
      @dblclick=""
      @rightclick=""
      @mousemove=""
      @dragstart=""
      @drag=""
      @dragend=""
      @idle=""
      @tilesloaded=""
      @maptypeid_changed=""
      style="width:500px;height:400px;"/>
```

```js
import VueDaumMap from 'vue-daum-map'
```

### 속성 예제
```js
{
    data: () => ({
        appKey: 'd650a15bea81e28dadb716657ad03d75', // 테스트용 appkey
        center: {lat:33.450701, lng:126.570667}, // 지도의 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도),
        mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
        libraries: [], // 추가로 불러올 라이브러리
        map: null // 지도 객체. 지도가 로드되면 할당됨.
    }),
}
```

### 메서드 예제
```js
{
    methods: {
        // 지도가 로드 완료되면 load 이벤트 발생
        onLoad (map) {
            this.map = map
        }
    }
}
```

## Props
prop | type | required | description
------------ | ------------ | ------------- | -------------
appKey | String | true | App key
libraries | Array | false | 추가로 불러올 라이브러리<br>ex) ['services', 'clusterer', 'drawing']
center | Object | true | {lat:33.450701, lng:126.570667} | 지도의 중심 좌표
level | Number | false | 지도의 레벨(확대, 축소 정도)
mapTypeId | Number | false | 일반지도 : VueDaumMap.MapTypeId.NORMAL<br>스카이뷰: VueDaumMap.MapTypeId.HYBRID
draggable | Boolean | false | 마우스 드래그, 휠, 모바일 터치를 이용한 시점 변경(이동, 확대, 축소) 가능 여부
scrollwheel | Boolean | false | 마우스 휠, 모바일 터치를 이용한 확대 및 축소 가능 여부
disableDoubleClick | Boolean | false | 더블클릭 이벤트 및 더블클릭 확대 가능 여부
disableDoubleClickZoom | Boolean | false | 더블클릭 확대 가능 여부
projectionId | String | false | 투영법 지정
tileAnimation | Boolean | false | 지도 타일 애니메이션 설정 여부
keyboardShortcuts | Boolean or Object | false | 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부

## Events
event | description
------------ | -------------
load | 다음 맵이 로드된 직후 발생한다.
center_changed | 중심 좌표가 변경되면 발생한다.
zoom_start | 확대 수준이 변경되기 직전 발생한다.
zoom_changed | 확대 수준이 변경되면 발생한다.
bounds_changed | 지도 영역이 변경되면 발생한다.
click | 지도를 클릭하면 발생한다.
dblclick | 지도를 더블클릭하면 발생한다.
rightclick | 지도를 마우스 오른쪽 버튼으로 클릭하면 발생한다.
mousemove | 지도에서 마우스 커서를 이동하면 발생한다.
dragstart | 드래그를 시작할 때 발생한다.
drag | 드래그를 하는 동안 발생한다.
dragend | 드래그가 끝날 때 발생한다.
idle | 중심 좌표나 확대 수준이 변경되면 발생한다.<br>단, 애니메이션 도중에는 발생하지 않는다.
tilesloaded | 확대수준이 변경되거나 지도가 이동했을때 타일 이미지 로드가 모두 완료되면 발생한다.
maptypeid_changed | 지도 기본 타일(일반지도, 스카이뷰, 하이브리드)이 변경되면 발생한다.
