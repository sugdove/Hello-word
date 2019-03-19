  //获取主机列表
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
              url: //"http://"+localhost+"/VirtualizationUnifiedBackup/getVirtCentListRe",
                  "json/recover_file1.json",
              dataType: "json",
              async: false,
              success: function (data) {
                  var length = data.length;
                  var i = 0;
                  for (i; i < length; i++) {
                      var vcip = data[i].vcip;
                      var vcid = data[i].vcid;
                      $(".ulpadding").append("<li><img src='media/image/computer.jpg' class='img1'><div class='dbSelect1'><img src='media/image/dbSelect.png' class='img2' ></div><p class='computer_name'>" + vcip + "</p><input type='text'style='display: none' name='vcid' class='ip_vcid' value='" + vcid + "'></li>")
                  }
                  //通过主机vcid获取虚拟机
                  $(".img1").click(function () {
                      $("#sample_2").dataTable().fnDestroy();
                      $("#virtual_machine").find("tr").remove();
                      $(".img2").hide();
                      $(this).parent('li').find('.img2').show();
                      var vcid = $(this).parent('li').find('.ip_vcid').val();
                      $.ajax({
                          cache: true,
                          type: "get",
                          url: "http://"+localhost+"/VirtualizationUnifiedBackup/getVmListWithDiskBk?vcid=" + vcid,
                          dataType: "json",
                          async: false,
                          success: function (data) {

                              var length = data.length;
                              var i = 0;
                              for (i; i < length; i++) {
                                  var c = i + 1;
                                  var vmname = data[i].vmname;
                                  var vmid = data[i].vmid;
                                  var num = data[i].num;
                                  var vcid = data[i].vcid;
                                  $("#virtual_machine").append("<tr><td>" + c + "</td><td>" + vmname + "</td><td class='hidden-480'>" + vmid + "</td><td class='hidden-480'>" + num + "</td><td class='hidden-480'>" + vcid + "</td></tr>");
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
                              $("#sample_2").dataTable({
                                  "aLengthMenu": [
                                      [5, 15, 20, -1],
                                      [5, 15, 20, "All"] // change per page values here
                                  ],
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
                              //通过虚拟机相关信息获取版本号列表
                              $(document).on("click", "#virtual_machine tr", function () {
                                  var vmname = $(this).find("td").eq(1).text();
                                  var vmid = $(this).find("td").eq(2).text();
                                  var vcid = $(this).find("td").eq(4).text();
                                  $("#version_number").find("tr").remove();
                                  $("#myModalLabel").html("虚拟机:" + vmname);
                                  $.ajax({
                                      cache: true,
                                      type: "get",
                                      url: "http://"+localhost+"/VirtualizationUnifiedBackup/getVmVersionListWithDiskBk?vmid=" + vmid + "&vcid=" + vcid,
                                      dataType: "json",
                                      async: false,
                                      success: function (data) {
                                          var i = 0;
                                          var length = data.length;
                                          for (i; i < length; i++) {
                                              var version = data[i].vmversion;
                                              var diskname = data[i].diskname;
                                              var bkstatus = data[i].bkstatus;
                                              var disksize = data[i].disksize;
                                              var endtime = data[i].endtime;
                                              var starttime = data[i].starttime;
                                              var disksize2 = ((parseFloat(disksize) / 1024) / 1024) / 1024;
                                              var disksize3 = disksize2.toFixed(1);
                                              $('#version_number').append("<tr><td>" + version + "</td><td>" + starttime + "</td><td class='hidden-480'>" + endtime + "</td><td class='hidden-480'>" + diskname + "</td><td class='hidden-480'>" + disksize3 + "</td><td class='hidden-480'><img src='media/image/ok.png'>成功</td></tr>")
                                          }
                                          $("#myModal").modal('show');
                                          //通过版本号获取磁盘列表
                                          $("#version_number tr").click(function () {
                                              var version = $(this).find("td").eq(0).text();
                                              var diskname_2 = $(this).find("td").eq(3).text();
                                              $("#disk_ul").find("li").remove();
                                              $.ajax({
                                                  cache: true,
                                                  type: "get",
                                                  url: "http://"+localhost+"/VirtualizationUnifiedBackup/getFileList?vmid=" + vmid + "&version=" + version + "&diskname=" + diskname_2,
                                                  dataType: "json",
                                                  async: false,
                                                  success: function (data) {
                                                      var i = 0;
                                                      var length = data.length;
                                                      if (length == "0") {
                                                          $.confirm({
                                                              confirmButtonClass: 'btn btn-info',
                                                              cancelButtonClass: 'btn-danger',
                                                              animation: 'zoom',
                                                              closeAnimation: 'rotateXR',
                                                              title: '没有磁盘！',
                                                              content: '此磁版本号中没有磁盘！（此确认框会在8秒后消失）',
                                                              autoClose: '返回|8000',
                                                              buttons: {
                                                                  返回: function () {

                                                                  }
                                                              }
                                                          });
                                                      }
                                                      else {
                                                          for (i; i < length; i++) {
                                                              var Nr = data[i].Nr;
                                                              var Size = data[i].Size;
                                                              var Size1 = (parseFloat(Size) / 1024) / 1024;
                                                              var Size2 = Size1.toFixed(1);
                                                              var Sytem = data[i].Sytem;
                                                              $("#disk_ul").append("<li><input type='text' value='" + Nr + "' style='display: none'><h5 class='center_disk'>磁盘编号：" + Nr + "</h5><img src='media/image/disk.png' class='disk_img'><h5 class='center_disk'>磁盘大小：" + Size2 + "(GB)</h5><h5 class='center_disk'>磁盘类型：" + Sytem + "</h5></li>");
                                                          }
                                                          $("#myModal2").modal('show');
                                                          //通过选择磁盘进行磁盘（选卸载）挂载，然后跳转到文件列表页面
                                                             $(".disk_img").click(function () {
                                                           $(".spinner").show();
                                                           $(".black_overlay").show();
                                                           var par_num = $(this).parent("li").find("input[type='text']").val();
                                                           $.ajax({
                                                                 cache: true,
                                                           type: "post",
                                                           url: "http://"+localhost+"/VirtualizationUnifiedBackup/umountDisk",
                                                           async: false,
                                                           success: function (data) {
                                                           $.ajax({
                                                           cache: true,
                                                           type: "get",
                                                           url: "http://"+localhost+"/VirtualizationUnifiedBackup/mountDisk?DiskName=" + vmid + "/" + version + "/" + diskname_2 + "&PartitionNum=" + par_num,
                                                           dataType: "json",
                                                           async: true,
                                                           success: function (data) {
                                                           $(".spinner").hide();
                                                           $(".black_overlay").hide();
                                                           if (data[0] == "1") {
                                                           $.confirm({
                                                           confirmButtonClass: 'btn btn-info',
                                                           cancelButtonClass: 'btn-danger',
                                                           animation: 'zoom',
                                                           closeAnimation: 'rotateXR',
                                                           title: '挂载失败！',
                                                           content: '此磁盘可能已经挂载！（此确认框会在8秒后消失）',
                                                           autoClose: '返回|8000',
                                                           buttons: {
                                                           返回: function () {

                                                           },
                                                           }
                                                           });
                                                           }
                                                           else {
                                                           $.confirm({
                                                           confirmButtonClass: 'btn btn-info',
                                                           cancelButtonClass: 'btn-danger',
                                                           animation: 'zoom',
                                                           closeAnimation: 'rotateXR',
                                                           title: '挂载成功！',
                                                           content: '即将跳转文件恢复页面！（此确认框会在8秒后消失）',
                                                           autoClose: '确定|8000',
                                                           buttons: {
                                                           确定: function () {
                                                           window.location.href = "file_list.html"
                                                           },
                                                           }
                                                           });
                                                           }

                                                           }
                                                           })
                                                           }
                                                           })
                                                           })
                                                      }
                                                  }
                                              })
                                          })
                                      }
                                  });
                              });
                          }
                      });
                  });
              },
              error: function (data) {
                  alert("wrong")
              }
          });

      }
  });