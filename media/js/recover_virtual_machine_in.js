/**
 * Created by suge on 2017/7/18.
 */

/********************************************选择主机*****************************************************/
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
            url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getVirtCentBaseInfoByRe",
            "json/recover_virtual_machine1.json",
            dataType: "json",
            async: false,
            success: function (data) {
                var string = "";
                for (var k in data) {
                    var length = data[k].length;
                    var ip = k;
                    //k为第一层
                    string += "<li><a href='javascript:void(0)' data-role='branch' class='tree-toggle closed' data-toggle='branch' data-value='Bootstrap_Tree'><span class='ip'></span>" + k + "</a><ul class='branch'>"
                    var a = data[k];
                    for (var i = 0; i < length-1; i++) {
                        var b = a[i];
                        var vcuser = a[length-1].vcuser;
                        var vcpasswd = a[length-1].vcpasswd;
                        for (var n in b) {
                            //n为第二层
                            string += "<li><a href='javascript:void(0)' class='tree-toggle closed two' data-toggle='branch' data-value='Bootstrap_Tree'><span class='flag'></span>" + n + "</a> <ul class='branch'>"
                            var length2 = b[n].length;
                            for (var l = 0; l < length2; l++) {
                                //b[l]为第三层
                                string += "<li><a href='javascript:void(0)' data-role='leaf' class='tree-toggle closed vmid three' data-value='Bootstrap_Tree'><span class='vm'></span>" + b[n][l] + "</a></li>"
                            }
                            string += "</li></ul>"
                        }
                    }
                    string += "</li></ul>"
                }
                $("#tree_1").append(string);
            }
        });
    }
});

$("body").on("click",".vmid",function(){
    var vcuser =$(this).children(".vcuser").val();
    var vcpasswd =$(this).children(".vcpasswd").val();
    var ip =$(this).children(".ip").val();
    var VmName = $(this).text();
    var this_=$(this).parent("li");
    var this_2 = $(this);
    if(this_.children("ul").length==0) {
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
                    url: //"http://" + localhost + "/VirtualizationUnifiedBackup/getVersionByVmNameRe",
                        "json/recover_virtual_machine2.json",
                    data: {"VmName": VmName},
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        var arr=data;
                        var resJson={};
                        var a=[];
                        for(var i=0;i<arr.length;i++){
                            var key=arr[i]['vmFullNum'];
                            if(!resJson[key]){
                                var cc=[];
                                a.push(cc);
                                resJson[key]=cc;
                            }
                            resJson[key].push(arr[i]);
                        }
                        console.log(a);
                        var length2 = a.length;
                        var string = "<ul class='branch in'>";
                        for (var n = 0; n < length2; n++) {
                            var starttime = a[n][0].starttime;
                            var length3 = a[n].length;
                            var id = parseInt(a[n][0].id);
                            var vcid = a[n][0].vcid;
                            var vmbktype =a[n][0].vmbktype;
                            var starttime1 = starttime.substring(0,starttime.length-2);
                            if (length3 == 1 && vmbktype!=3) {
                                string += "<li><input type='radio' name='ip' value='' class='radio ip_'><a href='javascript:void(0)' data-role='leaf' class='five hover_' ><span class='timepoint2'></span><span class='starttime'>" + starttime1 + "</span><span class='id hide'>"+id+"</span><span class='vcid_ hide'>"+vcid+"</span><span class='type'>(完全备份点)</span></a></li>"
                            }
                            if(length3!=1 && vmbktype!=3) {
                                string += "<li><input type='radio' name='ip' value='' class='radio ip_'><a href='javascript:void(0)' class='tree-toggle closed four hover_' data-toggle='branch' data-value='Bootstrap_Tree'><span class='timepoint2'></span><span class='starttime'>" + starttime1 + "</span><span class='id hide'>"+id+"</span><span class='vcid_ hide'>"+vcid+"</span><span class='type'>(完全备份点)</span></a><ul class='branch'>";
                                for (var h = 1; h < length3; h++) {
                                    var starttime2 = a[n][h].starttime.substring(0,a[n][h].starttime.length-2);
                                    var id2 =parseInt(a[n][h].id);
                                    var vcid2 = a[n][h].vcip;
                                    string += "<li><input type='radio' name='ip' class='radio ip_2' value=''><a href='javascript:void(0)' data-role='leaf' class='six hover_'><span class='timepoint'></span><span class='starttime'>" + starttime2 + "</span><span class='id hide'>"+id2+"</span><span class='vcid_ hide'>"+vcid2+"</span><span class='type'>(增量备份点)</span></a>";
                                }
                                string += "</ul></li>"
                            }


                        }
                        string += "</ul>";
                        this_.append(string)

                    }
                })
            }
        });
    }
});
$("body").on("click",".tree-toggle",function () {
    $(this).addClass("closed");
    $(this).parent("li").children("ul").removeClass("in");
});
$("body").on("click",".closed",function () {
    $(this).removeClass("closed");
    $(this).parent("li").children("ul").addClass("in");
});
$("body").on("click",".hover_",function () {
    $(".hover_").removeClass("eee");
    $(this).addClass("eee");
    $(this).parent("li").children("input[type='radio']").attr("checked",true);
    $(".suzhu").show();
});

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
            url: //"http://" + localhost + "/VirtualizationUnifiedBackup/getVcentListbyRe",
            "json/recover_virtual_machine3.json",
            dataType: "json",
            async: false,
            success: function (data) {
                var length =data.length;
                for(var i=0;i<length;i++) {
                    var vcip = data[i].vcip;
                    var vcuser = data[i].vcuser;
                    var vcpasswd = data[i].vcpasswd;
                    $("#tree_2").append("<li><a href='javascript:void(0)' data-role='branch'  class='tree-toggle closed vcip' data-toggle='branch' data-value='Bootstrap_Tree'><span class='vmware'></span>"+vcip+"</a><input type='text' class='vcuser hide' value='"+vcuser+"'><input type='text' class='vcpasswd hide' value='"+vcpasswd+"'></li>")
                }
            }
        })
    }
});
$("body").on("click",".vcip",function () {
    var ip =$(this).text();
    var this_1 = $(this);
    var this_=$(this).parent("li");
    var vcuser =$(this).parent("li").children(".vcuser").val();
    var vcpasswd =$(this).parent("li").children(".vcpasswd").val();
    if(this_.children("ul").length==0) {
        $(".spinner").show();
        $(".black_overlay").show();
        $.ajax({
            cache: true,
            type: "get",
            url: 'localhost.json',
            dataType: "json",
            async: true,
            success: function (data) {
                $(".spinner").hide();
                $(".black_overlay").hide();
                var localhost = data[0].localhost;
                $.ajax({
                    cache: true,
                    type: "get",
                    url: //"http://" + localhost + "/VirtualizationUnifiedBackup/getEsxiIpList",
                        "json/recover_virtual_machine4.json",
                    dataType: "json",
                    data: {"Ip": ip, "Username": vcuser, "PassWord": vcpasswd},
                    async: false,
                    success: function (data) {
                        var length = data.length;
                        var string = "<ul class='branch in'>";
                        for (var i = 0; i < length; i++) {
                            string += "<li><a href='javascript:void(0)' data-role='leaf' class='host_' data-value='Bootstrap_Tree'><span class='host'></span>" + data[i] + "</a></li>";
                        }
                        string += "</ul>";
                        this_.append(string);
                        /*  if(this_1.hasClass("closed")){
                         this_.children("ul").remove();

                         }
                         else{
                         this_.append(string)
                         }*/
                    }
                })
            }
        })
    }

});

$("#tab_1_").click(function(){
    $(this).parent("li").removeClass("active");
    $("#tab_2_").parent("li").removeClass("active");
    $(this).parent("li").addClass("active");
    $("#tab_1").fadeIn();
    $("#tab_2").hide();
});
$("#tab_2_").click(function(){
    $(this).parent("li").removeClass("active");
    $("#tab_1_").parent("li").removeClass("active");
    $(this).parent("li").addClass("active");
    $("#tab_1").hide();
    $("#tab_2").fadeIn();
});
$("body").on("click",".host_",function(){
    $(".host_").removeClass("eee");
    $(this).addClass("eee");
    $("#backup_2").show();
    var Ip = $(".iframe2").find(".eee").parent().parent().parent().children(".vcip").text();
    var Username = $(".iframe2").find(".eee").parent().parent().parent().children(".vcuser").val();
    var PassWord = $(".iframe2").find(".eee").parent().parent().parent().children(".vcpasswd").val();
    var TarIp = $(".iframe2").find(".eee").text();
    var name = $("#tab1").find($("input[type='radio']:checked")).parent().parent("ul").parent("li").children("a").text();
    var name2 =name+"/"+name+".vmdk";
/*
    $.ajax({
        cache:true,
        type:"get",
        url:"localhost.json",
        async:false,
        success:function(data){
            var localhost = data[0].localhost;
            $.ajax({
                cache:true,
                type:"get",
                url:"http://"+localhost+"/VirtualizationUnifiedBackup/getDatastoreNameList",
                data:{"Ip":Ip,"Username":Username,"PassWord":PassWord,"TarIp":TarIp},
                async:false,
                success:function(data){
                    var length = data.length;
                    var string ="";
                    for(var i=0;i<length;i++){
                        var data_ = "["+data[i]+"]";
                        string+="<tr><td class='highlight'>"+data_+"</br>"+name2+"</td><td class='hidden-xs'>100GB</td><td class='vmstorage'><select><option value=''>"+data[i]+"</option></select></td></tr>"

                    }
                    $("#disk").html(string)
                }
            });
        }
    });*/
    /*
     <tr><td class='highlight'>[datastore1(4)]vm_cd_dev_monitor01/vm_cd_dev_monitor01.vmdk</td><td class='hidden-xs'>100GB</td><td class='vmstorage'><select><option value=''>datastore1(6)(VMFS,总容量:19.09TB,可用空间:18.7TB)</option></select></td></tr>
     */
});
