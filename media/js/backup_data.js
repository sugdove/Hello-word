/**
 * Created by suge on 2017/7/3.
 */
//初始化datatable
$('#sample_1').dataTable({
    "aoColumnDefs": [
        {"orderable":false,"aTargets":[0]}// 制定列不参与排序
    ],
    "aLengthMenu": [
        [5, 15, 20, -1],
        [5, 15, 20, "All"] // change per page values here
    ],
    // set the initial value
    "iDisplayLength": 5,
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
    "aaSorting": [[ 1, "asc" ]]//默认第几个排序
});
$("body").on("click",".tree-toggle",function () {
    $(this).addClass("closed");
    $(this).next("ul").removeClass("in");
});
$("body").on("click",".closed",function () {
    $(this).removeClass("closed");
    $(this).next("ul").addClass("in");
});
$("body").on("click",".vmid",function(){
    $("#sample_1").dataTable().fnDestroy();
    $(".vmid").removeClass("www");
    $(".vmid").removeClass("eee");
    $(this).addClass("eee");
    $("#sample_1_thead").find("th").eq(3).css("width","10%");
    $("#sample_1_thead").find("th").eq(4).css("width","15%");
    var VmName = $(this).text();
  $(".alert-info").hide();
    $("#table_div").show();
    $(".alert-danger").show();
    $("#data_tbody").children("tr").remove();
    $.ajax({
        cache: true,
        type: "get",
        url: 'localhost.json',
        dataType: "json",
        async: false,
        success: function (data) {
            var localhost = data[0].localhost;
            $.ajax({
                cache: true,
                url: //"http://" + localhost + "/VirtualizationUnifiedBackup/getVersionByVmName",
                    "json/backup_data2.json",
                //data: {"VmName":VmName},
                type:"get",
                async:false,
                success:function(data){
                    var length = data.length;
                    for(var i=0;i<length;i++){
                        var starttime = data[i].starttime;
                        var vmbktype  = data[i].vmbktype;
                        var bkstatus = parseInt(data[i].bkstatus);
                        var id  = parseInt(data[i].id);
                        var vmFullNum =parseInt(data[i].vmFullNum);
                        var c=i+1;
                        switch(bkstatus){
                            case 0:
                                bkstatus ="<span class='label label-success'>备份成功</span>";
                                break;
                            case 1:
                                bkstatus ="<span class='label label-info'>备份中</span>";
                                break;
                            case 2:
                                bkstatus ="<span class='label label-warning'>备份失败</span>";
                                break;
                            case 3:
                                bkstatus ="<span class='label label-default'>已经删除</span>";
                                break;
                        }
                        switch (vmbktype) {
                            case "1":
                                $("#data_tbody").append("<tr  class='bk1'><td>"+c+"</td><td>"+starttime+"</td><td><span class='id hide'>"+id+"</span>全量备份点</td><td>"+bkstatus+"</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='delete1'><i class='fa fa-remove'></i>删&nbsp&nbsp除<span class='hide vnnum'>"+vmFullNum+"</span></a></li></ul></div></td></tr>");
                                break;
                            case "2":
                                $("#data_tbody").append("<tr  class='bk2'><td>"+c+"</td><td><span class='hide vnnum_'>"+vmFullNum+"</span>"+starttime+"</td><td>增量备份点</td><td>"+bkstatus+"</td><td><div class='ccc'></div></td></tr>");
                                break;
                            case "3":
                                $("#data_tbody").append("<tr class='bk3'><td>"+c+"</td><td>"+starttime+"</td><td ><span class='id hide'>"+id+"</span>磁盘全量备份点</td><td>"+bkstatus+"</td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='delete1'><i class='fa fa-remove'></i>删&nbsp&nbsp除</a></li></ul></div></td></tr>");
                                break;
                        }

                    }
                    $('#sample_1').dataTable({
                        "aoColumnDefs": [
                            {"orderable":false,"aTargets":[0,1,2,3,4]}// 制定列不参与排序
                        ],
                        "aLengthMenu": [
                            [5, 10],
                            [5, 10] // change per page values here
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
                        "aaSorting": [[ 0, "asc" ]]//默认第几个排序
                    });
                },
                error:function(data){
                    alert("system error");
                }
            });
        }
    })
});
$("#vmware").click(function(){
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
                url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getVirtCentBaseInfo",
                 "json/backup_data1.json",
                type:"get",
                dataType: "json",
                async: false,
                success: function (data) {
                    var string = "";
                    for (var k in data) {
                        var length = data[k].length;
                        //k为第一层
                        string += "<li><a href='javascript:void(0)' data-role='branch' class='tree-toggle closed' data-toggle='branch' data-value='Bootstrap_Tree'><span class='ip'></span>" + k + "</a><ul class='branch'>";
                        var a = data[k];
                        for (var i = 0; i < length-1; i++) {
                            var b = a[i];
                            for (var n in b) {
                                //n为第二层
                                string += "<li><a href='javascript:void(0)' class='tree-toggle closed' data-toggle='branch' data-value='Bootstrap_Tree'><span class='flag'></span>" + n + "</a> <ul class='two-level branch'>";
                                var length2 = b[n].length;
                                for (var l = 0; l < length2; l++) {
                                    //b[l]为第三层
                                    string += "<li><a href='javascript:void(0)' data-role='leaf' class='vmid'><span class='vm'></span>" + b[n][l] + "</a></li>"
                                }
                                string += "</li></ul>"
                            }
                        }
                        string += "</li></ul>"
                    }
                    $("#tree_node").html(string);
                    var $tree = $("#tree_1");
                    $tree.find(".search-target").remove();
                    $tree.prepend("<input type='text' placeholder='search' class='search-target'>");
                    $tree.keyup(function () {
                        var val = $(".search-target").val();
                        if(val===""){
                            val="\0";
                        }
                        $(".vmid").each(function () {
                            var this_ =$(this);
                            var str = this_.text();
                            this_.removeClass("www");
                            if(str.indexOf(val)!==-1){
                                $(this).addClass("www");
                                if($(this).parent().parent().parent().children("a").hasClass("closed")){
                                    $(this).parent().parent().parent().children("a").click();
                                }
                                else if($(this).parent().parent().parent().parent().parent().children("a").hasClass("closed")){
                                    $(this).parent().parent().parent().parent().parent().children("a").click();

                                }
                            }
                        });
                        $(".two-level").each(function () {
                            var num = 0;
                            num+=$(this).find(".eee").length;
                            num+=$(this).find(".www").length;
                            if(num===0&&!$(this).parent().children("a").hasClass("closed")){
                                $(this).parent().children("a").click();
                            }
                        })

                    });

                }
            });
        }
    });
});

$("body").on("click",".delete1",function(){
    var this_ = $(this).parent().parent().parent().parent().parent("tr");
    var id = this_.find(".id").text();
    var vmnum =$(this).find(".vnnum").text();
    $.confirm({
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn-danger',
        confirmButton: '确认',
        cancelButton: '取消',
        animation: 'zoom',
        closeAnimation: 'rotateXR',
        title: '删除？',
        content: '确认是否删除（此确认框会在8秒后消失）',
        autoClose: '否|8000',
        buttons: {
            deleteUser: {
                text: '是',
                action: function () {
                    $.ajax({
                        cache:true,
                        url:"localhost.json",
                        async:false,
                        success:function(data){
                            var localhost = data[0].localhost;
                            $.ajax({
                                cache:true,
                                url://"http://"+localhost+"/VirtualizationUnifiedBackup/deleteVersion",
                                "localhost.json",
                                data:{"id":id},
                                async:false,
                                success:function(data){
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton:'确认',
                                        cancelButton:'取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '删除成功！',
                                        content: '备份点删除成功（此确认框会在3秒后消失）',
                                        autoClose: '确认|8000',
                                        buttons: {
                                            确认: function () {
                                                var Dtable = $('#sample_1').DataTable();
                                                var row1 = this_;
                                                Dtable.row(row1).remove().draw(false);

                                                $("#sample_1").find(".vnnum_").each(function(){
                                                    if($(this).text()==vmnum){
                                                        var row2=$(this).parent().parent("tr");
                                                        Dtable.row(row2).remove().draw(false);
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            },
            否: function () {

            }
        }
    });
});

/*  <th width="5%"></th>
 <th width="5%">编号</th>
 <th width="20%">时间点</th>
 <th width="10%">类型</th>
 <th width="20%">含有增量</th>
 <th width="10%">数据大小</th>
 <th width="10%">写入大小</th>
 <th width="30%">备注</th>
 <th width="10%">操作</th>
*/
