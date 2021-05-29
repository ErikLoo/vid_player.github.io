// the original video speed (wpm)
// var P1 = {"vid_1":"control","vid_2":"slow","vid_3":"pause"};
// var P2 = {"vid_1":"slow","vid_2":"pause","vid_3":"control"};
// var P3 = {"vid_1":"pause","vid_2":"control","vid_3":"slow"};
// initialize the json output
var output_json = {task_data:""};
var data_stack = [];
var output = { vid: "", part_id:"",condition:"", completion_time: "", view_time:"", task_time:"",num_switches:'',num_pauses_a: "", num_pauses_m: "", pause_duration:"", pause_loc_a:"",pause_loc_m:"",num_rewinds: "" };


var conditions = {
    "P1":{"vid_1":"pause","vid_2":"pause","vid_3":"control","vid_4":"control"},
    "P2":{"vid_3":"pause","vid_1":"pause","vid_2":"control","vid_4":"control"},
    "P3":{"vid_2":"control","vid_3":"control","vid_1":"pause","vid_4":"pause"},
    "P4":{"vid_1":"control","vid_2":"pause","vid_3":"pause","vid_4":"control"},
    "P5":{"vid_3":"control","vid_1":"control","vid_2":"pause","vid_4":"pause"},
    "P6":{"vid_2":"control","vid_3":"pause","vid_1":"control","vid_4":"pause"}
}

var ordering = {
    "P1":["panel1","panel2","panel3","panel4"],
    "P2":["panel1","panel3","panel2","panel4"],
    "P3":["panel1","panel4","panel2","panel3"],
    "P4":["panel2","panel3","panel1","panel4"],
    "P5":["panel2","panel4","panel1","panel3"],
    "P6":["panel3","panel4","panel1","panel2"]
    }

init_condition(); 
// choose a participant and the corresponding condition
// $(".part_id_box div input").on("click",function(){
//       ;
//         // get the participant id
//         part_id =  $(this).prop("class");
//         // get the current video id globally
//         var current_vid = current_video; 
//         // console.log(current_video);
//         set_condition(part_id,current_vid); 

//         // set other check boxes to unchecked
//         $(".part_id_box div input").each(function(){
//             if($(this).prop("class")!=part_id){
//                 $(this).prop("checked",false);
//             }
//         });

//         $(".confirm_but").prop("disabled",false);
// });

function init_condition(){

    part_id = "P" + get_current_p();
    order = ordering[part_id];
    $("[rel='"+order[0]+"']").after($("[rel='"+order[1]+"']"));
    $("[rel='"+order[1]+"']").after($("[rel='"+order[2]+"']"));
    $("[rel='"+order[2]+"']").after($("[rel='"+order[3]+"']"));

    $("[rel='"+order[1]+"']").css({ margin:5});
    $("[rel='"+order[2]+"']").css({ margin:5});

    var current_vid = current_video; 
    $("."+part_id).prop("checked",true); 
    set_condition(part_id,current_vid); 
    reload_and_hide(); 
}

function update_JSON(vid,part_id,condition){
        output['vid'] = vid;
        output['part_id'] = part_id;
        output['condition'] = condition;
}

function push_to_stack(){
    var new_output = {};
    Object.assign(new_output,output);
    data_stack.push(new_output);
    console.log(data_stack);
}


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
    }else if (current_vid=="vid_3"){
        commands = string_to_command(condition["vid_3"]); 
    }else{
        commands = string_to_command(condition["vid_4"]); 
    }

    update_JSON(current_vid,current_part,condition[current_vid]);

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
        console.log("Turn on pause control");
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

// get current participants from the URL parameters
function get_current_p(){
    var url_string = document.URL; //window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("p");
    console.log(c);
    if (c==null){
        alert("Participant id not specified in the url (for example,... index.html?p=1)");
        alert("Add a participants id to the url (for example,... index.html?p=1)");
    }

    return c
}