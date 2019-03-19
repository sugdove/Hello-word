/**
 * Created by suge on 2017/5/31.
 */
/*
<div class="contain-file-div">
    <div class="contain-folder-div">
    </div>
    <div class="file-name-div" title="sssssssssssssss">
    test1sssssssssssssssssssss
    </div>
    </div>

    <div class="contain-file-div">
    <div class="contain-text-div">
    </div>
    <div class="file-name-div" title="sssssssssssssss">
    test1sssssssssssssssssssss
    </div>
    </div>
*/
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
            type: "get",
            url: "http://"+localhost+"/VirtualizationUnifiedBackup/getFileLIst?Path=",
            dataType: "json",
            async: false,
            success: function (data) {
                var length = data.length;
                var i = 0;
                for (i; i < length; i++) {
                    if (data[i].Type == "folder") {
                        var name = data[i].Name;
                        var index = name.lastIndexOf("\/");
                        var folder_name = name.substring(index + 1, name.length);
                        $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + name + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='" + folder_name + "'>" + folder_name + "</div></div>")
                    }
                }
                var t = 0;
                for (t; t < length; t++) {
                    if (data[t].Type == "file") {
                        var name2 = data[t].Name;
                        var index2 = name2.lastIndexOf("\/");
                        var file_name = name2.substring(index2 + 1, name2.length);
                        $("#file-list-div").append("<form action='http://"+localhost+"/VirtualizationUnifiedBackup/download'  ><div class='contain-file-div file11'><input type='text' name='filePath' value='" + name2 + "' style='display: none'><input type='text' name='fileName' value='" + file_name + "' style='display: none'><div class='contain-text-div'></div> <div class='file-name-div' title='" + file_name + "'>" + file_name + "</div></div></form>")
                    }
                }
            }
        });
        $("#base_catalog").click(function(){
            $.ajax({
                cache: true,
                type: "get",
                url: "http://"+localhost+"/VirtualizationUnifiedBackup/getFileList?Path=",
                dataType: "json",
                async: false,
                success: function (data) {
                    $("#file-list-div").find(".contain-file-div").remove();
                    var length = data.length;
                    var i = 0;
                    for (i; i < length; i++) {
                        if (data[i].Type == "folder") {
                            var name = data[i].Name;
                            var index = name.lastIndexOf("\/");
                            var folder_name = name.substring(index + 1, name.length);
                            $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + name + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='" + folder_name + "'>" + folder_name + "</div></div>")
                        }
                    }
                    var t = 0;
                    for (t; t < length; t++) {
                        if (data[t].Type == "file") {
                            var name2 = data[t].Name;
                            var index2 = name2.lastIndexOf("\/");
                            var file_name = name2.substring(index2 + 1, name2.length);
                            $("#file-list-div").append("<form action='http://"+localhost+"/VirtualizationUnifiedBackup/download'  ><div class='contain-file-div file11'><input type='text' name='filePath' value='" + name2 + "' style='display: none'><input type='text' name='fileName' value='" + file_name + "' style='display: none'><div class='contain-text-div'></div> <div class='file-name-div' title='" + file_name + "'>" + file_name + "</div></div></form>")
                        }
                    }
                }
            });
        })
    //
        $(window).unload(function(){
             $.ajax({
             cache: true,
             type: "post",
             url: "http://" + localhost + "/VirtualizationUnifiedBackup/umountDisk",
             async: false,
             success: function (data) {
                 console.log("卸载成功");
             }
             });

        });
        /*$(".unmount").click(function(){
             $.ajax({
                 cache: true,
                 type: "post",
                 url: "http://" + localhost + "/filerestore/Unmountdisk",
                 async: false,
                 success: function (data) {
                     alert("right")
                 }
             })
         })*/

    }

})
$("body").on("click",".folder11",function(){
    var path =$(this).find("input[type='text']").val();
    var index = path .lastIndexOf("\/");
    var folder_name_2  = path .substring(0, index);
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
                url: "http://"+localhost+"/VirtualizationUnifiedBackup/getFileList",
                data:{"Path":path},
                dataType: "json",
                async: false,
                success: function (data) {

                    $("#file-list-div").find(".contain-file-div").remove();
                    $("#file-list-div").find("form").remove();
                    if ((folder_name_2) != "/mnt") {
                        $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + folder_name_2 + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='返回上一级'>../</div></div>")
                    }
                    var length = data.length;
                    var i = 0;
                    for (i; i < length; i++) {
                        if (data[i].Type == "folder") {
                            var name = data[i].Name;
                            var index = name.lastIndexOf("\/");
                            var folder_name = name.substring(index + 1, name.length);
                            $("#file-list-div").append("<div class='contain-file-div folder11'><input type='text' value='" + name + "' style='display: none'><div class='contain-folder-div'></div> <div class='file-name-div' title='" + folder_name + "'>" + folder_name + "</div></div>")
                        }
                    }
                    var t = 0;
                    for (t; t < length; t++) {
                        if (data[t].Type == "file") {
                            var name2 = data[t].Name;
                            var index2 = name2.lastIndexOf("\/");
                            var file_name = name2.substring(index2 + 1, name2.length);
                            $("#file-list-div").append("<form action='http://"+localhost+"/VirtualizationUnifiedBackup/download' ><div class='contain-file-div file11'><input type='text' name='filePath' value='" + name2 + "' style='display: none'><input type='text' name='fileName' value='" + file_name + "' style='display: none'><div class='contain-text-div'></div> <div class='file-name-div' title='" + file_name + "'>" + file_name + "</div></div></form>")
                        }
                    }
                }
            })
        }
    })

});


   $("body").on("click",'.file11',function(){
       var this_=this;
       var file_name = $(this).find(".file-name-div").text();
       var path = $(this).find("input[type='text']").val();

       $.confirm({
           confirmButtonClass: 'btn btn-info',
           cancelButtonClass: 'btn-danger',
           confirmButton: '确认',
           cancelButton: '取消',
           animation: 'zoom',
           closeAnimation: 'rotateXR',
           title: '恢复？',
           content: '确认是否恢复（此确认框会在8秒后消失）',
           autoClose: '否|8000',
           buttons: {
               deleteUser: {
                   text: '是',
                   action: function () {
                       $(this_).parent().submit();
                   }
               },
               否: function () {

               },
           }
       });

   })
