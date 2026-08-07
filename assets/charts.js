(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var danger = style.getPropertyValue('--danger').trim();
  var warn = style.getPropertyValue('--warn').trim();
  var palette = [accent, accent2, warn, danger, accent + '99', accent2 + '99', muted];

  function initChart(id) {
    var el = document.getElementById(id);
    if (!el || !window.echarts) return null;
    return echarts.init(el, null, { renderer: 'svg' });
  }

  function baseText() {
    return {
      color: muted,
      fontFamily: 'Instrument Sans'
    };
  }

  var platformShare = initChart('chart-platform-share');
  if (platformShare) {
    platformShare.setOption({
      animation: false,
      color: palette,
      tooltip: { trigger: 'item', appendToBody: true },
      legend: {
        bottom: 0,
        left: 'center',
        textStyle: baseText(),
        itemWidth: 10,
        itemHeight: 10
      },
      series: [{
        name: '销售额占比',
        type: 'pie',
        radius: ['42%', '66%'],
        center: ['50%', '43%'],
        avoidLabelOverlap: true,
        label: {
          color: ink,
          formatter: '{b}\\n{d}%'
        },
        labelLine: { lineStyle: { color: rule } },
        data: [
          { value: 32, name: '天猫' },
          { value: 20, name: '京东' },
          { value: 16, name: '拼多多' },
          { value: 14, name: '抖音' },
          { value: 10, name: '快手' },
          { value: 8, name: '小红书' }
        ]
      }]
    });
    window.addEventListener('resize', function() { platformShare.resize(); });
  }

  var salesTrend = initChart('chart-sales-trend');
  if (salesTrend) {
    salesTrend.setOption({
      animation: false,
      color: [accent, accent2],
      tooltip: { trigger: 'axis', appendToBody: true },
      legend: {
        top: 0,
        textStyle: baseText()
      },
      grid: { left: 38, right: 38, top: 44, bottom: 34 },
      xAxis: {
        type: 'category',
        data: ['3月', '4月', '5月', '6月', '7月', '8月'],
        axisLabel: { color: muted },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          name: '销售额(万)',
          nameTextStyle: { color: muted },
          axisLabel: { color: muted },
          splitLine: { lineStyle: { color: rule } }
        },
        {
          type: 'value',
          name: '毛利率',
          nameTextStyle: { color: muted },
          axisLabel: { color: muted, formatter: '{value}%' },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '渠道销售额',
          type: 'bar',
          barWidth: 18,
          itemStyle: { borderRadius: [8, 8, 0, 0] },
          data: [610, 690, 735, 802, 826, 864]
        },
        {
          name: '整体毛利率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          symbolSize: 7,
          lineStyle: { width: 3 },
          areaStyle: { color: accent2 + '1f' },
          data: [21.6, 22.4, 23.1, 22.8, 23.4, 23.8]
        }
      ]
    });
    window.addEventListener('resize', function() { salesTrend.resize(); });
  }

  var inventory = initChart('chart-inventory');
  if (inventory) {
    inventory.setOption({
      animation: false,
      color: [accent],
      tooltip: { trigger: 'axis', appendToBody: true },
      grid: { left: 78, right: 24, top: 16, bottom: 28 },
      xAxis: {
        type: 'value',
        axisLabel: { color: muted },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: ['应急电源', '玻璃水', '脚垫', '雨刷', '养护品', '空调滤芯'],
        axisLabel: { color: muted },
        axisTick: { show: false },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        name: '销量(千件)',
        type: 'bar',
        barWidth: 14,
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: function(params) {
            return params.dataIndex < 2 ? danger : params.dataIndex === 2 ? warn : accent2;
          }
        },
        data: [116, 68, 55, 42, 31, 14]
      }]
    });
    window.addEventListener('resize', function() { inventory.resize(); });
  }
})();
