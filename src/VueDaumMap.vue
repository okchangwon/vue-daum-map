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

  const EVENTS = [
    'center_changed',
    'zoom_start',
    'zoom_changed',
    'bounds_changed',
    'click',
    'dblclick',
    'rightclick',
    'mousemove',
    'dragstart',
    'drag',
    'dragend',
    'idle',
    'tilesloaded',
    'maptypeid_changed'
  ];

  export default {
    name: "VueDaumMap",
    props: {
      appKey: {
        type: String,
        required: true
      },
      libraries: {
        type: Array,
        default: () => []
      },
      center: {
        type: Object,
        required: true
      },
      level: {
        type: Number,
        default: undefined
      },
      mapTypeId: {
        type: Number,
        default: undefined
      },
      draggable: {
        type: Boolean,
        default: undefined
      },
      scrollwheel: {
        type: Boolean,
        default: undefined
      },
      disableDoubleClick: {
        type: Boolean,
        default: undefined
      },
      disableDoubleClickZoom: {
        type: Boolean,
        default: undefined
      },
      projectionId: {
        type: String,
        default: undefined
      },
      tileAnimation: {
        type: Boolean,
        default: undefined
      },
      keyboardShortcuts: {
        type: [Boolean, Object],
        default: undefined
      }
    },
    data: () => ({
      map: null
    }),
    mounted () {
      loadScriptOnce(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.appKey}&libraries=${this.libraries.join(',')}`)
        .then(() => {
          daum.maps.load(() => {
            this.render();
            this.bindEvents();
            this.$emit('load', this.map);
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    watch: {
      level () {
        if (!this.map) {
          return;
        }

        this.map.setLevel(this.level);
      },
      center : {
        handler () {
          if (!this.map) {
            return;
          }

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
          mapTypeId: this.mapTypeId, //지도 타입
          draggable: this.draggable,
          scrollwheel: this.scrollwheel,
          disableDoubleClick: this.disableDoubleClick,
          disableDoubleClickZoom: this.disableDoubleClickZoom,
          projectionId: this.projectionId,
          tileAnimation: this.tileAnimation,
          keyboardShortcuts: this.keyboardShortcuts
        };

        this.map = new daum.maps.Map(this.$el, options); //지도 생성 및 객체 리턴
      },
      bindEvents () {
        const handlers = {
          bounds_changed: this.onChange,
          idle: this.onChange
        };

        for (let event of EVENTS) {
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