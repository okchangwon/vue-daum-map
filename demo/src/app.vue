<template>
  <div>
    <h1>Vue Daum Map Demo</h1>

    <vue-daum-map

      :appKey="appKey"

      :center.sync="center"
      :level.sync="level"

      @load="onLoad"

      @center_changed="onMapEvent('center_changed', $event)"
      @zoom_start="onMapEvent('zoom_start', $event)"
      @zoom_changed="onMapEvent('zoom_changed', $event)"
      @bounds_changed="onMapEvent('bounds_changed', $event)"
      @click="onMapEvent('click', $event)"
      @dblclick="onMapEvent('dblclick', $event)"
      @rightclick="onMapEvent('rightclick', $event)"
      @mousemove="onMapEvent('mousemove', $event)"
      @dragstart="onMapEvent('dragstart', $event)"
      @drag="onMapEvent('drag', $event)"
      @dragend="onMapEvent('dragend', $event)"
      @idle="onMapEvent('idle', $event)"
      @tilesloaded="onMapEvent('tilesloaded', $event)"
      @maptypeid_changed="onMapEvent('maptypeid_changed', $event)"

      style="width:500px;height:400px;">
    </vue-daum-map>

    <h2>Options</h2>
    Level : {{level}} <input type="range" min="1" max="14" v-model="level"><br />
    Latitude : <input type="number" v-model="center.lat" step="0.0001"><br />
    Longitude : <input type="number" v-model="center.lng" step="0.0001"><br />
  </div>
</template>

<script>
  import VueDaumMap from 'VueDaumMap';
  import config from './config';

  export default {
    name: 'App',
    components: {VueDaumMap},
    data: () => ({
      appKey: config.appKey,
      center: {lat:33.450701, lng:126.570667},
      level: 3,
      mapObject: null
    }),
    methods: {
      onLoad (map) {
        // 지도의 현재 영역을 얻어옵니다
        var bounds = map.getBounds();

        // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
        var boundsStr = bounds.toString();

        console.log('Daum Map Loaded', boundsStr);

        this.mapObject = map;
      },
      onMapEvent (event, params) {
        console.log(`Daum Map Event(${event})`, params);
      }
    }
  }
</script>