/**
 * Created by suge on 2017/7/12.
 */
$.ajax({
    cache:true,
    url:"localhost.json",
    dataType:"json",
    async:false,
    success:function(data){
        var localhost = data[0].localhost
        $.ajax({
            cache:true,
            url://"http://"+localhost+"/VirtualizationUnifiedBackup/getVmlistAll",
                "json/backup_report1.json",
            dataType:"json",
            type:"post",
            async:false,
            success:function(data){
                //处理json数据
                var length_ = data.length;
                var t = 0;
                var json={};
                for (t; t < length_; t++) {
                    var obj=data[t];
                    var tempArr=json[obj['vmname']];
                    if(!tempArr){
                        tempArr=[];
                        json[obj['vmname']]=tempArr;
                    }
                    tempArr.push(obj);
                }
                console.log(json);
                var length = data.length;
                var tbody = "";
                var i=0;

                for(var k in json){
                    var num = ++i;
                    var length2 = json[k].length;
                    var vmname =json[k][0].vmname;
                    var Strategy =json[k][0].Strategy;
                    var creatime =json[k][0].creatime;
                    var bktype =json[k][0].bktype;
                    var RunNum =json[k][0].RunNum;
                    var isbackup =json[k][0].isbackup;
                    var string;
                    if(length2==1){
                        string=""
                    }
                    else {
                        string="<span class='row-details row-details-close'></span>"
                    }

                    if(creatime == null){
                        creatime ="----"
                    }
                    switch (bktype){
                        case null:
                            bktype ="--";
                            break;
                        case "1":
                            bktype ="全量备份";
                            break;
                        case "2":
                            bktype ="增量备份";
                            break;
                        case "3":
                            bktype ="磁盘全量备份";
                            break;
                    }
                    if(Strategy ==null){
                        Strategy ="--"
                    }
                    if(RunNum ==null){
                        RunNum ="--"
                    }
                    switch(isbackup){
                        case "0":
                            tbody+="<tr><td>"+string+"</td><td>"+num+"</td><td>"+vmname+"</td><td>"+Strategy+"</td><td>"+creatime+"</td><td>"+bktype+"</td><td>"+RunNum+"</td><td><span class='label label-danger'>未备份</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)'  data-toggle='modal' data-target='#myModal' class='change'><i class='fa fa-plus'></i>添加到备份任务</a></li><li><a href='javascript:void(0)'   class='oneway'><i class='fa fa-share'></i>创建新备份任务</a></li></ul></div></td></tr>";
                            break;
                        case "1":
                            tbody+="<tr><td>"+string+"</td><td>"+num+"</td><td>"+vmname+"</td><td>"+Strategy+"</td><td>"+creatime+"</td><td>"+bktype+"</td><td>"+RunNum+"</td><td><span class='label label-success'>备份计划中</span></td><td><div class='ccc'></div></td></tr>";
                            break;

                    }

                }

                $("#v_tbody").html(tbody);

                //点击+append区域
                $("#v_tbody").on("click",".row-details-close",function(){
                    var name =$(this).parent("td").parent("tr").find("td").eq(2).text();
                   /*for(var i=0;i<details_tr.length;i++){
                        for(var k in details_tr[i]){
                            if(k==name){
                                var obj = details_tr[i][name];
                                console.log(obj);
                                $(this).parent("td").parent("tr").after(details_tr[i][name])
                            }
                        }
                    }*/
                    var len = json[name].length;
                    var string_ = "";
                    for(var i = 1;i<len;i++){
                        var vmname =json[k][i].vmname;
                        var Strategy =json[k][i].Strategy;
                        var creatime =json[k][i].creatime;
                        var bktype =json[k][i].bktype;
                        var RunNum =json[k][i].RunNum;
                        var isbackup =json[k][i].isbackup;
                        if(creatime == null){
                            creatime ="----"
                        }
                        switch (bktype){
                            case null:
                                bktype ="--";
                                break;
                            case "1":
                                bktype ="全量备份";
                                break;
                            case "2":
                                bktype ="增量备份";
                                break;
                            case "3":
                                bktype ="磁盘全量备份";
                                break;
                        }
                        if(Strategy ==null){
                            Strategy ="--"
                        }
                        if(RunNum ==null){
                            RunNum ="--"
                        }
                        switch(isbackup){
                            case "0":
                                string_+="<tr><td></td><td></td><td>"+vmname+"</td><td>"+Strategy+"</td><td>"+creatime+"</td><td>"+bktype+"</td><td>"+RunNum+"</td><td><span class='label label-danger'>未备份</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)'  data-toggle='modal' data-target='#myModal' class='change'><i class='fa fa-plus'></i>添加到备份任务</a></li><li><a href='javascript:void(0)'   class='oneway'><i class='fa fa-share'></i>创建新备份任务</a></li></ul></div></td></tr>";
                                break;
                            case "1":
                                string_+="<tr><td></td><td></td><td>"+vmname+"</td><td>"+Strategy+"</td><td>"+creatime+"</td><td>"+bktype+"</td><td>"+RunNum+"</td><td><span class='label label-success'>备份计划中</span></td><td><div class='ccc'></div></td></tr>";
                                break;

                        }
                    }
                    console.log()
                    $(this).parent("td").parent("tr").after(string_)
                    $(this).attr("class","row-details row-details-open");
                });
                //点击-remove区域
                $("#v_tbody").on("click",".row-details-open",function(){
                    $(this).attr("class","row-details row-details-close");
                    $(this).parent("td").parent("tr").next(".details_tr").remove();
                });
             /*   $(".row-details-close").click(function(){
                    $(this).attr("class","row-details row-details-open")
                })*/
            }
        });
    }

});
$('#sample_1').dataTable({
    "aLengthMenu": [
        [5, 10],
        [5, 10] // change per page values here
    ],
    "aoColumnDefs": [
        {"orderable": false, "aTargets": [7]}// 制定列不参与排序
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
    "aaSorting": [[1, "asc"]],//默认第几个排序
});