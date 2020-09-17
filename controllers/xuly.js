const socket = io.connect("http://localhost:3000")

$(document).ready(function(){
    $("#login").show();
    $("#mess1").hide();
    $("#login-btn").click(function(){
        socket.emit("guiuserlenclient", $("#text-name").val());
    });
    $("#btn-chat").click(function(){
        socket.emit("guichatlensever", $("#text").val());
    });

    // $("#logout").click(function(){
    //     socket.emit("logout");
    // });
});

socket.on("dangnhapthatbai", function(){
    alert("Ten ban da bi trung!");
});

socket.on("dangnhapthanhcong", function(data){
    $("#login").hide(2000);
    $("#mess1").show(1000);
    $("#ten").append("<h3>" + data + "</h3>")
});

socket.on("guidanhsachuser", function(data){
    $("#user").html("");
    data.forEach(function(i){
        $("#user").append("<div class='index-user'> <span>" + i + "</span></div>")
    });
});



socket.on("guichotatcauser", function(data){
    $("#mess-result").append("<div class='index-mess-result'>" + data.user + ": " + data.data + "</div>")
})