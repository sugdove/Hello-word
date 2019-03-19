/**
 * Created by suge on 2017/6/30.
 */
$.ajax({
    cache: true,
    type: "get",
    url: 'localhost.json',
    dataType: "json",
    async: true,
    //未启动备份计划
    success: function (data) {
        var localhost = data[0].localhost;
        $.ajax({
            cache: true,
            type: "get",
            url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getAutoBkPlaneByStatusStop",
            "json/task_status2.json",
            dataType: "json",
            async: true,
            success: function (data) {
                var length = data.length;
                var i = 0;
                var json={};
                for (i; i < length; i++) {
                    var obj=data[i];
                    var tempArr=json[obj['Strategy']];
                    if(!tempArr){
                        tempArr=[];
                        json[obj['Strategy']]=tempArr;
                    }
                    tempArr.push(obj);
                }
                var details_tr = [];
                for(var k in json){
                    var obj2 ={};
                    var length = json[k].length;
                    var data1 = json[k][0];
                    var Strategy = data1.Strategy;
                    var VirtCentType = data1.VirtCentType;
                    var creatime = data1.creatime;
                    var StrategyStatus = data1.StrategyStatus;
                    var vmname = data1.vmnameset;
                    var vcip = data1.vcip;
                    var vcStorepath = data1.vcStorepath;
                    if(VirtCentType==0&&StrategyStatus==0) {
                        var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-warning'>未启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)'  class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start1'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div></td></tr>"
                    }
                    if(VirtCentType==0&&StrategyStatus==1) {
                        var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' title='删除前请停止任务' disabled value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-success'>已启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start1'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                    }
                    if(VirtCentType==0&&StrategyStatus==2) {
                        var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='laber laber-danger'>已停止</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)'  class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start1'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li></ul></div> </td></tr>"
                    }
                    if(VirtCentType==1&&StrategyStatus==0) {
                        var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes'  value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-warning'>未启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)'  class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start1'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                    }
                    if(VirtCentType==1&&StrategyStatus==1) {
                        var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' title='删除前请停止任务' disabled value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-success'>已启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start1'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                    }
                    if(VirtCentType==1&&StrategyStatus==2) {
                        var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-danger'>已停止</span></td><td><div class='btn-group mmm' ><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)'  class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start1'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li></ul></div> </td></tr>"
                    }
                    var details = "<tr class='details details_tr'><td class='details' colspan='9'><table><tbody><tr><td>虚拟机名称:</td><td>"+vmname+"</td></tr>";
                    for(var c=0;c<length;c++) {
                        var data = json[k][c];
                        var bktype = data.bktype;
                        var exetype = data.exetype;
                        var exedate = data.exedate;
                        var exetime = data.exetime;
                        var bkid =parseInt(data.bkid);

                        if(bktype==1) {
                            if(exetype==1) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>全量策略:</td><td><span>每天</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                            if(exetype==2) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>全量策略:</td><td><span>每周</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                            if(exetype==3) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>全量策略:</td><td><span>每月</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                        }
                        if(bktype==2){
                            if(exetype==1) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>增量策略:</td><td><span>每天</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                            if(exetype==2) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>增量策略:</td><td><span>每周</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                            if(exetype==3) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>增量策略:</td><td><span>每月</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></td></tr>"
                            }
                        }
                        if(bktype==3){
                            if(exetype==1) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>磁盘全量策略:</td><td><span>每天</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                            if(exetype==2) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>磁盘全量策略:</td><td><span>每周</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                            if(exetype==3) {
                                details+="<tr><td class='bkid_1'>"+bkid+"</td><td>磁盘全量策略:</td><td><span>每月</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                            }
                        }
                    }
                    details+="</tbody></table></td></tr>";
                    obj2[Strategy]=details;

                    details_tr.push(obj2);
                    $("#v_tbody").append(table)
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

                $('#sample_1').dataTable( {
                    "aoColumnDefs": [
                        {"bSortable": false, "aTargets": [0,1] }
                    ],
                    "aaSorting": [[2, 'asc']],
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
                    }
                });

                jQuery('#sample_1 .group-checkable').change(function () {
                    var set = jQuery(this).attr("data-set");
                    var checked = jQuery(this).is(":checked");
                    jQuery(set).each(function () {
                        if (checked&$(this).prop("disabled")==false) {
                            $(this).attr("checked", true);
                        } else {
                            $(this).attr("checked", false);
                        }
                    });
                    jQuery.uniform.update(set);
                });

                $("#v_tbody").on("click",".row-details-close",function(){
                    var name =$(this).parent("td").parent("tr").find("td").eq(2).text();
                    for(var i=0;i<details_tr.length;i++){
                        for(var k in details_tr[i]){
                            if(k==name){
                                var obj = details_tr[i][name];
                                $(this).parent("td").parent("tr").after(details_tr[i][name])
                            }
                        }
                    }
                    $(this).attr("class","row-details row-details-open");
                });
                $("#v_tbody").on("click",".row-details-open",function(){
                    $(this).attr("class","row-details row-details-close");
                    $(this).parent("td").parent("tr").next(".details_tr").remove();
                });
                $("#v_tbody").on("mouseover",".details_tr",function(){
                    $(this).find(".cchange").show();
                    $(this).find(".cstart").show();
                });
                $("#v_tbody").on("mouseout",".details_tr",function(){
                    $(this).find(".cchange").hide();
                    $(this).find(".cstart").hide();
                });
                /*  for(var i=0;i<details_tr.length;i++){
                 $("#v_tbody_2").find(".appendtr").eq(i).after(details_tr[i])
                 }*/

            },


            error:function(data){

                alert("wrong");

            }

        });
        $.ajax({
            cache: true,
            type: "get",
            url: "localhost.json",
            dataType: "json",
            async: false,
            success: function (data) {
                var localhost = data[0].localhost;
                //获取已启动备份计划
                $.ajax({
                    cache: true,
                    type: "get",
                    url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getAutoBkPlaneByStatusRun",
                        "json/task_status1.json",

                    dataType: "json",
                    async: false,
                    success: function (data) {
                        var length = data.length;
                        var i = 0;
                        var json={};
                        for (i; i < length; i++) {
                            var obj=data[i];
                            var tempArr=json[obj['Strategy']];
                            if(!tempArr){
                                tempArr=[];
                                json[obj['Strategy']]=tempArr;
                            }
                            tempArr.push(obj);
                        }
                        var details_tr = [];
                        for(var k in json){
                            var obj2 ={};
                            var length = json[k].length;
                            /*   <tr class="details">
                             <td class="details" colspan="7">
                             <table>
                             <tbody>
                             <tr>
                             <td>全量策略:</td>
                             <td>5</td>
                             </tr>
                             <tr>
                             <td>增量策略:</td>
                             <td>6</td>
                             </tr>
                             <tr>
                             <td>磁盘全量策略:</td>
                             <td>7</td>
                             </tr>
                             <tr>
                             <td>Others:</td>
                             <td>Could provide a link here</td>
                             </tr>
                             </tbody>
                             </table>
                             </td>0未启动1进行中2停止
                             </tr>*/
                            var data1 = json[k][0];
                            var Strategy = data1.Strategy;
                            var VirtCentType = data1.VirtCentType;
                            var creatime = data1.creatime;
                            var StrategyStatus = data1.StrategyStatus;
                            var vmname = data1.vmnameset;
                            var vcip = data1.vcip;
                            var vcStorepath = data1.vcStorepath;
                            if(VirtCentType==0&&StrategyStatus==0) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-warning'>未启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div></td></tr>"
                            }
                            if(VirtCentType==0&&StrategyStatus==1) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-success'>已启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==0&&StrategyStatus==2) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='laber laber-danger'>已停止</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o'  ></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==1&&StrategyStatus==0) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-warning'>未启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o' ></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==1&&StrategyStatus==1) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-success'>已启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li><li><a href='javascript:void(0)' ><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==1&&StrategyStatus==2) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-danger'>已停止</span></td><td><div class='btn-group mmm' ><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o' ></i>启动</a></li><li><a href='javascript:void(0)'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li></ul></div> </td></tr>"
                            }
                            var details = "<tr class='details details_tr'><td class='details' colspan='9'><table><tbody><tr><td>虚拟机名称:</td><td>"+vmname+"</td></tr>";
                            for(var c=0;c<length;c++) {
                                var data = json[k][c];
                                var bktype = data.bktype;
                                var exetype = data.exetype;
                                var exedate = data.exedate;
                                var exetime = data.exetime;
                                var bkid =parseInt(data.bkid);

                                if(bktype==1) {
                                    if(exetype==1) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>全量策略:</td><td><span>每天</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                    if(exetype==2) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>全量策略:</td><td><span>每周</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                    if(exetype==3) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>全量策略:</td><td><span>每月</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                }
                                if(bktype==2){
                                    if(exetype==1) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>增量策略:</td><td><span>每天</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                    if(exetype==2) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>增量策略:</td><td><span>每周</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                    if(exetype==3) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>增量策略:</td><td><span>每月</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                }
                                if(bktype==3){
                                    if(exetype==1) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>磁盘全量策略:</td><td><span>每天</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                    if(exetype==2) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>磁盘全量策略:</td><td><span>每周</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                    if(exetype==3) {
                                        details+="<tr><td class='bkid_1'>"+bkid+"</td><td>磁盘全量策略:</td><td><span>每月</span><span>"+exedate+"</span><span>,</span><span>"+exetime+"</span></td><td><span class='label label-warning cchange'>修改</span></td><td><span class='label label-success cstart'>启动</span></td></tr>"
                                    }
                                }
                            }
                            details+="</tbody></table></td></tr>";
                            obj2[Strategy]=details;

                            details_tr.push(obj2);
                            $("#v_tbody_2").append(table)
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

                        $('#sample_2').dataTable( {
                            "aoColumnDefs": [
                                {"bSortable": false, "aTargets": [0,1] }
                            ],
                            "aaSorting": [[2, 'asc']],
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
                            }
                        });

                        jQuery('#sample_2 .group-checkable').change(function () {
                            var set = jQuery(this).attr("data-set");
                            var checked = jQuery(this).is(":checked");
                            jQuery(set).each(function () {
                                if (checked&$(this).prop("disabled")==false) {
                                    $(this).attr("checked", true);
                                } else {
                                    $(this).attr("checked", false);
                                }
                            });
                            jQuery.uniform.update(set);
                        });
                        console.log(details_tr)

                        $("#v_tbody_2").on("click",".row-details-close",function(){
                            var name =$(this).parent("td").parent("tr").find("td").eq(2).text();
                            for(var i=0;i<details_tr.length;i++){
                                for(var k in details_tr[i]){
                                    if(k==name){
                                        var obj = details_tr[i][name];
                                        console.log(obj);
                                        $(this).parent("td").parent("tr").after(details_tr[i][name])
                                    }
                                }
                            }
                            $(this).attr("class","row-details row-details-open");
                        });
                        $("#v_tbody_2").on("click",".row-details-open",function(){
                            $(this).attr("class","row-details row-details-close");
                            $(this).parent("td").parent("tr").next(".details_tr").remove();
                        });
                        $("#v_tbody_2").on("mouseover",".details_tr",function(){
                            $(this).find(".cchange").show();
                            $(this).find(".cstart").show();
                        });
                        $("#v_tbody_2").on("mouseout",".details_tr",function(){
                            $(this).find(".cchange").hide();
                            $(this).find(".cstart").hide();
                        });
                        /*  for(var i=0;i<details_tr.length;i++){
                         $("#v_tbody_2").find(".appendtr").eq(i).after(details_tr[i])
                         }*/
                    }
                })
            }
        })
    }
});

$(".hide1").click(function(){
    $("#span1").show();
    $("#span2").hide();
});
$(".hide2").click(function(){
    $("#span2").show();
    $("#span1").hide();
});

$("#stop").click(function(){
   $("#sample_1").find("th").eq(8).css("width","5%");
    $("#sample_1").find("th").eq(7).css("width","5%");
    $("#sample_1").find("th").eq(1).css("width","1%");

});

//操作主入口
//删除按策略备份
$("body").on("click","#bk_plan_delete_2",function(){
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
                        cache: true,
                        type: "get",
                        url: 'localhost.json',
                        dataType: "json",
                        async: true,
                        success: function (data) {
                            var localhost = data[0].localhost;
                            $.ajax({
                                cache: true,
                                url: "http://" + localhost + "/VirtualizationUnifiedBackup/deleteStrategyPlane",
                                type: "get",
                                async: false,
                                data: $("#bk_plan_2").serialize(),
                                success: function (data) {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton: '确认',
                                        cancelButton: '取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '删除成功！',
                                        content: '策略备份任务删除成功！（此确认框会在3秒后消失）',
                                        autoClose: '确认|3000',
                                        buttons: {
                                            确认: function () {
                                                window.location.reload();
                                            }
                                        }
                                    });
                                },
                                error: function (data) {
                                    alert("system error")
                                }
                            })
                        }
                    })
                }
            },
            否: function () {

            },
        }
    });

});
//启动
        $("body").on("click", ".start1", function () {
            var Strateg = $(this).parent().parent().parent().parent().parent("tr").find("input[type='checkbox']").val();
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
                        url: 'localhost.json',
                        dataType: "json",
                        async: true,
                        success: function (data) {
                            $.ajax({
                                cache: true,
                                url: "http://" + localhost + "/VirtualizationUnifiedBackup/StartStrateg",
                                type: "get",
                                async: false,
                                data: {strategy: Strateg},
                                success: function (data) {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton: '确认',
                                        cancelButton: '取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '启动成功！',
                                        content: '该策略备份任务启动成功！（此确认框会在3秒后消失）',
                                        autoClose: '确认|3000',
                                        buttons: {
                                            确认: function () {
                                                window.location.reload();
                                            }
                                        }
                                    });
                                },
                                error: function (data) {
                                    alert("system error")
                                }
                            })
                        }
                    })
                }
            })

        });


//停止
        $("body").on("click", ".stop1", function () {
            var Strateg = $(this).parent().parent().parent().parent().parent("tr").find("input[type='checkbox']").val();
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
                        url: "http://" + localhost + "/VirtualizationUnifiedBackup/StopStrateg",
                        type: "get",
                        async: false,
                        data: {strategy: Strateg},
                        success: function (data) {
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '停止成功！',
                                content: '该策略备份任务停止成功！（此确认框会在3秒后消失）',
                                autoClose: '确认|3000',
                                buttons: {
                                    确认: function () {
                                        window.location.reload();
                                    }
                                }
                            });
                        },
                        error: function (data) {
                            alert("system error")
                        }
                    })
                }
            })
        });

//策略启动
$("body").on("click", ".cstart", function () {
    var id=$(this).parent().parent("tr").find(".bkid_1").text();

            $.ajax({
                cache: true,
                type: "get",
                url: 'localhost.json',
                dataType: "json",
                async: true,
                success: function (data) {
                    var localhost = data[0].localhost
                    $.ajax({
                        cache: true,
                        url: "http://" + localhost + "/VirtualizationUnifiedBackup/execuPlane",
                        type: "get",
                        async: false,
                        data: {id: id},
                        success: function (data) {
                            $.confirm({
                                confirmButtonClass: 'btn btn-info',
                                cancelButtonClass: 'btn-danger',
                                confirmButton: '确认',
                                cancelButton: '取消',
                                animation: 'zoom',
                                closeAnimation: 'rotateXR',
                                title: '启动成功！',
                                content: '该策略备份任务启动成功！（此确认框会在3秒后消失）',
                                autoClose: '确认|3000',
                                buttons: {
                                    确认: function () {
                                        window.location.reload();
                                    }
                                }
                            });
                        },
                        error: function (data) {
                            alert("system error")
                        }
                    })
                }
            })
});