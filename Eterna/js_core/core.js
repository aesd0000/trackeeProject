
function track_onload() {
    let x = document.getElementById("myDIV");
    x.style.display = "none";
}


var track = function () {

    let x = document.getElementById("myDIV");

    var search_data = document.getElementById('search').value.trim()
    $.post(urlEndpoint + '/search/cores/track/query', { track: search_data },
        function (returnedData) {
            if (returnedData == null) {
                window.alert("ไม่พบพัสดุที่ท่านค้นหา")
            } else {


                console.log(returnedData);
                document.getElementById('sender_name').innerHTML = returnedData.sender.name
                document.getElementById('sender_address').innerHTML = returnedData.sender.address + " " +
                    returnedData.sender.sub_distric + " " + returnedData.sender.distric + " " + returnedData.sender.province + " " + returnedData.sender.postid
                document.getElementById('sender_phone').innerHTML = returnedData.sender.phone

                document.getElementById('receiver_name').innerHTML = returnedData.receiver.name
                document.getElementById('receiver_address').innerHTML = returnedData.receiver.address + " " +
                    returnedData.receiver.sub_distric + " " + returnedData.receiver.distric + " " + returnedData.receiver.province + " " + returnedData.receiver.postid
                document.getElementById('receiver_phone').innerHTML = returnedData.sender.phone

                let track_log = returnedData.table
                let wrapper_table = document.getElementById("wrapper_table");
                let table_html = "";
                let i;
                for (i = 0; i < track_log.length; i++) {
                    table_html += '<div class="row"><div class="span1"><i class="ico icon-circled icon-bgprimary   icon-time icon-2x"></i></div id="table"><div class="span2" style="margin-top: 15px;">' + track_log[i].date + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].time + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].detail + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].province_log + '</div></div></div>'


                }
                wrapper_table.innerHTML = table_html


                if (x.style.display === "none") {
                    x.style.display = "block";
                }
            }
        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });
};


var ship = function () {

    let add_sender_name = document.getElementById('add_sender_name').value
    let add_sender_address = document.getElementById('add_sender_address').value.trim()
    let add_sender_sub_distric = document.getElementById('add_sender_sub_distric').value.trim()
    let add_sender_distric = document.getElementById('add_sender_distric').value.trim()
    let add_sender_province = document.getElementById('add_sender_province').value.trim()
    let add_sender_postid = document.getElementById('add_sender_postid').value.trim()
    let add_sender_phone = document.getElementById('add_sender_phone').value.trim()
    let add_sender_description = document.getElementById('add_sender_description').value.trim()
    let add_sender_weight = document.getElementById('add_sender_weight').value.trim()


    let add_receiver_name = document.getElementById('add_receiver_name').value
    let add_receiver_address = document.getElementById('add_receiver_address').value.trim()
    let add_receiver_sub_distric = document.getElementById('add_receiver_sub_distric').value.trim()
    let add_receiver_distric = document.getElementById('add_receiver_distric').value.trim()
    let add_receiver_province = document.getElementById('add_receiver_province').value.trim()
    let add_receiver_postid = document.getElementById('add_receiver_postid').value.trim()
    let add_receiver_phone = document.getElementById('add_receiver_phone').value.trim()

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let today_format = dd + '/' + mm + '/' + yyyy;

    let datetext = today.toTimeString();
    let time_now = datetext.split(' ')[0];

    if (add_sender_name == null || add_sender_name == "" ||
    add_sender_address == null || add_sender_address == "" ||
    add_sender_sub_distric == null || add_sender_sub_distric == "" ||
    add_sender_distric == null || add_sender_distric == "" ||
    add_sender_province == null || add_sender_province == "" ||
    add_sender_postid == null || add_sender_postid == "" ||
    add_sender_phone == null || add_sender_phone == "" ||
    add_sender_description == null || add_sender_description == ""||
    add_sender_weight == null || add_sender_weight == ""||
    add_receiver_name == null || add_receiver_name == ""||
    add_receiver_address == null || add_receiver_address == ""||
    add_receiver_sub_distric == null || add_receiver_sub_distric == ""||
    add_receiver_distric == null || add_receiver_distric == ""||
    add_receiver_province == null || add_receiver_province == ""||
    add_receiver_postid == null || add_receiver_postid == ""||
    add_receiver_phone == null || add_receiver_phone == "")  
        {
        window.alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
        $.post(urlEndpoint + '/core/cores/track', {
            track: today.getTime(),
            sender_name: add_sender_name,
            sender_address: add_sender_address,
            sender_sub_distric: add_sender_sub_distric,
            sender_distric: add_sender_distric,
            sender_province: add_sender_province,
            sender_postid: add_sender_postid,
            sender_phone: add_sender_phone,
            receiver_name: add_receiver_name,
            receiver_address: add_receiver_address,
            receiver_sub_distric: add_receiver_sub_distric,
            receiver_distric: add_receiver_distric,
            receiver_province: add_receiver_province,
            receiver_postid: add_receiver_postid,
            receiver_phone: add_receiver_phone,
            description: add_sender_description + " " + add_sender_weight,
            time: time_now,
            date: today_format

        },
            function (returnedData) {
                console.log(returnedData)
                window.location.href = "/index-viewtrack.html?track=" + returnedData.track;
            }).fail(function () {
                console.log("error");
            });
    }

}


function admin_onload() {


    $.post(urlEndpoint + '/search/cores/track/query_all_track', {},
        function (returnedData) {
            console.log(returnedData)
            let wrapper = document.getElementById("myHTMLWrapper");

            let myHTML = '';

            for (let i = 0; i < returnedData.length; i++) {
                let address_for = returnedData[i].sender.address + " " + returnedData[i].sender.sub_distric + " " + returnedData[i].sender.distric + " " + returnedData[i].sender.province + " "
                myHTML += '<tr><td>' + (i + 1) + '</td><td><a href="/admin-viewtrack.html?track=' + returnedData[i].track + '">' + returnedData[i].track + '</a></td> <td >' + returnedData[i].sender.name + '</td> <td >' + address_for + ' </td><td >' + returnedData[i].sender.postid + '</td> <td >' + returnedData[i].sender.phone + ' </td><td>' + returnedData[i].description + ' </td> </tr>';
            }

            wrapper.innerHTML = myHTML


        }).fail(function () {
            console.log("error");
        });

}

function admin_viewtrack_onload() {


    let admin_viewtrack = getUrlVars()
    console.log(admin_viewtrack)
    $.post(urlEndpoint + '/search/cores/track/query', admin_viewtrack,
        function (returnedData) {

            console.log(returnedData)
            document.getElementById('admin_viewtrack_track').innerHTML = returnedData.track
            document.getElementById('admin_viewtrack_sender_name').value = returnedData.sender.name
            document.getElementById('admin_viewtrack_sender_address').value = returnedData.sender.address
            document.getElementById('admin_viewtrack_sender_sub_distric').value = returnedData.sender.sub_distric
            document.getElementById('admin_viewtrack_sender_distric').value = returnedData.sender.distric
            document.getElementById('admin_viewtrack_sender_province').value = returnedData.sender.province
            document.getElementById('admin_viewtrack_sender_postid').value = returnedData.sender.postid
            document.getElementById('admin_viewtrack_sender_phone').value = returnedData.sender.phone
            document.getElementById('admin_viewtrack_sender_description').value = returnedData.description
            document.getElementById('admin_viewtrack_sender_weight').value = returnedData.description

            document.getElementById('admin_viewtrack_receiver_name').value = returnedData.receiver.name
            document.getElementById('admin_viewtrack_receiver_address').value = returnedData.receiver.address
            document.getElementById('admin_viewtrack_receiver_sub_distric').value = returnedData.receiver.sub_distric
            document.getElementById('admin_viewtrack_receiver_distric').value = returnedData.receiver.distric
            document.getElementById('admin_viewtrack_receiver_province').value = returnedData.receiver.province
            document.getElementById('admin_viewtrack_receiver_postid').value = returnedData.receiver.postid
            document.getElementById('admin_viewtrack_receiver_phone').value = returnedData.receiver.phone

            let track_log = returnedData.table
            let admin_wrapper_table = document.getElementById("admin_wrapper_table");
            let table_html = "";
            let i;
            for (i = 0; i < track_log.length; i++) {
                table_html += '<div class="row"><div class="span1"><i class="ico icon-circled icon-bgprimary   icon-time icon-2x"></i></div id="table"><div class="span2" style="margin-top: 15px;">' + track_log[i].date + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].time + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].detail + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].province_log + '</div></div></div>'


            }
            admin_wrapper_table.innerHTML = table_html

        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });


}

function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


var add_table = function () {

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let today_format = dd + '/' + mm + '/' + yyyy;

    let datetext = today.toTimeString();
    let time_now = datetext.split(' ')[0];

    let add_table_track = getUrlVars()
    let add_table_status = document.getElementById('add_table_status').value
    let add_table_province = document.getElementById('add_table_province').value

    let data_add_table =
    {
        track: add_table_track.track,
        date: today_format,
        time: time_now,
        detail: add_table_status,
        province_log: add_table_province
    }

    console.log(data_add_table)

    $.post(urlEndpoint + '/search/cores/track/find_update', data_add_table,
        function (returnedData) {
            location.reload();

        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });

}




var werehouse = function () {
    let were_name = document.getElementById('were_name').value
    let were_address = document.getElementById('were_address').value.trim()
    let were_sub_distric = document.getElementById('were_sub_distric').value.trim()
    let were_distric = document.getElementById('were_distric').value.trim()
    let were_province = document.getElementById('were_province').value.trim()
    let were_postid = document.getElementById('were_postid').value.trim()
    let were_phone = document.getElementById('were_phone').value.trim()
    let were_description = document.getElementById('were_description').value.trim()

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let today_format = dd + '/' + mm + '/' + yyyy;

    let datetext = today.toTimeString();
    let time_now = datetext.split(' ')[0];

    if (were_name == null || were_name == "" ||
        were_address == null || were_address == "" ||
        were_sub_distric == null || were_sub_distric == "" ||
        were_distric == null || were_distric == "" ||
        were_province == null || were_province == "" ||
        were_postid == null || were_postid == "" ||
        were_phone == null || were_phone == "" ||
        were_description == null || were_description == "") {
        window.alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
        $.post(urlEndpoint + '/were/cores/were/add', {
            track: 'were' + today.getTime(),
            name: were_name,
            address: were_address,
            sub_distric: were_sub_distric,
            distric: were_distric,
            province: were_province,
            postid: were_postid,
            phone: were_phone,
            description: were_description,
            time: time_now,
            date: today_format

        },
            function (returnedData) {
                console.log(returnedData)
                window.location.href = "/index-werehouse_viewtrack.html?track=" + returnedData.track;
            }).fail(function () {
                console.log("error");
            });
    }

}



function viewtrack_onload() {

    let admin_viewtrack = getUrlVars()
    console.log(admin_viewtrack)
    $.post(urlEndpoint + '/search/cores/track/query', admin_viewtrack,
        function (returnedData) {

            console.log(returnedData)
            document.getElementById('viewtrack_track').innerHTML = returnedData.track
            document.getElementById('viewtrack_sender_name').innerHTML = returnedData.sender.name
            document.getElementById('viewtrack_sender_address').innerHTML = returnedData.sender.address + " " +
                returnedData.sender.sub_distric + " " + returnedData.sender.distric + " " + returnedData.sender.province + " " + returnedData.sender.postid
            document.getElementById('viewtrack_sender_phone').innerHTML = returnedData.sender.phone

            document.getElementById('viewtrack_receiver_name').innerHTML = returnedData.receiver.name
            document.getElementById('viewtrack_receiver_address').innerHTML = returnedData.receiver.address + " " +
                returnedData.receiver.sub_distric + " " + returnedData.receiver.distric + " " + returnedData.receiver.province + " " + returnedData.receiver.postid
            document.getElementById('viewtrack_receiver_phone').innerHTML = returnedData.sender.phone

            let track_log = returnedData.table
            let admin_wrapper_table = document.getElementById("viewtrack_wrapper_table");
            let table_html = "";
            let i;
            for (i = 0; i < track_log.length; i++) {
                table_html += '<div class="row"><div class="span1"><i class="ico icon-circled icon-bgprimary   icon-time icon-2x"></i></div id="table"><div class="span2" style="margin-top: 15px;">' + track_log[i].date + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].time + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].detail + '</div><div  class="span2" style="margin-top: 15px;">' + track_log[i].province_log + '</div></div></div>'


            }
            admin_wrapper_table.innerHTML = table_html

        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });


}


function werehouse_viewtrack_onload(){

    let admin_viewtrack = getUrlVars()
    console.log(admin_viewtrack)
    $.post(urlEndpoint + '/were/cores/were/query', admin_viewtrack,
        function (returnedData) {

            console.log(returnedData)
            document.getElementById('werehouse_viewtrack_track').innerHTML = returnedData.track
            document.getElementById('werehouse_viewtrack_name').innerHTML = returnedData.name
            document.getElementById('werehouse_viewtrack_address').innerHTML = returnedData.address + " " +
                returnedData.sub_distric + " " + returnedData.distric + " " + returnedData.province + " " + returnedData.postid
            document.getElementById('werehouse_viewtrack_phone').innerHTML = returnedData.phone

            document.getElementById('werehouse_viewtrack_description').innerHTML = returnedData.description
        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });


}

function admin_werehouse_onload() {


    $.post(urlEndpoint + '/search/cores/were/query_all_track', {},
        function (returnedData) {
            console.log(returnedData)
            let wrapper = document.getElementById("werehouse_myHTMLWrapper");

            let myHTML = '';

            for (let i = 0; i < returnedData.length; i++) {
                let address_for = returnedData[i].address + " " + returnedData[i].sub_distric + " " + returnedData[i].distric + " " + returnedData[i].province + " " 
                myHTML += '<tr><td>' + (i + 1) + '</td><td><a href="/admin-werehouse-viewtrack.html?track=' + returnedData[i].track + '">' + returnedData[i].track + '</a></td> <td >' + returnedData[i].name + '</td> <td >' + address_for + ' </td><td >' + returnedData[i].postid + '</td> <td >' + returnedData[i].phone + ' </td><td>' + returnedData[i].description + ' </td> </tr>';
            }

            wrapper.innerHTML = myHTML


        }).fail(function () {
            console.log("error");
        });

}

function admin_werehouse_viewtrack_onload(){

    let admin_viewtrack = getUrlVars()
    $.post(urlEndpoint + '/search/cores/were/query', admin_viewtrack,
        function (returnedData) {

            console.log(returnedData)
            document.getElementById('admin_werehouse_viewtrack_track').innerHTML = returnedData.track
            document.getElementById('admin_werehouse_viewtrack_name').value = returnedData.name
            document.getElementById('admin_werehouse_viewtrack_address').value = returnedData.address
            document.getElementById('admin_werehouse_viewtrack_sub_distric').value = returnedData.sub_distric
            document.getElementById('admin_werehouse_viewtrack_distric').value = returnedData.distric
            document.getElementById('admin_werehouse_viewtrack_province').value = returnedData.province
            document.getElementById('admin_werehouse_viewtrack_postid').value = returnedData.postid
            document.getElementById('admin_werehouse_viewtrack_phone').value = returnedData.phone
            document.getElementById('admin_werehouse_viewtrack_description').value = returnedData.description




        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });

}

var admin_werehouse_remove = function  () {

    let admin_viewtrack = getUrlVars()

    $.post(urlEndpoint + '/were/cores/were/remove', admin_viewtrack,
        function (returnedData) {
            console.log(returnedData)
            window.location.href = "/admin_werehouse.html"

        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });

}