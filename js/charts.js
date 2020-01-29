function loadBarChart(labels, series, name, modelData) {

    var options = {
        series: [{
            name: name,
            data: series
        }],
        chart: {
            height: '100%',
            type: 'bar',
            events: {
                dataPointSelection: function (event, chartContext, config) {
                    console.log(config)
                    console.log(config.w.config.xaxis.categories[config.dataPointIndex])
                    let value = config.w.config.xaxis.categories[config.dataPointIndex]
                    let ids = modelData[name][value];
                    NOP_VIEWER.isolate(ids);
                }
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: labels,
            position: 'top',
            labels: {
                offsetY: -18,

            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
                offsetY: -35,

            }
        },
        fill: {
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100]
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }

        },
        title: {
            text: name,
            floating: true,
            offsetY: 320,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#bar-chart"), options);
    chart.render();
}



function loadPieChart(labels, series, name, modelData) {

    var options = {
        series: series,
        chart: {
            // height: '100%',
            width: '100%',
            type: 'pie',
            events: {
                dataPointSelection: function (event, chartContext, config) {
                    console.log(config.w.config.labels[config.dataPointIndex])
                    let value = config.w.config.labels[config.dataPointIndex]
                    let ids = modelData[name][value];
                    NOP_VIEWER.isolate(ids);
                }
            }
        },
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart = new ApexCharts(document.querySelector("#pie-chart"), options);
    chart.render();
}