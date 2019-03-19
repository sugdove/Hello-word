/**
 * Created by suge on 2017/7/24.
 */
/**
 * Created by suge on 2017/7/24.
 */
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
            url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getVirtCentList",
                "json/virtualization.json",
            dataType: "json",
            async: true,
            success: function (data) {
                var length = data.length;
                var i = 0;
                //获取虚拟化中心列表
                for (i; i < length; i++) {
                    var i_ =i+1;
                    var vcid = parseInt(data[i].vcid);
                    var vcip = data[i].vcip;
                    var tyep = data[i].type;
                    var vcuser = data[i].vcuser;
                    var vccreattime = data[i].vccreattime;
                    var admin = "暂时没有";
                    var vcStorepath = data[i].vcStorepath;
                    var vcpasswd = data[i].vcpasswd;
                    $("#v_tbody").append("<tr class='odd gradeX'><td class='sorting_1'><input type='checkbox' name='vcid' class='checkboxes'value='" + vcid + "'></td><td>" + i_ + "</td><td>vm_bak_monitor1</td><td class='hidden-480'>备份</td><td class='hidden-480'><span class='label label-info'>一般</span></td><td class='hidden-480'>2017-07-24 19:21:37</td><td>任务成功</td><td><span class='label label-default'>未响应</span></td><td><a>详情</a></td></tr>")

                }

                $("#v_tbody tr").each(function () {
                    if ($(this).find("td").eq(3).text() == "1") {
                        $(this).find("td").eq(3).text("VMware vSphere")
                    }
                    if ($(this).find("td").eq(3).text() == "0") {
                        $(this).find("td").eq(3).text("Citrix XenServer")
                    }
                    /*if($(this).find("td").eq(3).text()=="1"){
                     $(this).find("td").eq(3).text("全磁盘备份")
                     }*/
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
                $('#sample_1').dataTable({
                    "aoColumnDefs": [
                        {"orderable": false, "aTargets": [0, 2, 3, 4, 5, 6, 7, 8]}// 制定列不参与排序
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
                    "aaSorting": [[1, "asc"]],//默认第几个排序
                });
                //checkboxes的全选和全不选
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
                //删除虚拟机
                $("#delete_virtcent").click(function () {
                    $.ajax({
                        url: "http://"+localhost+"/VirtualizationUnifiedBackup/deleteVirtCent",
                        cache: true,
                        type: "get",
                        data: $("#virtcent").serialize(),
                        async: false,
                        success: function (data) {
                            window.location.reload();
                        }
                    })
                });
            },

            error: function (data) {

                alert("wrong");

            }

        });
    }
})

