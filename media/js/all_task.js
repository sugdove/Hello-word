$.ajax({
    cache: true,
    type: "get",
    url: 'localhost.json',
    dataType: "json",
    async: true,
    success: function (data) {
       var localhost = data[0].localhost;
        //获取所有手动执行计划
$.ajax({
    cache: true,
    type: "get",
    url:// "http://"+localhost+"/VirtualizationUnifiedBackup/getManualPlane",
    "json/all_task2.json",
    dataType: "json",
    async: false,
    success: function (data) {
        var length = data.length;
        var i = 0;
        for (i; i < length; i++) {
            var bkid= parseInt(data[i].bkid);
            var msg = data[i].msg;
            var vmidset = data[i].vmidset;
            var vcid =data[i].vcid;
            var vmnameset = data[i].vmnameset;
            var bktype = data[i].bktype;
            var threadnum = data[i].threadnum;
            var exetime = data[i].exetime;
            var exestatus = data[i].exestatus;
            var vcip = data[i].vcip;
            var vcStorepath = data[i].vcStorepath;
    //    <td><input type="checkbox" class="checkboxes" value="1" /></td>
                $("#v_tbody").append("<tr class='odd gradeX'><td class='sorting_1'><input type='checkbox' name='bkid' class='checkboxes' value='"+bkid+"'></td><td>"+bkid+"</td><td class='hidden-480 vcid_show' title='IP地址："+vcip+"  备份路径："+vcStorepath+"'>"+vcid+"</td><td class='hidden-480'>"+vmidset+"</td><td class='hidden-480'>"+vmnameset+"</td><td>"+bktype+"</td><td>手动执行</td><td>"+exetime+"</td><td>"+exestatus+"</td><td><a href='#' class='btn mini purple run'><i class='icon-edit'></i> 手动执行</a></td></tr>")
        }
        $("#v_tbody tr").each(function(){
            if($(this).find("td").eq(5).text()=="1"){
                $(this).find("td").eq(5).text("全量备份")
            }
            if($(this).find("td").eq(5).text()=="2"){
                $(this).find("td").eq(5).text("增量备份")
            }
            if($(this).find("td").eq(5).text()=="3"){
                $(this).find("td").eq(5).text("全磁盘备份")
            }
            if($(this).find("td").eq(8).text()=="0"){
                $(this).find("td").eq(8).html("<span class='label label-warning'>未启动</span>")
            }
            if($(this).find("td").eq(8).text()=="1"){
                $(this).find("td").eq(8).html("<span class='label label-success'>进行中</span>")
            }
            if($(this).find("td").eq(8).text()=="2"){
                $(this).find("td").eq(8).text("<span class='label label-danger'>已停止</span>")
            }
        });
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
       //初始化datatable
        $('#sample_1').dataTable({
            "aoColumnDefs": [
                {"orderable":false,"aTargets":[0,2,4,5,7,8,9]}// 制定列不参与排序
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
       //点击th里checkbox后td里的checkbox改变
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
        //删除手动备份计划
        $("#bk_plan_delete").click(function(){
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
                                url:"http://"+localhost+"/VirtualizationUnifiedBackup/deleteManuaPlane",
                                cache: true,
                                type: "get",
                                data:$("#bk_plan").serialize(),
                                async: false,
                                success: function (data) {
                                    if(data==0){
                                        $.confirm({
                                            confirmButtonClass: 'btn btn-info',
                                            cancelButtonClass: 'btn-danger',
                                            confirmButton:'确认',
                                            cancelButton:'取消',
                                            animation: 'zoom',
                                            closeAnimation: 'rotateXR',
                                            title: '删除成功！',
                                            content: '备份计划成功删除！（此确认框会在2秒后消失）',
                                            autoClose: '确定|2000',
                                            buttons: {
                                                确定: function () {
                                                    window.location.reload()
                                                }
                                            }
                                        });
                                    }
                                    else if(data==1){
                                        $.confirm({
                                            confirmButtonClass: 'btn btn-info',
                                            cancelButtonClass: 'btn-danger',
                                            confirmButton:'确认',
                                            cancelButton:'取消',
                                            animation: 'zoom',
                                            closeAnimation: 'rotateXR',
                                            title: '删除失败！',
                                            content: '系统错误！（此确认框会在8秒后消失）',
                                            autoClose: '返回|8000',
                                            buttons: {
                                                返回: function () {
                                                    window.location.reload()
                                                }
                                            }
                                        });
                                    }

                                }
                            })

                        }
                    },
                    否: function () {

                    }
                }
            });

        });
       //同步执行
       $("body").on("click",".run",function(){
            var id = $(this).parent().parent("tr").find("td").eq(1).text();
           $.confirm({
               confirmButtonClass: 'btn btn-info',
               cancelButtonClass: 'btn-danger',
               confirmButton: '确认',
               cancelButton: '取消',
               animation: 'zoom',
               closeAnimation: 'rotateXR',
               title: '手动执行？',
               content: '确认是否手动执行（此确认框会在8秒后消失）',
               autoClose: '否|8000',
               buttons: {
                   deleteUser: {
                       text: '是',
                       action: function () {
                           $.ajax({
                               url:"http://"+localhost+"/VirtualizationUnifiedBackup/execuPlane",
                               cache: true,
                               type: "get",
                               data:{"id":id},
                               async: false,
                               success: function (data) {
                                   if(data==0) {
                                       $.confirm({
                                           confirmButtonClass: 'btn btn-info',
                                           cancelButtonClass: 'btn-danger',
                                           confirmButton: '确认',
                                           cancelButton: '取消',
                                           animation: 'zoom',
                                           closeAnimation: 'rotateXR',
                                           title: '操作成功！',
                                           content: '备份计划已启动！（此确认框会在2秒后消失）',
                                           autoClose: '返回|2000',
                                           buttons: {
                                               返回: function () {
                                                   window.location.reload();
                                               }
                                           }
                                       });
                                   }
                                   if(data==-1) {
                                       $.confirm({
                                           confirmButtonClass: 'btn btn-info',
                                           cancelButtonClass: 'btn-danger',
                                           confirmButton: '确认',
                                           cancelButton: '取消',
                                           animation: 'zoom',
                                           closeAnimation: 'rotateXR',
                                           title: '操作失败！',
                                           content: '您可能进行了错误的操作！（此确认框会在8秒后消失）',
                                           autoClose: '返回|8000',
                                           buttons: {
                                               返回: function () {
                                                   window.location.reload();
                                               }
                                           }
                                       });
                                   }
                               }
                           })
                       }
                   },
                   否: function () {

                   }
               }
           });
        })
    },


    error:function(data){

       alert("system error");

    }

});
        //获取所有自动执行计划
     $.ajax({
            cache: true,
            type: "get",
            url: "localhost.json",
            dataType: "json",
            async: false,
            success: function (data) {
                var localhost = data[0].localhost;
                $.ajax({
                    cache: true,
                    type: "get",
                    url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getAutoBkPlane",
                        "json/all_task1.json",

                    dataType: "json",
                    async: false,
                    //数据处理
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
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-warning'>未启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)' class='start2'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)'  class='start3'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)' class='start4'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div></td></tr>"
                            }
                            if(VirtCentType==0&&StrategyStatus==1) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-success'>已启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li><li><a href='javascript:void(0)' class='start2'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start3'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)' class='start4'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==0&&StrategyStatus==2) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>VMware vSphere</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='laber laber-danger'>已停止</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)' class='start2'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start3'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)' class='start4'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==1&&StrategyStatus==0) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-warning'>未启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)' class='start2'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start3'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)' class='start4'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==1&&StrategyStatus==1) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' title='删除前请停止任务' disabled class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-success'>已启动</span></td><td><div class='btn-group mmm'><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li><li><a href='javascript:void(0)' class='start2'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start3'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)' class='start4'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li></ul></div> </td></tr>"
                            }
                            if(VirtCentType==1&&StrategyStatus==2) {
                                var table = "<tr class='odd gradeX appendtr'><td><span class='row-details row-details-close'></span></td><td class='sorting_1'><input type='checkbox' class='checkboxes' name='strategy' value='" + Strategy + "'></td><td>" + Strategy + "</td><td>Citrix XenServer</td><td>" + creatime + "</td><td>" + vcip + "</td><td>" + vcStorepath + "</td><td><span class='label label-danger'>已停止</span></td><td><div class='btn-group mmm' ><button type='button' class='btn btn yellow pad' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='glyphicon glyphicon-hand-up'></i>操作<span class='fa fa-angle-down'></span></button><ul class='dropdown-menu'><li><a href='javascript:void(0)' class='start1'><i class='fa fa-clock-o'></i>启动</a></li><li><a href='javascript:void(0)' class='start2'><i class='glyphicon glyphicon-play'></i>启用全量</a></li> <li><a href='javascript:void(0)' class='start3'><i class='fa fa-sort-amount-desc fa-rotate-270'></i>启用增量</a></li> <li><a href='javascript:void(0)' class='start4'><i class='fa fa-sort-amount-asc fa-rotate-270'></i>启用磁盘全量</a></li><li><a href='javascript:void(0)' class='stop1'><i class='glyphicon glyphicon-stop'></i>停止</a></li></ul></div> </td></tr>"
                            }
                            var details = "<tr class='details details_tr'><td class='details' colspan='9'><table><tbody><tr><td>虚拟机名称:</td><td>"+vmname+"</td></tr>";
                            for(var c=0;c<length;c++) {
                                var data = json[k][c];
                                var bktype = data.bktype;
                                var exetype = data.exetype;
                                var exedate = data.exedate;
                                var exetime = data.exetime;
                                var bkid = parseInt(data.bkid);
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
                        //改变checkbox样式
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
                       //初始化dataTable
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
                        //选中th中的checkbox后td中的checkbox改变checked状态
                        jQuery('#sample_2 .group-checkable').change(function () {
                            var set = jQuery(this).attr("data-set");
                            var checked = jQuery(this).is(":checked");
                            jQuery(set).each(function () {
                                if (checked&&$(this).prop("disabled")==false) {
                                    $(this).attr("checked", true);
                                } else {
                                    $(this).attr("checked", false);
                                }
                            });
                            jQuery.uniform.update(set);
                        });
                        console.log(details_tr);
                       //点击+append区域
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
                        //点击-remove区域
                        $("#v_tbody_2").on("click",".row-details-open",function(){
                            $(this).attr("class","row-details row-details-close");
                            $(this).parent("td").parent("tr").next(".details_tr").remove();
                        });
                        //鼠标在区域内出现修改按钮
                        $("#v_tbody_2").on("mouseover",".details_tr",function(){
                            $(this).find(".cchange").show();
                            $(this).find(".cstart").show();
                        });
                        //鼠标在区域外修改按钮消失
                        $("#v_tbody_2").on("mouseout",".details_tr",function(){
                            $(this).find(".cchange").hide();
                            $(this).find(".cstart").hide();
                        });
                      /*  for(var i=0;i<details_tr.length;i++){
                            $("#v_tbody_2").find(".appendtr").eq(i).after(details_tr[i])
                        }*/
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
                                                url: "http://" + localhost + "/VirtualizationUnifiedBackup/deleteStrategyPlane",
                                                type: "get",
                                                async: false,
                                                data: $("#bk_plan_2").serialize(),
                                                success: function (data) {
                                                    $.confirm({
                                                        confirmButtonClass: 'btn btn-info',
                                                        cancelButtonClass: 'btn-danger',
                                                        confirmButton:'确认',
                                                        cancelButton:'取消',
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
                                    },
                                    否: function () {

                                    },
                                }
                            });
                        });
                        //启动
                        $("body").on("click",".start1",function(){
                            var Strateg=$(this).parent().parent().parent().parent().parent("tr").find("input[type='checkbox']").val();

                                    $.ajax({
                                        cache: true,
                                        url: "http://" + localhost + "/VirtualizationUnifiedBackup/StartStrateg",
                                        type: "get",
                                        async: false,
                                        data: {strategy:Strateg},
                                        success: function (data) {
                                            $.confirm({
                                                confirmButtonClass: 'btn btn-info',
                                                cancelButtonClass: 'btn-danger',
                                                confirmButton:'确认',
                                                cancelButton:'取消',
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

                        });


                        //停止
                        $("body").on("click",".stop1",function(){
                            var Strateg=$(this).parent().parent().parent().parent().parent("tr").find("input[type='checkbox']").val();
                            $.ajax({
                                cache: true,
                                url: "http://" + localhost + "/VirtualizationUnifiedBackup/StopStrateg",
                                type: "get",
                                async: false,
                                data:{strategy:Strateg} ,
                                success: function (data) {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton:'确认',
                                        cancelButton:'取消',
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

                        });
                        //启动策略
                        $("body").on("click",".cstart",function(){
                            var id=$(this).parent().parent("tr").find(".bkid_1").text();
                            $.ajax({
                                cache: true,
                                url: "http://" + localhost + "/VirtualizationUnifiedBackup/execuPlane",
                                type: "get",
                                async: false,
                                data:{id:id} ,
                                success: function (data) {
                                    $.confirm({
                                        confirmButtonClass: 'btn btn-info',
                                        cancelButtonClass: 'btn-danger',
                                        confirmButton:'确认',
                                        cancelButton:'取消',
                                        animation: 'zoom',
                                        closeAnimation: 'rotateXR',
                                        title: '策略启动成功！',
                                        content: '该策略备份任务启动成功！（此确认框会在3秒后消失）',
                                        autoClose: '确认|3000',
                                        buttons: {
                                            确认: function () {
                                             //   window.location.reload();
                                            }
                                        }
                                    });
                                },
                                error: function (data) {
                                    alert("system error")
                                }
                            })

                        });

                    }
                })
            }
        })
    }
});
$("#changecss").click(function(){
   $("#sample_1").find("th").eq(9).css("width","8%");
    $("#sample_1").find("th").eq(8).css("width","6%")
});




