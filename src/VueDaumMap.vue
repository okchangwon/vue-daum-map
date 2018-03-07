<template>
  <div></div>
</template>

<script>
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
      }
    },
    data: () => ({
      scriptIsLoaded: false,
      libraryIsLoaded: false,
      map: null
    }),
    mounted () {
      this.loadLibrary(() => {
        this.render();
        this.bindEvents();
        this.$emit('load', this.map);
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
      loadLibrary (callback) {
        if (this.libraryIsLoaded) {
          if (typeof callback === 'function') {
            callback();
          }
          return;
        }

        if(!this.scriptIsLoaded) {
          this.scriptIsLoaded = true;

          const head= document.getElementsByTagName('head')[0];
          const script= document.createElement('script');
          const onload = () => {
            daum.maps.load(() => {
              this.libraryIsLoaded = true;
              if (typeof callback === 'function') {
                callback();
              }
            });
          };
          const onerror = () => {
            this.scriptIsLoaded = false;
          };

          script.type = 'text/javascript';
          script.onreadystatechange = function () {
            if (this.readyState == 'complete'
              || this.readyState == 'loaded') onload();
          }
          script.onload = onload;
          script.onerror = onerror;
          script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' + this.appKey;
          head.appendChild(script)
        }
      },
      render () {
        const options = { //지도를 생성할 때 필요한 기본 옵션
          center: new daum.maps.LatLng(this.center.lat, this.center.lng), //지도의 중심좌표.
          level: this.level //지도의 레벨(확대, 축소 정도)
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
    }
  }
</script>

<style scoped>
</style>