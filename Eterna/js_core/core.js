
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
            let date = "";
            let time ="";
            let detail ="";
            let province_log ="";
            let i;
            for (i = 0; i < track_log.length; i++) {
                 date += track_log[i].date + "<br>"
                 time += track_log[i].time + "<br>"
                 detail += track_log[i].detail + "<br>"
                 province_log += track_log[i].province_log + "<br>"

            }
            document.getElementById('date').innerHTML = date
            document.getElementById('time').innerHTML = time
            document.getElementById('detail').innerHTML = detail
            document.getElementById('province_log').innerHTML = province_log




            if (x.style.display === "none") {
                x.style.display = "block";
            }

        }).fail(function () {
            console.log("error");
        });
};


