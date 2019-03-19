/**
 * Created by suge on 2017/6/7.
 */
$('.timepicker1').timepicker({
    showMeridian:false,
});
$(function () {
    $("[data-toggle='popover']").popover();
});
function showtime(){
    var mydate =new Date();
    var t =mydate.toLocaleString();
    var time ="服务器时间:"+ t;
    $("#time_show").html(time);
    setTimeout(showtime,1000)
}
//下拉按钮
/*<div class="dropdown">
    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Dropdown
    <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
<li><a href="#">Something else here</a></li>
<li role="separator" class="divider"></li>
    <li><a href="#">Separated link</a></li>
</ul>
</div>*/
$(function(){
    showtime();
});
//折叠面板
$(".panel-heading").click(function(){
    if($(this).next(".panel-body").css("display")=="none") {
        $(".panel-body").slideUp();
        $(this).next(".panel-body").slideDown();
        $(".panel-heading-a").addClass("collapsed");
        $(this).children(".panel-heading-a").removeClass("collapsed")
    }
    else {
        $(this).next(".panel-body").slideUp();
        $(this).children(".panel-heading-a").addClass("collapsed")
    }
});
//磁盘全量备份标签页
$("#everyday").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyweek_show").hide();
    $("#everymonth_show").hide();
   $("#everyday_show").fadeIn();
});
$("#everyweek").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyday_show").hide();
    $("#everymonth_show").hide();
    $("#everyweek_show").fadeIn();

});
$("#everymonth").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyweek_show").hide();
    $("#everyday_show").hide();
    $("#everymonth_show").fadeIn();
});
//增量备份标签页
$("#everyday_1").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyweek_show_1").hide();
    $("#everymonth_show_1").hide();
    $("#everyday_show_1").fadeIn();
});
$("#everyweek_1").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyday_show_1").hide();
    $("#everymonth_show_1").hide();
    $("#everyweek_show_1").fadeIn();

});
$("#everymonth_1").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyweek_show_1").hide();
    $("#everyday_show_1").hide();
    $("#everymonth_show_1").fadeIn();
});
//全量备份标签页
$("#everyday_2").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyweek_show_2").hide();
    $("#everymonth_show_2").hide();
    $("#everyday_show_2").fadeIn();
});
$("#everyweek_2").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyday_show_2").hide();
    $("#everymonth_show_2").hide();
    $("#everyweek_show_2").fadeIn();

});
$("#everymonth_2").click(function(){
    $(this).parent("li").parent("ul").find("li").attr("class","");
    $(this).parent("li").attr("class","active");
    $("#everyweek_show_2").hide();
    $("#everyday_show_2").hide();
    $("#everymonth_show_2").fadeIn();
});
//选择一次性备份和按策略备份出现不同的区域
$("body").on("change","#backup_way",function(){
    if($("#backup_way").val()=="0"){
        $("#backup_1").show();
        $("#backup_2").hide();
    }
    if($("#backup_way").val()=="1"){
        $("#backup_2").show();
        $("#backup_1").hide();
    }
});
//通过选择的是策略备份还是手动备份在最后的确认配置页面进行不同的展示
$(".button-next").click(function(){
    //策略备份
   if($("#backup_way").val()==0){
       $("#name1").show();
       $("#name2").hide();
       $("#backup_strategy_1").hide();
       $("#backup_strategy_2").show();
       $("#name3").show();
       $("#name4").hide();
       var a ="";
       $("#backup_1").find(".panel-heading").each(function(){
       if($(this).find(".celue").text()!=""){
           var backup_way = $(this).find(".panel-heading-a").text();
           var celue1 =$(this).find(".celue").text();
           var celue =celue1.substring(1,3);
           var time  =$(this).find(".time").val();
           var date  =$(this).find(".date").val();
           var all = backup_way+":"+celue+date+","+time;
           a = a+all+";"
       }
       });
       var b = a.substring(0, a.length-1);
       $("#bktype-f23").val(b);
   }
   //手动备份
    else if($("#backup_way").val()==1){
       $("#backup_strategy_1").show();
       $("#backup_strategy_2").hide();
       $("#name2").show();
       $("#name1").hide();
       $("#name3").hide();
       $("#name4").show();

   }
    //选择手动备份时出现不可编辑别名
});
/*$(".button-next").click(function(){
   if($("#vmnameset-id").val()==""||$("#vmidset-id").val()==""){
       $.confirm({
           confirmButtonClass: 'btn btn-info',
           cancelButtonClass: 'btn-danger',
           confirmButton:'确认',
           cancelButton:'取消',
           animation: 'zoom',
           closeAnimation: 'rotateXR',
           title: '操作错误！',
           content: '请选择虚拟机！（此确认框会在8秒后消失）',
           autoClose: '返回|8000',
           buttons: {
               返回: function () {

               },
           }
       });
   }
});*/
//点击确定的样式
$(".day").click(function(){
    var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
    var this_body = $(this).parent().parent().parent(".tab-pane ");
    var time = this_body.find(".timepicker1").val();
        panel_heading.find(".celue").html("(每天策略)");
        panel_heading.find(".time").val(time);
        panel_heading.next(".panel-body").slideUp();
});
$(".week").click(function(){
    var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
    var this_body = $(this).parent().parent().parent(".tab-pane ");
    if(this_body.find("input[type='checkbox']:checked").length ==0){
        this_body.find(".alert-danger").remove();
       this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每周的策略</div>")
    }
    else {
        var time = this_body.find(".timepicker1").val();
        var date1 = "";
        this_body.find("input[type='checkbox']").each(function(){
            if($(this).prop("checked")==true){
                date1 = date1 +$(this).val()+","
            }
        });
        var date = date1.substring(0,date1.length-1);
        this_body.find(".alert-danger").remove();
        panel_heading.find(".celue").html("(每周策略)");
        panel_heading.find(".time").val(time);
        panel_heading.find(".date").val(date);
        panel_heading.next(".panel-body").slideUp();
    }

});
$(".month").click(function(){
    var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
    var this_body = $(this).parent().parent().parent(".tab-pane ");
    if(this_body.find("input[type='checkbox']:checked").length ==0){
        this_body.find(".alert-danger").remove();
        this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每月的策略</div>")
    }
    else {
        var time = this_body.find(".timepicker1").val();
        var date1 = "";
        this_body.find("input[type='checkbox']").each(function(){
            if($(this).prop("checked")==true){
                date1 = date1 +$(this).val()+","
            }
        });
        var date = date1.substring(0,date1.length-1);
        this_body.find(".alert-danger").remove();
        panel_heading.find(".time").val(time);
        panel_heading.find(".celue").html("(每月策略)");
        panel_heading.find(".date").val(date);
        panel_heading.next(".panel-body").slideUp();
    }
});
//增量点击确定样式
$(".z-day").click(function(){
    var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
    var this_body = $(this).parent().parent().parent(".tab-pane ");
    var time = this_body.find(".timepicker1").val();
    if($(".celue").eq(0).text()==""){
        $.confirm({
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn-danger',
            confirmButton:'确认',
            cancelButton:'取消',
            animation: 'zoom',
            closeAnimation: 'rotateXR',
            title: '操作错误！',
            content: '选择增量备份前必须有全量备份（此确认框会在3秒后消失）',
            autoClose: '确认|3000',
            buttons: {
                确认: function () {

                },
            }
        });
    }
    else {
        panel_heading.find(".celue").html("(每天策略)");
        panel_heading.find(".time").val(time);
        panel_heading.next(".panel-body").slideUp();
    }
});
$(".z-week").click(function() {
    var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
    var this_body = $(this).parent().parent().parent(".tab-pane ");
    if (this_body.find("input[type='checkbox']:checked").length == 0) {
        this_body.find(".alert-danger").remove();
        this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每周的策略</div>")
    }
    else {
        if ($(".celue").eq(0).text() == "") {
            $.confirm({
                confirmButtonClass: 'btn btn-info',
                cancelButtonClass: 'btn-danger',
                confirmButton: '确认',
                cancelButton: '取消',
                animation: 'zoom',
                closeAnimation: 'rotateXR',
                title: '操作错误！',
                content: '选择增量备份前必须有全量备份（此确认框会在3秒后消失）',
                autoClose: '确认|3000',
                buttons: {
                    确认: function () {

                    },
                }
            });
        }
        else {

        var time = this_body.find(".timepicker1").val();
        var date1 = "";
        this_body.find("input[type='checkbox']").each(function () {
            if ($(this).prop("checked") == true) {
                date1 = date1 + $(this).val() + ","
            }
        });
        var date = date1.substring(0, date1.length - 1);
        this_body.find(".alert-danger").remove();
        panel_heading.find(".celue").html("(每周策略)");
        panel_heading.find(".time").val(time);
        panel_heading.find(".date").val(date);
        panel_heading.next(".panel-body").slideUp();
    }
}
});
$(".z-month").click(function(){
    var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
    var this_body = $(this).parent().parent().parent(".tab-pane ");
    if(this_body.find("input[type='checkbox']:checked").length ==0){
        this_body.find(".alert-danger").remove();
        this_body.prepend("<div class='alert alert-danger' role='alert'>请选择每月的策略</div>")
    }
    else {
        if ($(".celue").eq(0).text() == "") {
            $.confirm({
                confirmButtonClass: 'btn btn-info',
                cancelButtonClass: 'btn-danger',
                confirmButton: '确认',
                cancelButton: '取消',
                animation: 'zoom',
                closeAnimation: 'rotateXR',
                title: '操作错误！',
                content: '选择增量备份前必须有全量备份（此确认框会在3秒后消失）',
                autoClose: '确认|3000',
                buttons: {
                    确认: function () {

                    },
                }
            });
        }
        else {
            var time = this_body.find(".timepicker1").val();
            var date1 = "";
            this_body.find("input[type='checkbox']").each(function () {
                if ($(this).prop("checked") == true) {
                    date1 = date1 + $(this).val() + ","
                }
            });
            var date = date1.substring(0, date1.length - 1);
            this_body.find(".alert-danger").remove();
            panel_heading.find(".time").val(time);
            panel_heading.find(".celue").html("(每月策略)");
            panel_heading.find(".date").val(date);
            panel_heading.next(".panel-body").slideUp();
        }
    }
});
//点击取消时的样式
$(".b2").click(function(){
    var panel_heading = $(this).parent().parent().parent().parent().parent().parent(".panel-default").children(".panel-heading");
    panel_heading.find(".celue").html("");
    panel_heading.find(".time").val("");
    panel_heading.find(".date").val("");
});
//<div class="alert alert-danger" role="alert">5555</div>
//
$.ajax({
    cache: true,
    type: "get",
    url: 'localhost.json',
    dataType: "json",
    async: true,
    success: function (data) {

        var localhost = data[0].localhost;
        $.ajax({
            cache: true,
            type: "get",
            url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getVirtCentList?parameter=vccreattime,vcip,vcid",
            "json/backup1.json",
            dataType: "json",
            async: false,
            success: function (data) {
                var length = data.length;
                var i = 0;

                for (i; i < length; i++) {
                    var vcip = data[i].vcip;
                    var vccreattime = data[i].vccreattime;
                    var vcid = data[i].vcid;
                    $("#vmware-list").append("<li class='vcip_li' title='最后更新时间: " + vccreattime + "'><span class='vcid_li'>" + vcid + "</span><img src='media/image/vmware.png'>" + vcip + "</li>")
                }
                $(".vcip_li").click(function () {
                    $("#sample_1").dataTable().fnDestroy();
                    $(".vcip_li").removeClass("eee");
                    $(this).addClass("eee");
                    var vcid = $(this).find(".vcid_li").text();
                    $("#alert-info").hide();
                    $("#vcid-id").val(vcid);
                        $.ajax({
                            cache: true,
                            type: "get",
                            url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getVmlist?vcid="+vcid,
                            "json/backup2.json",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                var length = data.length;
                                var i = 0;
                                $("#v_tbody").find("tr").remove();
                                $("#table_div").show();
                                for (i; i < length; i++) {
                                    var vmname = data[i].vmname;
                                    var vmid = data[i].vmid;
                                    var vmnum = i + 1;
                                    var isbackup = data[i].isbackup;
                                    if(isbackup=="0") {
                                        $("#v_tbody").append("<tr class='odd gradeX' ><td class='sorting_1'><input type='checkbox'class='checkboxes' name='gender[]' value='" + vmname + "'></td><td>" + vmnum + "</td><td>" + vmname + "</td><td>" + vmid + "</td><td><span class='label label-success'>未进行</span></td></tr>")
                                    }
                                    else if(isbackup=="1"){
                                        $("#v_tbody").append("<tr class='odd gradeX' style='cursor: not-allowed'><td class='sorting_1'><input type='checkbox'class='checkboxes' disabled name='gender[]' value='" + vmname + "'></td><td>" + vmnum + "</td><td>" + vmname + "</td><td>" + vmid + "</td><td><span class='label label-warning'>备份中</span></td></tr>")
                                    }
                                }

                                if (!jQuery().uniform) {
                                    return;
                                }
                                var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
                                if (test.size() > 0) {
                                    test.each(function () {
                                        if ($(this).parents(".checker").size() == 0) {
                                            $(this).show();
                                            $(this).uniform();
                                        }
                                    });
                                }

                                $('#sample_1').dataTable({
                                    "aLengthMenu": [
                                        [5, 10],
                                        [5, 10] // change per page values here
                                    ],
                                    "aoColumnDefs": [
                                        {"orderable": false, "aTargets": [0]}// 制定列不参与排序
                                    ],
                                    // set the initial value
                                    "iDisplayLength": 10,
                                    "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                                    "sPaginationType": "bootstrap",
                                    language: {
                                        "sProcessing": "处理中...",
                                        "sLengthMenu": "显示 _MENU_ 项结果",
                                        "sZeroRecords": "没有匹配结果",
                                        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                                        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                                        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                                        "sInfoPostFix": "",
                                        "sSearch": "搜索:",
                                        "sUrl": "",
                                        "sEmptyTable": "表中数据为空",
                                        "sLoadingRecords": "载入中...",
                                        "sInfoThousands": ",",
                                        "oPaginate": {
                                            "sFirst": "首页",
                                            "sPrevious": "上页",
                                            "sNext": "下页",
                                            "sLast": "末页"
                                        },
                                        "oAria": {
                                            "sSortAscending": ": 以升序排列此列",
                                            "sSortDescending": ": 以降序排列此列"
                                        }
                                    },
                                    "aaSorting": [[4, "desc"]],//默认第几个排序
                                });
                                $("body").on("change",".checkboxes",function () {
                                    $("#backup_way").val("1");
                                    $("#backup_2").show();
                                    $("#backup_1").hide();
                                    var a1 = "";
                                    $("#v_tbody").find(".checkboxes").each(function () {
                                        if ($(this).prop("checked") == true) {
                                            var vmid = $(this).parent().parent().parent("td").parent("tr").find("td").eq(3).text();
                                            a1 = a1 + vmid + ",";
                                        }
                                    });
                                    var a = a1.substring(0,a1.length-1);
                                    $("#vmidset-id").val(a);
                                    var b1 = "";
                                    $("#v_tbody").find(".checkboxes").each(function () {
                                        if ($(this).prop("checked") == true) {
                                            var vmname = $(this).parent().parent().parent("td").parent("tr").find("td").eq(2).text();
                                            b1 = b1 + vmname + ",";
                                        }
                                    });
                                    var b =b1.substring(0,b1.length-1);
                                    $("#vmnameset-id").val(b);
                                })
                            }
                        })
                })
            }
        });

        $(".button-submit").click(function(){
            var vcid =$("#vcid-f").text();
            var vmidset =$("#vmidset-f").text();
            var vmnameset =$("#vmnameset-f").text().toString();
            console.log(vmnameset);
            var exetype =$("#backup_way").val();
            var bktype =$("#bktype-id").val();
            var msg =$("#msg-f").text();
            var threadnum =$("#threadnum-f").text();
            var VirtCentType = $("#VirtCentType").val();
            console.log(VirtCentType)
            var IsUse1;
            var IsUse2;
            var IsUse3;
            var Exetype1;
            var Exetype2;
            var Exetype3;
            var time1 = $(".panel-heading").eq(0).find(".time").val();
            var time2 = $(".panel-heading").eq(1).find(".time").val();
            var time3 = $(".panel-heading").eq(2).find(".time").val();
            var date1 = $(".panel-heading").eq(0).find(".date").val();
            var date2 = $(".panel-heading").eq(1).find(".date").val();
            var date3 = $(".panel-heading").eq(2).find(".date").val();

            switch($(".panel-heading").eq(0).find(".celue").text()){
                case "":
                    IsUse1 = 1;
                    break;
                case "(每天策略)":
                    Exetype1 = 1;
                    IsUse1 = 0;
                    break;
                case "(每周策略)":
                    IsUse1 = 0;
                    Exetype1 = 2;
                    break;
                case "(每月策略)":
                    IsUse1 = 0;
                    Exetype1 = 3;
                    break;
            }
            switch($(".panel-heading").eq(1).find(".celue").text()){
                case "":
                    IsUse2 = 1;
                    break;
                case "(每天策略)":
                    Exetype2 = 1;
                    IsUse2 = 0;
                    break;
                case "(每周策略)":
                    Exetype2 = 2;
                    IsUse2 = 0;
                    break;
                case "(每月策略)":
                    Exetype2 = 3;
                    IsUse2 = 0;
                    break;
            }
            switch($(".panel-heading").eq(2).find(".celue").text()){
                case "":
                    IsUse3 = 1;
                    break;
                case "(每天策略)":
                    Exetype3 = 1;
                    IsUse3 = 0;
                    break;
                case "(每周策略)":
                    Exetype3 = 2;
                    IsUse3 = 0;
                    break;
                case "(每月策略)":
                    IsUse3 = 0;
                    Exetype3 = 3;
                    break;
            }

            var strategy1 = {
                "strategy": {
                    "VirtCentType":VirtCentType,
                    "Name": msg,
                    "Vmname": vmnameset,
                    "VmId": vmidset,
                    "Vcid": vcid,
                    "Backup": {
                        "1": {
                            "IsUse": IsUse1,
                            "Exetype": Exetype1,
                            "Time": time1,
                            "Date": date1
                        },
                        "2": {
                            "IsUse": IsUse2,
                            "Exetype": Exetype2,
                            "Time": time2,
                            "Date": date2
                        },
                        "3": {
                            "IsUse": IsUse3,
                            "Exetype": Exetype3,
                            "Time": time3,
                            "Date": date3
                        }
                    }
                }
            };
            var strategy = JSON.stringify(strategy1);
            //手动备份
            if(exetype==1) {
                $.ajax({
                    url: "http://" + localhost + "/VirtualizationUnifiedBackup/addManuaPlane?vcid=" + vcid + "&vmidset=" + vmidset + "&vmnameset=" + vmnameset + "&bktype=" + bktype + "&threadum=" + threadnum + "&exetype=" + exetype + "&msg=" + msg,
                    cache: true,
                    type: "post",
                    async: false,
                    success: function (data) {
                        //这里的-1是BUG后期会进行修改
                        if (data == 0) {
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '添加成功！',
                                content: '即将跳转到备份计划页面（此确认框会在2秒后消失）',
                                autoClose: '确定|2000',
                                buttons: {
                                    确定: function () {
                                        location.href = "all_task.html";
                                    }
                                }
                            });
                        }
                        else if(data == -1) {
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '添加失败！',
                                content: '即将跳转到备份计划页面（此确认框会在2秒后消失）',
                                autoClose: '确认|2000',
                                buttons: {
                                    确定: function () {
                                        location.href = "all_task.html";
                                    }
                                }
                            });
                        }
                    }
                })
            }
            //按策略备份
           if(exetype==0){
              $.ajax({
                    url: "http://" + localhost + "/VirtualizationUnifiedBackup/addStrategy",
                    cache: true,
                    data:{"strategy":strategy},
                    type: "post",
                    async: false,
                    success: function (data) {
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '添加成功！',
                                content: '即将跳转到备份计划页面（此确认框会在2秒后消失）',
                                autoClose: '确定|2000',
                                buttons: {
                                    确定: function () {
                                        location.href = "all_task.html";
                                    }
                                }
                            });
                    }
                })
            }
        });
    //测试验证是否已经存在别名
  /*      $("#msg-id").keyup(function(){
            var strategy =$(this).val();
            console.log(strategy)
            $.ajax({
                url: "http://" + localhost + "/VirtualizationUnifiedBackup/strategyIsExist?strategy="+strategy,
                cache: true,
                type: "get",
                async: false,
                success: function (data) {
                    switch (data){
                        case 0:
                            console.log("别名可用");
                            break;
                        case -1:
                            console.log("别名已存在");
                            break;
                        case -2:
                            console.log("未知错误")
                    }
                }
            });
        });*/

    }
});
jQuery('#sample_1 .group-checkable').change(function () {
    var set = jQuery(this).attr("data-set");
    var checked = jQuery(this).is(":checked");
    jQuery(set).each(function () {
        if (checked) {
            $(this).attr("checked", true);
        } else {
            $(this).attr("checked", false);
        }
    });
    jQuery.uniform.update(set);
});
/*<ul>
<li><img src="media/image/vmware.png">111</li>
    <li><img src="media/image/vmware.png">111</li>
    <li><img src="media/image/vmware.png">111</li>
    <li><img src="media/image/vmware.png">111</li>
    <li><img src="media/image/vmware.png">111</li>
    <li><img src="media/image/vmware.png">111</li>
    </ul>*/



