

var event;
function showNotifications(event) {
    var dropdowns = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
    if(event == "notifications")  {
        document.getElementById("notifications").classList.toggle("show");
    }

    if(event == "help") {
        document.getElementById("help").classList.toggle("show");
    }
    if(event == "profile") {
        document.getElementById("profile").classList.toggle("show");
    }

    if(event == "people") {
        document.getElementById("people").classList.toggle("show");
    }

    if(event == "mode") {
        document.getElementById("mode").classList.toggle("show");
    }
}


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("tab-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}