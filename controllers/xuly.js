const socket = io.connect("http://localhost:3000")

$(document).ready(function(){
    $("#login").show();
    $("#mess").hide();
    $("#login-btn").click(function(){
        socket.emit("guiuserlenclient", $("#text-name").val());
    });
    $("#btn-chat").click(function(){
        socket.emit("guichatlensever", $("#text").val());
    });
});

socket.on("dangnhapthatbai", function(){
    alert("Ten ban da bi trung!");
});

socket.on("dangnhapthanhcong", function(data){
    $("#login").hide(2000);
    $("#mess").show(1000);
});

socket.on("guidanhsachuser", function(data){
    $("#user").html("");
    data.forEach(function(i){
        $("#user").append("<div class='ctuser'>" + i + "</div>")
    });
});



socket.on("guichotatcauser", function(data){
    $("#chat").append("<div class='chat-1'>" + data.user + ": " + data.data + "</div>")
})