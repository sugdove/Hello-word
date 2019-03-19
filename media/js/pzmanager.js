/**
 * Created by suge on 2017/7/24.
 */
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
            url: //"http://" + localhost + "/VirtualizationUnifiedBackup/mysqlConfRead",
                "json/pzmanager.json",
            async: false,
            success: function (data) {
                if(data!=null){
                    $("#ip").val(data.dbip);
                    $("#port").val(data.dbport);
                    $("#user").val(data.dbuser);
                    $("#paw").val(data.dbpasswd)
                }
            }
        })
    }
});
