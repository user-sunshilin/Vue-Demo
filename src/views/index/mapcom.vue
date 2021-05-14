<template>
  <div class="mapcom">
    <div id="container"></div>
  </div>
</template>

<script>
import myStartIcon from "@/assets/img/start.png"
import myEndIcon from "@/assets/img/end.png"
export default {
  name: "mapcom",
  mounted() {
    // 创建地图实例
    var map = new AMap.Map("container", {
      zoom: 13,
      center: [116.4, 39.92],
      resizeEnable: true,
    });
    var startIcon = new AMap.Icon({
      // 图标尺寸
      size: new AMap.Size(40, 40),
      // 图标的取图地址
      image: myStartIcon,
      // 图标所用图片大小
      imageSize: new AMap.Size(40, 40),
      // 图标取图偏移量
      imageOffset: new AMap.Pixel(0, 0),
    });
    var startMarker = new AMap.Marker({
      position: new AMap.LngLat(116.1409050909462,39.72119200728765),
      icon: startIcon,
      offset: new AMap.Pixel(0,0),
    });

    var endIcon = new AMap.Icon({
      size: new AMap.Size(40, 40),
      image: myEndIcon,
      imageSize: new AMap.Size(40, 40),
      imageOffset: new AMap.Pixel(0, 0),
    });
    var endMarker = new AMap.Marker({
      position: new AMap.LngLat(116.217233271389, 40.23656668351736),
      icon: endIcon,
      offset: new AMap.Pixel(0, 0),
    });

    // 将 markers 添加到地图
    map.add([startMarker, endMarker]);
  },
};
</script>

<style lang="scss" scoped>
.mapcom {
  width: 100%;
  height: 100vh;
}
#container {
  width: 100%;
  height: 100%;
}
</style>