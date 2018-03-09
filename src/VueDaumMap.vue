<template>
  <div></div>
</template>

<script>
  import loadScriptOnce from 'load-script-once';

  const MapTypeId = {
    "ROADMAP": 1,
    "NORMAL": 1,
    "SKYVIEW": 2,
    "HYBRID": 3,
    "OVERLAY": 4,
    "ROADVIEW": 5,
    "TRAFFIC": 6,
    "TERRAIN": 7,
    "BICYCLE": 8,
    "BICYCLE_HYBRID": 9,
    "USE_DISTRICT": 10
  };

  export default {
    name: "VueDaumMap",
    props: {
      appKey: {
        type: String,
        required: true
      },
      center: {
        type: Object,
        default: {lat:33.450701, lng:126.570667}
      },
      level: {
        type: Number,
        default: 3
      },
      mapTypeId: {
        type: Number,
        default: 1
      }
    },
    data: () => ({
      map: null
    }),
    mounted () {
      loadScriptOnce('//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' + this.appKey, () => {
        daum.maps.load(() => {
          this.render();
          this.bindEvents();
          this.$emit('load', this.map);
        });
      });
    },
    watch: {
      level () {
        this.map.setLevel(this.level);
      },
      center : {
        handler () {
          this.map.setCenter(new daum.maps.LatLng(this.center.lat, this.center.lng));
        },
        deep: true
      }
    },
    methods: {
      render () {
        const options = { //지도를 생성할 때 필요한 기본 옵션
          center: new daum.maps.LatLng(this.center.lat, this.center.lng), //지도의 중심좌표.
          level: this.level, //지도의 레벨(확대, 축소 정도)
          mapTypeId: this.mapTypeId //지도 타입
        };

        this.map = new daum.maps.Map(this.$el, options); //지도 생성 및 객체 리턴
      },
      bindEvents () {
        const handlers = {
          center_changed: null,
          zoom_start: null,
          zoom_changed: null,
          bounds_changed: this.onChange,
          click: null,
          dblclick: null,
          rightclick: null,
          mousemove: null,
          dragstart: null,
          drag: null,
          dragend: null,
          idle: this.onChange,
          tilesloaded: null,
          maptypeid_changed: null
        };

        for (let event in handlers) {
          this.bindEvent(event, handlers[event]);
        }
      },
      bindEvent (event, handler) {
        daum.maps.event.addListener(this.map, event, (...args) => {
          this.$emit(event, args);

          if (typeof handler === 'function') {
            handler();
          }
        });
      },
      onChange () {
        const level = this.map.getLevel();
        const latlng = this.map.getCenter();

        this.$emit('update:level', level);
        this.$emit('update:center', {
          lat: latlng.getLat(),
          lng: latlng.getLng()
        });
      }
    },
    MapTypeId: MapTypeId
  }
</script>

<style scoped>
</style>