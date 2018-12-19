
function track_onload() {
    let x = document.getElementById("myDIV");
    x.style.display = "none";
}


var track = function () {

    let x = document.getElementById("myDIV");

    var search_data = document.getElementById('search').value.trim()
    $.post(urlEndpoint + '/search/cores/track/query', { track: search_data },
        function (returnedData) {
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

        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });
};


var ship = function () {

    ocument.getElementById('add_sender_name').value
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
        }).fail(function () {
            console.log("error");
        });


}


function admin_onload() {


    $.post(urlEndpoint + '/search/cores/track/query_all_track', {},
        function (returnedData) {
            console.log(returnedData)
            let wrapper = document.getElementById("myHTMLWrapper");

            let myHTML = '';

            for (let i = 0; i < returnedData.length; i++) {
                let address_for = returnedData[i].sender.address + " " + returnedData[i].sender.sub_distric + " " + returnedData[i].sender.distric + " " + returnedData[i].sender.province + " " + returnedData[i].sender.postid
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
            document.getElementById('admin_viewtrack_track').innerHTML=returnedData.track
            document.getElementById('admin_viewtrack_sender_name').value =returnedData.sender.name
            document.getElementById('admin_viewtrack_sender_address').value =returnedData.sender.address
            document.getElementById('admin_viewtrack_sender_sub_distric').value =returnedData.sender.sub_distric
            document.getElementById('admin_viewtrack_sender_distric').value =returnedData.sender.distric
            document.getElementById('admin_viewtrack_sender_province').value =returnedData.sender.province
            document.getElementById('admin_viewtrack_sender_postid').value =returnedData.sender.postid
            document.getElementById('admin_viewtrack_sender_phone').value =returnedData.sender.phone
            document.getElementById('admin_viewtrack_sender_description').value =returnedData.description
            document.getElementById('admin_viewtrack_sender_weight').value =returnedData.description
        
            document.getElementById('admin_viewtrack_receiver_name').value =returnedData.receiver.name
            document.getElementById('admin_viewtrack_receiver_address').value =returnedData.receiver.address
            document.getElementById('admin_viewtrack_receiver_sub_distric').value =returnedData.receiver.sub_distric
            document.getElementById('admin_viewtrack_receiver_distric').value =returnedData.receiver.distric
            document.getElementById('admin_viewtrack_receiver_province').value =returnedData.receiver.province
            document.getElementById('admin_viewtrack_receiver_postid').value =returnedData.receiver.postid
            document.getElementById('admin_viewtrack_receiver_phone').value =returnedData.receiver.phone

        }).fail(function () {
            console.log("error");
            window.alert("ไม่พบข้อมูลที่หา")
        });


}

function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}