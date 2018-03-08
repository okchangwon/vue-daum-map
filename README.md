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

> 하위 버전에서는 테스트하지 않았습니다.

## 설치
```
$ npm install vue-daum-map --save
```

## 컴포넌트 사용 예제

### 템플릿 예제
```
<vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
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
      style="width:500px;height:400px;">
    </vue-daum-map>
```

### 속성 예제
```
data: () => ({
    appKey: 'd650a15bea81e28dadb716657ad03d75' // 테스트용 appkey
    center: {lat:33.450701, lng:126.570667}, // 지도의 중심 좌표
    level: 3 // 지도의 레벨(확대, 축소 정도),
    mapTypeId: VueDaumMap.MapTypeId.NORMAL, // NORMAL: 일반지도, HYBRID: 스카이뷰
    map: null // 지도 객체. 지도가 로드되면 할당됨.
}),

```

### 메서드 예제
```
methods: {
    // 지도가 로드 완료되면 load 이벤트 발생
    onLoad (map) {
        this.map = map
    }
}
```