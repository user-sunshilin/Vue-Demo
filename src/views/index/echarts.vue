<template>
  <div class="echarts">
    <ul>
      <li>
        <div class="box1" style="width: 100%; height: 100%"></div>
      </li>
      <li>
        <div class="box2" style="width: 100%; height: 100%"></div>
      </li>
      <li>
        <div class="box3" style="width: 100%; height: 100%"></div>
      </li>
      <li>
        <div class="box4" style="width: 100%; height: 100%"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getEcharts } from "@/http/api";
export default {
  name: "echarts",
  mounted() {
    getEcharts().then((res) => {
      this.getBox1(res.data.data.dataList);
    });
    this.getBox2();
    this.getBox3();
    this.getBox4();
  },
  methods: {
    getBox4() {
      var myChart = echarts.init(document.getElementsByClassName("box4")[0]);
      var categoryData = [];
      var errorData = [];
      var barData = [];
      var dataCount = 100;
      for (var i = 0; i < dataCount; i++) {
        var val = Math.random() * 1000;
        categoryData.push("category" + i);
        errorData.push([
          i,
          echarts.number.round(Math.max(0, val - Math.random() * 100)),
          echarts.number.round(val + Math.random() * 80),
        ]);
        barData.push(echarts.number.round(val, 2));
      }

      function renderItem(params, api) {
        var xValue = api.value(0);
        var highPoint = api.coord([xValue, api.value(1)]);
        var lowPoint = api.coord([xValue, api.value(2)]);
        var halfWidth = api.size([1, 0])[0] * 0.1;
        var style = api.style({
          stroke: api.visual("color"),
          fill: null,
        });

        return {
          type: "group",
          children: [
            {
              type: "line",
              transition: ["shape"],
              shape: {
                x1: highPoint[0] - halfWidth,
                y1: highPoint[1],
                x2: highPoint[0] + halfWidth,
                y2: highPoint[1],
              },
              style: style,
            },
            {
              type: "line",
              transition: ["shape"],
              shape: {
                x1: highPoint[0],
                y1: highPoint[1],
                x2: lowPoint[0],
                y2: lowPoint[1],
              },
              style: style,
            },
            {
              type: "line",
              transition: ["shape"],
              shape: {
                x1: lowPoint[0] - halfWidth,
                y1: lowPoint[1],
                x2: lowPoint[0] + halfWidth,
                y2: lowPoint[1],
              },
              style: style,
            },
          ],
        };
      }

      var option = {
        textStyle:{
          color:'#ffffff'
        },
        backgroundColor:'#100C2A',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        title: {
          text: "Error bar chart",
          backgroundColor:'#ffffff'
        },
        legend: {
          data: ["bar", "error"],
        },
        dataZoom: [
          {
            type: "slider",
            start: 50,
            end: 70,
          },
          {
            type: "inside",
            start: 50,
            end: 70,
          },
        ],
        xAxis: {
          data: categoryData,
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            name: "bar",
            data: barData,
            itemStyle: {
              color: "#77bef7",
            },
          },
          {
            type: "custom",
            name: "error",
            itemStyle: {
              normal: {
                borderWidth: 1.5,
              },
            },
            renderItem: renderItem,
            encode: {
              x: 0,
              y: [1, 2],
            },
            data: errorData,
            z: 100,
          },
        ],
      };
      myChart.setOption(option);
    },
    getBox3() {
      var myChart = echarts.init(document.getElementsByClassName("box3")[0]);
      // Generate data
      var category = [];
      var dottedBase = +new Date();
      var lineData = [];
      var barData = [];

      for (var i = 0; i < 20; i++) {
        var date = new Date((dottedBase += 3600 * 24 * 1000));
        category.push(
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
        );
        var b = Math.random() * 200;
        var d = Math.random() * 200;
        barData.push(b);
        lineData.push(d + b);
      }

      // option
      var option = {
        textStyle:{
          color:'#ffffff'
        },
        backgroundColor: "#0f375f",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["line", "bar"],
          textStyle: {
            color: "#ccc",
          },
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        series: [
          {
            name: "line",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 15,
            data: lineData,
          },
          {
            name: "bar",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" },
              ]),
            },
            data: barData,
          },
          {
            name: "line",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(20,200,212,0.5)" },
                { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                { offset: 1, color: "rgba(20,200,212,0)" },
              ]),
            },
            z: -12,
            data: lineData,
          },
          {
            name: "dotted",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
              color: "#0f375f",
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData,
          },
        ],
      };
      myChart.setOption(option);
    },
    getBox2() {
      var myChart = echarts.init(document.getElementsByClassName("box2")[0]);
      var dataBJ = [
        [1, 55, 9, 56, 0.46, 18, 6, "良"],
        [2, 25, 11, 21, 0.65, 34, 9, "优"],
        [3, 56, 7, 63, 0.3, 14, 5, "良"],
        [4, 33, 7, 29, 0.33, 16, 6, "优"],
        [5, 42, 24, 44, 0.76, 40, 16, "优"],
        [6, 82, 58, 90, 1.77, 68, 33, "良"],
        [7, 74, 49, 77, 1.46, 48, 27, "良"],
        [8, 78, 55, 80, 1.29, 59, 29, "良"],
        [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
        [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
        [11, 39, 19, 38, 0.57, 31, 15, "优"],
        [12, 41, 11, 40, 0.43, 21, 7, "优"],
        [13, 64, 38, 74, 1.04, 46, 22, "良"],
        [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
        [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
        [16, 33, 6, 29, 0.34, 13, 5, "优"],
        [17, 94, 66, 110, 1.54, 62, 31, "良"],
        [18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
        [19, 57, 31, 54, 0.96, 32, 14, "良"],
        [20, 22, 8, 17, 0.48, 23, 10, "优"],
        [21, 39, 15, 36, 0.61, 29, 13, "优"],
        [22, 94, 69, 114, 2.08, 73, 39, "良"],
        [23, 99, 73, 110, 2.43, 76, 48, "良"],
        [24, 31, 12, 30, 0.5, 32, 16, "优"],
        [25, 42, 27, 43, 1, 53, 22, "优"],
        [26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
        [27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
        [28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
        [29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
        [30, 52, 24, 60, 1.03, 50, 21, "良"],
        [31, 46, 5, 49, 0.28, 10, 6, "优"],
      ];

      var dataGZ = [
        [1, 26, 37, 27, 1.163, 27, 13, "优"],
        [2, 85, 62, 71, 1.195, 60, 8, "良"],
        [3, 78, 38, 74, 1.363, 37, 7, "良"],
        [4, 21, 21, 36, 0.634, 40, 9, "优"],
        [5, 41, 42, 46, 0.915, 81, 13, "优"],
        [6, 56, 52, 69, 1.067, 92, 16, "良"],
        [7, 64, 30, 28, 0.924, 51, 2, "良"],
        [8, 55, 48, 74, 1.236, 75, 26, "良"],
        [9, 76, 85, 113, 1.237, 114, 27, "良"],
        [10, 91, 81, 104, 1.041, 56, 40, "良"],
        [11, 84, 39, 60, 0.964, 25, 11, "良"],
        [12, 64, 51, 101, 0.862, 58, 23, "良"],
        [13, 70, 69, 120, 1.198, 65, 36, "良"],
        [14, 77, 105, 178, 2.549, 64, 16, "良"],
        [15, 109, 68, 87, 0.996, 74, 29, "轻度污染"],
        [16, 73, 68, 97, 0.905, 51, 34, "良"],
        [17, 54, 27, 47, 0.592, 53, 12, "良"],
        [18, 51, 61, 97, 0.811, 65, 19, "良"],
        [19, 91, 71, 121, 1.374, 43, 18, "良"],
        [20, 73, 102, 182, 2.787, 44, 19, "良"],
        [21, 73, 50, 76, 0.717, 31, 20, "良"],
        [22, 84, 94, 140, 2.238, 68, 18, "良"],
        [23, 93, 77, 104, 1.165, 53, 7, "良"],
        [24, 99, 130, 227, 3.97, 55, 15, "良"],
        [25, 146, 84, 139, 1.094, 40, 17, "轻度污染"],
        [26, 113, 108, 137, 1.481, 48, 15, "轻度污染"],
        [27, 81, 48, 62, 1.619, 26, 3, "良"],
        [28, 56, 48, 68, 1.336, 37, 9, "良"],
        [29, 82, 92, 174, 3.29, 0, 13, "良"],
        [30, 106, 116, 188, 3.628, 101, 16, "轻度污染"],
        [31, 118, 50, 0, 1.383, 76, 11, "轻度污染"],
      ];

      var dataSH = [
        [1, 91, 45, 125, 0.82, 34, 23, "良"],
        [2, 65, 27, 78, 0.86, 45, 29, "良"],
        [3, 83, 60, 84, 1.09, 73, 27, "良"],
        [4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
        [5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
        [6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
        [7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
        [8, 89, 65, 78, 0.86, 51, 26, "良"],
        [9, 53, 33, 47, 0.64, 50, 17, "良"],
        [10, 80, 55, 80, 1.01, 75, 24, "良"],
        [11, 117, 81, 124, 1.03, 45, 24, "轻度污染"],
        [12, 99, 71, 142, 1.1, 62, 42, "良"],
        [13, 95, 69, 130, 1.28, 74, 50, "良"],
        [14, 116, 87, 131, 1.47, 84, 40, "轻度污染"],
        [15, 108, 80, 121, 1.3, 85, 37, "轻度污染"],
        [16, 134, 83, 167, 1.16, 57, 43, "轻度污染"],
        [17, 79, 43, 107, 1.05, 59, 37, "良"],
        [18, 71, 46, 89, 0.86, 64, 25, "良"],
        [19, 97, 71, 113, 1.17, 88, 31, "良"],
        [20, 84, 57, 91, 0.85, 55, 31, "良"],
        [21, 87, 63, 101, 0.9, 56, 41, "良"],
        [22, 104, 77, 119, 1.09, 73, 48, "轻度污染"],
        [23, 87, 62, 100, 1, 72, 28, "良"],
        [24, 168, 128, 172, 1.49, 97, 56, "中度污染"],
        [25, 65, 45, 51, 0.74, 39, 17, "良"],
        [26, 39, 24, 38, 0.61, 47, 17, "优"],
        [27, 39, 24, 39, 0.59, 50, 19, "优"],
        [28, 93, 68, 96, 1.05, 79, 29, "良"],
        [29, 188, 143, 197, 1.66, 99, 51, "中度污染"],
        [30, 174, 131, 174, 1.55, 108, 50, "中度污染"],
        [31, 187, 143, 201, 1.39, 89, 53, "中度污染"],
      ];

      var schema = [
        { name: "date", index: 0, text: "日期" },
        { name: "AQIindex", index: 1, text: "AQI" },
        { name: "PM25", index: 2, text: "PM2.5" },
        { name: "PM10", index: 3, text: "PM10" },
        { name: "CO", index: 4, text: " CO" },
        { name: "NO2", index: 5, text: "NO2" },
        { name: "SO2", index: 6, text: "SO2" },
        { name: "等级", index: 7, text: "等级" },
      ];

      var lineStyle = {
        normal: {
          width: 1,
          opacity: 0.5,
        },
      };

      var option = {
        backgroundColor: "#333",
        legend: {
          bottom: 30,
          data: ["北京", "上海", "广州"],
          itemGap: 20,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        tooltip: {
          padding: 10,
          backgroundColor: "#222",
          borderColor: "#777",
          borderWidth: 1,
        },
        // dataZoom: {
        //     show: true,
        //     orient: 'vertical',
        //     parallelAxisIndex: [0]
        // },
        parallelAxis: [
          {
            dim: 0,
            name: schema[0].text,
            inverse: true,
            max: 31,
            nameLocation: "start",
          },
          { dim: 1, name: schema[1].text },
          { dim: 2, name: schema[2].text },
          { dim: 3, name: schema[3].text },
          { dim: 4, name: schema[4].text },
          { dim: 5, name: schema[5].text },
          { dim: 6, name: schema[6].text },
          {
            dim: 7,
            name: schema[7].text,
            type: "category",
            data: ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"],
          },
        ],
        visualMap: {
          show: true,
          min: 0,
          max: 150,
          dimension: 2,
          inRange: {
            color: ["#d94e5d", "#eac736", "#50a3ba"].reverse(),
            // colorAlpha: [0, 1]
          },
        },
        parallel: {
          left: "5%",
          right: "18%",
          bottom: 100,
          parallelAxisDefault: {
            type: "value",
            name: "AQI指数",
            nameLocation: "end",
            nameGap: 20,
            nameTextStyle: {
              color: "#fff",
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: "#aaa",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#777",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "北京",
            type: "parallel",
            lineStyle: lineStyle,
            data: dataBJ,
          },
          {
            name: "上海",
            type: "parallel",
            lineStyle: lineStyle,
            data: dataSH,
          },
          {
            name: "广州",
            type: "parallel",
            lineStyle: lineStyle,
            data: dataGZ,
          },
        ],
      };
      myChart.setOption(option);
    },
    getBox1(_rawData) {
      var myChart = echarts.init(document.getElementsByClassName("box1")[0]);
      // 指定图表的配置项和数据
      var option = {
        backgroundColor: "#100C2A",
        dataset: [
          {
            id: "dataset_raw",
            source: _rawData,
          },
          {
            id: "dataset_since_1950_of_germany",
            fromDatasetId: "dataset_raw",
            transform: {
              type: "filter",
              config: {
                and: [
                  { dimension: "Year", gte: 1950 },
                  { dimension: "Country", "=": "Germany" },
                ],
              },
            },
          },
          {
            id: "dataset_since_1950_of_france",
            fromDatasetId: "dataset_raw",
            transform: {
              type: "filter",
              config: {
                and: [
                  { dimension: "Year", gte: 1950 },
                  { dimension: "Country", "=": "France" },
                ],
              },
            },
          },
        ],
        title: {
          text: "Income of Germany and France since 1950",
          backgroundColor:'#ffffff'
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          nameLocation: "middle",
        },
        yAxis: {
          name: "Income",
        },
        series: [
          {
            type: "line",
            datasetId: "dataset_since_1950_of_germany",
            showSymbol: false,
            encode: {
              x: "Year",
              y: "Income",
              itemName: "Year",
              tooltip: ["Income"],
            },
          },
          {
            type: "line",
            datasetId: "dataset_since_1950_of_france",
            showSymbol: false,
            encode: {
              x: "Year",
              y: "Income",
              itemName: "Year",
              tooltip: ["Income"],
            },
          },
        ],
        textStyle:{
          color:'#ffffff'
        }
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100vh;
  background: #100C2A;
  padding: 20px;
  box-sizing: border-box;
}
ul {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 49%;
    height: 48%;
    color: white;
  }
}
</style>