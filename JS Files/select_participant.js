// the original video speed (wpm)
// var P1 = {"vid_1":"control","vid_2":"slow","vid_3":"pause"};
// var P2 = {"vid_1":"slow","vid_2":"pause","vid_3":"control"};
// var P3 = {"vid_1":"pause","vid_2":"control","vid_3":"slow"};

var conditions = {
    "P1":{"vid_1":"control","vid_2":"slow","vid_3":"pause"},
    "P2":{"vid_1":"slow","vid_2":"pause","vid_3":"control"},
    "P3":{"vid_1":"pause","vid_2":"control","vid_3":"slow"}
}


$(".part_id_box div input").on("click",function(){
      ;
        // get the participant id
        part_id =  $(this).prop("class");
        // get the current video id globally
        var current_vid = current_video; 
        // console.log(current_video);
        set_condition(part_id,current_vid); 

        // set other check boxes to unchecked
        $(".part_id_box div input").each(function(){
            if($(this).prop("class")!=part_id){
                $(this).prop("checked",false);
            }
        });
});



function set_condition(current_part,current_vid){
    var original_speed = $("#vid1").attr("vid_speed");
    var v_factor = 120/original_speed
    condition = conditions[current_part]; 

    // obtain the commands based on the current video
    var commands = []; 
    if (current_vid=="vid_1"){
        commands = string_to_command(condition["vid_1"]); 
    }else if (current_vid=="vid_2"){
        commands = string_to_command(condition["vid_2"]); 
    }else{
        commands = string_to_command(condition["vid_3"]); 
    }

    //apply the commands
    var speed_status = commands[0];
    var pause_status = commands[1];

    if(speed_status){
        console.log("Adjust video speed to 120 wpm by applying a factor of "+v_factor);
        video.playbackRate = v_factor;
        $(".v_on").prop("checked",true);
        $(".v_off").prop("checked",false);

    }else{
        console.log("Restore video speed")
        video.playbackRate = 1;
        $(".v_on").prop("checked",false);
        $(".v_off").prop("checked",true);
    }

    if(pause_status){
        console.log("turn on pause control");
        $(".pause_on").prop("checked",true);
        $(".pause_off").prop("checked",false);
        pause_control(true); 

    }else{
        console.log("turn off pause control");
        $(".pause_on").prop("checked",false);
        $(".pause_off").prop("checked",true);
        pause_control(false); 
    }

}


function string_to_command(str){
    // translate string conditions into commands
    if(str=="control"){
        // turn off both speed control and pause control
        return [false,false];
    }else if(str=="slow"){
        // turn on only speed control
        return [true,false];
    }else{
        //turn on only pause control
        return [false,true];
    }
}