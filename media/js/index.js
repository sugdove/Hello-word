$.ajax({
    cache:true,
    url:"localhost.json",
    async:false,
    type:"get",
    success:function(data){
       var localhost = data[0].localhost;
//获取最上面一排的数据
/*$.ajax({
   cache:true,
    type:"get",
    url:"http://"+localhost+"/VirtualizationUnifiedBackup/getAllInfo",
    async:false,
    success:function(data){
        var RunTime = data[0].RunTime;
        var PlanTotalNum = data[0].PlanTotalNum;
        var StrategyRunNum = data[0].StrategyRunNum;
        if(PlanTotalNum==null){
            PlanTotalNum=0
        }
        $("#counter1").html(RunTime);
        $("#counter3").html(PlanTotalNum);
        $("#counter4").html(StrategyRunNum);
    }
});*/
//获取受保护和未受保护的虚拟机
        $.ajax({
            cache:true,
            url://"http://"+localhost+"/VirtualizationUnifiedBackup/getVmbkAndAll",
            "json/index.json",
            type:"get",
            async:false,
            success:function(data){
                var All = data.All;
                if(All!=0){
                    var Isbk =data.Isbk;
                    var nobk = All-Isbk;
                    var mychart = echarts.init(document.getElementById("backup_counts"));
                    option =   {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        color:["#428bca","#45b6af"],
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:['未受保护的虚拟机','受保护的虚拟机']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: false, readOnly: false},
                                magicType : {
                                    show: true,
                                    type: ['pie', 'red'],
                                    option: {
                                        funnel: {
                                            x: '25%',
                                            width: '50%',
                                            funnelAlign: 'left',
                                            max: 1548
                                        }
                                    }
                                },
                                saveAsImage : {show: false}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'受保护情况',
                                type:'pie',
                                radius : '55%',
                                center: ['50%', '40%'],
                                data:[

                                    {value:nobk, name:'未受保护的虚拟机'},
                                    {value:Isbk, name:'受保护的虚拟机'}

                                ]
                            }
                        ]
                    };

                    mychart.setOption(option);
                }
             else{
                    $(".zzq").show();
                }

            }
        });


//存储统计
        $.ajax({
            cache:true,
            url://"http://"+localhost+"/VirtualizationUnifiedBackup/getVmbkAndAll",
                "json/index.json",
            type:"get",
            async:false,
            success:function(data){
                var mychart2 = echarts.init(document.getElementById("storage_statistics"));
                option2 =   {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color:["#91c7ae","#bda29a"],
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        data:['可用空间','已用空间']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: false, readOnly: false},
                            magicType : {
                                show: true,
                                type: ['pie', 'red'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        width: '50%',
                                        funnelAlign: 'left',
                                        max: 1548
                                    }
                                }
                            },
                            saveAsImage : {show: false}
                        }
                    },
                    calculable : true,
                    series : [
                        {
                            name:'可用情况',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '40%'],
                            data:[

                                {value:50, name:'可用空间'},
                                {value:100, name:'已用空间'}

                            ]
                        }
                    ]
                };

                mychart2.setOption(option2);
            }
        })

    }
});

$('.counter').countUp();


/*
$.ajax({
    cache: true,
    url: "localhost.json",
    async: false,
    type: "get",
    success: function (data) {
        var localhost = data[0].localhost;

        $.ajax({
            cache: true,
            type: "get",
            url: "http://" + localhost + "/VirtualizationUnifiedBackup/mysqlConfExist",
            async: false,
            success: function (data) {
            if(data==-1){
                $.confirm({
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn-danger',
                    confirmButton:'确认',
                    cancelButton:'取消',
                    animation: 'zoom',
                    closeAnimation: 'rotateXR',
                    title: '没有进行系统配置！',
                    content: '即将跳转到配置管理界面（此确认框会在3秒后消失）',
                    autoClose: '确认|3000',
                    buttons: {
                        确认: function () {
                          window.location.href="pzmanager.html"
                        },
                    }
                });
            }
            }
        })
    }
});
*/

var Index = function () {

    return {

        //main function to initiate the module
        init: function () {

            App.addResponsiveHandler(function () {
                jQuery('.vmaps').each(function () {
                    var map = jQuery(this);
                    map.width(map.parent().width());
                });
            });
        },

        initCharts: function () {
            if (!jQuery.plot) {
                return;
            }

            var data = [];
            var totalPoints = 250;

            // random data generator for plot charts

            function getRandomData() {
                if (data.length > 0) data = data.slice(1);
                // do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50;
                    var y = prev + Math.random() * 10 - 5;
                    if (y < 0) y = 0;
                    if (y > 100) y = 100;
                    data.push(y);
                }
                // zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
                return res;
            }

            function getRandomData2() {
                if (data.length > 0) data = data.slice(1);
                // do a random walk
                while (data.length < totalPoints) {
                    var prev = data.length > 0 ? data[data.length - 1] : 50;
                    var y = prev + Math.random() * 10 - 5;
                    if (y < 0) y = 0;
                    if (y > 100) y = 100;
                    data.push(y);
                }
                // zip the generated y values with the x values
                var res = [];
                for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
                return res;
            }

            function showTooltip(title, x, y, contents) {
                $('<div id="tooltip" class="chart-tooltip"><div class="date">' + title + '<\/div><div class="label label-success">CTR: ' + x / 10 + '%<\/div><div class="label label-important">Imp: ' + x * 12 + '<\/div><\/div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y - 100,
                    width: 75,
                    left: x - 40,
                    border: '0px solid #ccc',
                    padding: '2px 6px',
                    'background-color': '#fff',
                }).appendTo("body").fadeIn(200);
            }

            function randValue() {
                return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
            }

            var pageviews = [
                [1, randValue()],
                [2, randValue()],
                [3, 2 + randValue()],
                [4, 3 + randValue()],
                [5, 5 + randValue()],
                [6, 10 + randValue()],
                [7, 15 + randValue()],
                [8, 20 + randValue()],
                [9, 25 + randValue()],
                [10, 30 + randValue()],
                [11, 35 + randValue()],
                [12, 25 + randValue()],
                [13, 15 + randValue()],
                [14, 20 + randValue()],
                [15, 45 + randValue()],
                [16, 50 + randValue()],
                [17, 65 + randValue()],
                [18, 70 + randValue()],
                [19, 85 + randValue()],
                [20, 80 + randValue()],
                [21, 75 + randValue()],
                [22, 80 + randValue()],
                [23, 75 + randValue()],
                [24, 70 + randValue()],
                [25, 65 + randValue()],
                [26, 75 + randValue()],
                [27, 80 + randValue()],
                [28, 85 + randValue()],
                [29, 90 + randValue()],
                [30, 95 + randValue()]
            ];

            var visitors = [
                [1, randValue() - 5],
                [2, randValue() - 5],
                [3, randValue() - 5],
                [4, 6 + randValue()],
                [5, 5 + randValue()],
                [6, 20 + randValue()],
                [7, 25 + randValue()],
                [8, 36 + randValue()],
                [9, 26 + randValue()],
                [10, 38 + randValue()],
                [11, 39 + randValue()],
                [12, 50 + randValue()],
                [13, 51 + randValue()],
                [14, 12 + randValue()],
                [15, 13 + randValue()],
                [16, 14 + randValue()],
                [17, 15 + randValue()],
                [18, 15 + randValue()],
                [19, 16 + randValue()],
                [20, 17 + randValue()],
                [21, 18 + randValue()],
                [22, 19 + randValue()],
                [23, 20 + randValue()],
                [24, 21 + randValue()],
                [25, 14 + randValue()],
                [26, 24 + randValue()],
                [27, 25 + randValue()],
                [28, 26 + randValue()],
                [29, 27 + randValue()],
                [30, 31 + randValue()]
            ];


            if ($('#load_statistics').size() != 0) {
                 //server load
                $('#load_statistics_loading').hide();
                $('#load_statistics_content').show();
        
                var updateInterval = 30;
                var plot_statistics = $.plot($("#load_statistics"), [getRandomData()], {
                series: {
                    shadowSize: 1
                },
                lines: {
                    show: true,
                    lineWidth: 0.2,
                    fill: true,
                    fillColor: {
                        colors: [{
                                opacity: 0.1
                            }, {
                                opacity: 1
                            }
                        ]
                    }
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    tickFormatter: function (v) {
                        return v + "%";
                    }
                },
                xaxis: {
                    show: false
                },
                colors: ["green"],
                grid: {
                    tickColor: "#a8a3a3",
                    borderWidth: 0
                }
                });
                
                function statisticsUpdate() {
                plot_statistics.setData([getRandomData()]);
                plot_statistics.draw();
                setTimeout(statisticsUpdate, updateInterval);
                
                }
                
                statisticsUpdate();

                $('#load_statistics').bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
            }










            if ($('#load_statistics2').size() != 0) {
                //server load
                $('#load_statistics_loading2').hide();
                $('#load_statistics_content2').show();

                var updateInterval2 = 1000;
                var plot_statistics2 = $.plot($("#load_statistics2"), [getRandomData2()], {
                    series: {
                        shadowSize: 1
                    },
                    lines: {
                        show: true,
                        lineWidth: 0.2,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 0.1
                            }, {
                                opacity: 1
                            }
                            ]
                        }
                    },
                    yaxis: {
                        min: 0,
                        max: 100,
                        tickFormatter: function (v) {
                            return v + "KB/s";
                        }
                    },
                    xaxis: {
                        show: false
                    },
                    colors: ["red"],
                    grid: {
                        tickColor: "#a8a3a3",
                        borderWidth: 0
                    }
                });

                function statisticsUpdate2() {
                    plot_statistics2.setData([getRandomData2()]);
                    plot_statistics2.draw();
                    setTimeout(statisticsUpdate2, updateInterval2);

                }

                statisticsUpdate2();

                $('#load_statistics2').bind("mouseleave", function () {
                    $("#tooltip").remove();
                });
            }
        },


    };

}();