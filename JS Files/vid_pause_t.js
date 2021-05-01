

// properties of vid 1
// default the pause timer to 300 secs
var pause_timer = 300;

var time_start_pause = 0; 
var time_start_play = 0;

// var myTimer; 
var myCountUpTimer; 
var time_passed = 0;

var listenerAttached = true; 



// var vid_1_pause_array = remove_redundant_pause([6.07, 27.24, 32.01, 38.18, 44.4, 52.76, 67.73, 71.56, 75.93, 78.91, 84.55, 89.21, 107.85]);
// var vid_1_pause_array = [118.869042];
// var vid_1_pause_array = [0,6.07,107.85,118.869042];

var vid_1_pause_array = [11,16,32,27.24, 32.01, 38.18, 44.4, 51,60, 71.56, 78.91,89.21,107.85];
var vid_1_duration_array = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
vid_1_speed = 154.85;

// properties of vid 2
// var vid_2_pause_array = remove_redundant_pause([14.08, 16.92, 28.42, 35.44, 44.02, 48.31, 51.63, 58.12, 60.32, 62.84, 68.7, 78.46, 81.59, 84.77, 94.01, 103.94, 107.51, 119.24, 125.1, 130.8, 133.11, 146.98]);
// var vid_2_duration_array = [300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0]
// vid_2_speed = 178.29;

// var vid_2_pause_array = remove_redundant_pause([9.58, 12.21, 14.41, 20.67, 26.49, 33.25, 37.01, 40.52, 42.48, 45.52, 49.26, 56.45, 60.82, 72.33, 77.93, 84.17, 88.29, 95.36, 98.97, 107.13, 109.21, 121.85]);
var vid_2_pause_array = [9.58, 20.67, 26.49, 45.52, 49.26, 56.45, 64,84.17, 95.36,100,109.21, 121.85];

var vid_2_duration_array = [300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0, 300.0]
vid_2_speed = 178.29;


// var vid_3_pause_array = remove_redundant_pause([13.71, 17.59, 32.98, 36.58, 43.72, 55.1, 64.83, 74.35, 81.16, 89.67, 109.08, 114.85, 133.19, 142.18, 150.94]);
// var vid_3_pause_array = [13.71, 17.59,23.5,32.98, 36.58, 43.72, 55.1, 64.83, 74.35, 81.16, 89.67, 109.08, 114.85, 133.19, 142.18, 150.94];
var vid_3_pause_array = [15.5,24.5];

var vid_3_duration_array = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300,300,300,300,300,300,300,300];
vid_3_speed = 165.62;

// start with vid_1
var pause_array = vid_1_pause_array;
var duration_array = vid_1_duration_array;
$("#vid1").attr("vid_speed",vid_1_speed);

// // If pause <=1
// var pause_array = [5.98, 11.46, 17.63, 24.05, 27.14, 31.92, 38.08, 44.3, 52.66, 60.99, 71.47, 78.81, 94.48, 107.75, 112.31, 115.93]

var thumb_array = [7,8,12,14,20,22,28,30,33,34,36,37,40,41,48,54,59,60];
var pause_index = 0
var n_frames=5; 
var old_f_num =0;
// var frame_array = [20,30,40];
//the vid pause is in ms
// puase duration will be calculated


// var paused_time = 0;
// time per frame in ms
var time_per_frame =0;

// console.log(time_per_frame)

var video = document.getElementById('vid1');
video.controls = false; 
var pause_dur = 1000;
var pause_on = true; 
// listen on the event
var count = 0
var during_pause = false; 
var pausing_function = function(){
    v_current_t = video.currentTime;
    // console.log(pause_on);
    if(Math.abs(v_current_t-old_f_num)>0.3 && isIn(v_current_t, pause_array) == true && duration_array[count]>=1)
    {
        if (video.paused!=true && pause_on==true){
            video.pause();
            pause_count++; 
            pause_loc.push(video.currentTime); 
            // blur the video
            // blur_video();
            darken_video(); 
            during_pause = true; 
            start_the_pause_timer();
            vid_dur = video.duration;
            play_rate = 0.75;
            addition_t = (1/play_rate-1)*vid_dur;
            // pause_dur = addition_t/pause_array.length*1000;
            // console.log("pause_dur: " + pause_dur_t);
            total_dur = pause_array[pause_array.length-1] - pause_array[0];
            var end_time = pause_array[pause_index];
            var start_time = 0;
            if (pause_index!=0){
                start_time = pause_array[pause_index-1];
            }
            // pause the video proprotionally to the gap length
            // pause_dur = addition_t*(end_time-start_time)/total_dur*1000;
            // pause_dur = duration_array[count]*1000
            // pause_dur = 300*1000
            // // frame_array = generate_frame_array(start_time,end_time,n_frames);
            // console.log("System pause at: " + video.currentTime + " for " + pause_dur/1000 + " seconds.");
            // remove the event listener after you paused the playback
            
            // update_src();    
            // showSnackBar();
            
            // myTimer = setTimeout(function(){
                
            // //     // if the pause button has been pressed do not proceed 
            //     if (intent_to_pause_during_thumb==false){
            //         hideSnackBar();
            //         // showSnackBar2();
            //         // video.currentTime = video.currentTime;
            //         console.log("System resume playing after pausing for " + pause_dur/1000 + "secs");
            //         video.play();
            //         unblur_video();
            //         during_pause = false; 
            //         clearInterval(myCountUpTimer);
            //     }else{
            //         console.log("System continue pausing");
            //     }
            // }, pause_dur);
            // remove the listener if the pause array is finished

        }
    }
    pause_on = true; 

};

var update_slider = function(){

    // check_video_ready = setInterval(function () {   

    //     if (video.readyState > 0) {
    //         var slider_val = video.currentTime/video.duration*1000;
    //         $(".slider").prop("value",slider_val);
   
    //         clearInterval(check_video_ready);
    //     }

    // }, 100);

    var slider_val = video.currentTime/video.duration*1000;
    if (!isNaN(slider_val)){
        $(".slider").prop("value",slider_val);
    }else{
        console.log("NaN found");
        $(".slider").prop("value",0);

    }
};

var update_slider_time = function(){
    // console.log(video.currentTime)
    if (!isNaN(video.currentTime)){
        $(".vid_current_time").text(convert_to_mins(video.currentTime));
    }else{
        $(".vid_current_time").text("0:00");

    }

    if (!isNaN(video.duration)){
        $(".vid_total_length").text(convert_to_mins(video.duration));
    }else{
        $(".vid_total_length").text("0:00");

    }
};



// call pausing fucntion when the timeupdate event has taken place
video.addEventListener("timeupdate", pausing_function);
video.addEventListener("timeupdate", update_slider);
video.addEventListener("timeupdate", update_slider_time);



listenerAttached = true;

function convert_to_mins(vid_time){
    var minutes_str = (vid_time/60|0).toString();
    var seconds = vid_time%60|0
    var seconds_str = seconds.toString();

    if (seconds<10){
        seconds_str = "0" + seconds_str;
    }

    return minutes_str+":"+seconds_str;
}

function pause_control(enable_pause){
    if (enable_pause==false){
        if (listenerAttached==true){
            video.removeEventListener('timeupdate', pausing_function);
            listenerAttached = false; 
            // hide ticks
            $(".ticks").hide();
            console.log("remove pause listener")

        }
    }else{
        if(listenerAttached==false){
            video.addEventListener("timeupdate", pausing_function);
            listenerAttached = true; 
            //show ticks
            $(".ticks").show();
            console.log("enable pause listener")

        }
    }
}

function  start_the_pause_timer(){
    time_passed=0;
    var total_time = duration_array[count]; 
    showSnackBar();
    myCountUpTimer = setInterval(function() {
        pause_duration++; 
        // if (intent_to_pause_during_thumb==false){
        //     // $("#time_left").text("Resume playing in " + (total_time-time_passed).toString() +" secs"); 
        // $("#time_left").text("Click here to continue"); 

        // }

        // showSnackBar();
        console.log("Time passed during pause : " + pause_duration + " s");

      }, 1000);
    
}

function update_src(){
    $("#snackbar").width($("#left").width());
    var thumbnails = $("#snackbar").find("img");
    var current_t = video.currentTime;
    var start_time = pause_array[pause_index-1];
    console.log("start t: " + start_time + "| current t: " + current_t);
    // var img_name = "thumbnails/7.JPG"
    var t_count = 0;

}

function isIn(number,array){
    // console.log(number)
    // return true if the current time is within 0.2 of the set value
    var range = 0.5
    var offset = 0.4
    for (i = 0; i < array.length; i++) {        
        if (number>array[i]-offset-0.2 && number<=array[i]+0.1-0.2){
            pause_index = i;
            old_f_num = number;
            count = i; 
            // video.currentTime = array[i]-0.2;
            return true;
        }
      }
    
    old_f_num = number;

    return false;
}

function getNextRewindTime(current_t,array){
    // console.log(number)
    // return the vid segment the current time is in
    var closest_pause = 0;
    var index = 0;
    for (i = 0; i < array.length; i++) {
        if (current_t-array[i]<0){
            if (i!=0){
                closest_pause = array[i-1];
                index = i-1
                break;
            }else{
                return 0; 
            }
        }
      }
    
      if (current_t - closest_pause >2){
        return closest_pause;
      }else{
        if (index==0){
            return 0;
        }
        return array[index-1];
      }
}

function generate_frame_array(start_t,end_t,n_frames){
    var duration = end_t-start_t;
    var time_space = duration/n_frames;
    var frame_array = []
    for (i=0;i<n_frames;i++){
        frame_array.push(start_t+i*time_space);
    }
    // console.log(start_t + "|" + end_t + "|" + n_frames);
    return frame_array;
}

function generate_frame_array_time_per_frame(start_t,end_t,time_per_frame){
    var duration = end_t-start_t;
    var frame_array = [];
    var n_frames = parseInt(duration/time_per_frame);
    for (i=0;i<n_frames;i++){
        frame_array.push(start_t+i*time_per_frame);
    }
    // console.log(start_t + "|" + end_t + "|" + n_frames);
    return frame_array;
}

// var intent_to_pause_during_thumb = false; 

function rewind(){
    video = document.getElementById('vid1');
    c_time = video.currentTime;

    c_time_1 = getNextRewindTime(c_time,pause_array);
    c_time_2 = c_time - 5

    pause_on = false; 
    video.currentTime = Math.max(c_time_1,c_time_2); 

    // console.log(count);
    console.log("Rewinded to t = " +Math.max(c_time_1,c_time_2)+ " sec");
    $("#vid_status").text("Rewind by 5 seconds"); 

    showVidSnackbar(); 
    // unblur_video(); 
    undarken_video(); 
    rewind_count++; 
    // console.log("Rewind by 2 secs");

    // video.play();

}

function forward(){
    video = document.getElementById('vid1');
    c_time = video.currentTime;
    c_time = c_time + 5;
    if (c_time!=0){
        video.currentTime = c_time;
    }
    console.log("Forward by 5 secs");
    $("#vid_status").text("Forward by 5 seconds"); 

    showVidSnackbar();  2
    unblur_video();

}


function play(){
    video = document.getElementById('vid1');
    // c_time = video.currentTime;
    // c_time = c_time + 2
    // if (c_time!=0){
    //     video.currentTime = c_time
    // }
    // console.log("Resume playing")
    // intent_to_pause_during_thumb = false; 
    hideSnackBar();
    $("#bar_txt").text("Auto Pause"); 

    // var x = document.getElementById("snackbar");

    // if (x.className == "show"){
    //     video.currentTime = video.currentTime + 0.5;

    // }
   
    // clearTimeout(myVar);
    if (video.paused){
        // clearTimeout(myTimer);
        clearInterval(myCountUpTimer);
        pause_duration = pause_duration + time_passed;
        // duration_array[count] = time_passed; 
        // console.log(time_passed + " s has passed");
        // console.log("pause duration updated");
        // during_pause = false; 
        console.log('Resume playing');
        // unblur_video();
        undarken_video(); 

        video.play ();
    }else{
        alert("video already playing");
    }

}

function pause(){
    video = document.getElementById('vid1');

    // var x = document.getElementById("snackbar");
    // x.className = "show";

    // if (video.paused){
    //     video.play()
    //     console.log("Resume playing")
    // }else{
    //     video.pause()
    // console.log("Paused by user")
    // }
//     var x = document.getElementById("snackbar");
//   if (video.paused){
//     console.log("intent to pause during pause")
//     intent_to_pause_during_thumb = true;
//     $("#time_left").text("Manually paused"); 

//   }else{
//     intent_to_pause_during_thumb = false; 
//   }

    if (video.paused){
        alert("video already paused")
    }else{
        video.pause();    
        // v_current_t = video.currentTime;
        pause_count++; 
        $("#bar_txt").text("视频暂停"); 
        start_the_pause_timer();
        pause_loc.push(video.currentTime); 
    }
    // clearTimeout(myTimer);
    
}    

function remove_redundant_pause(old_array){
    var new_array= [];
    old_t = old_array[0];
    new_array.push(old_t);
    for (i=0;i<old_array.length;i++){
        //enforce that the min duration between pauses must be 5 secs or more
        if(old_array[i]-new_array[new_array.length-1]>=5){
            new_array.push(old_array[i]);
        }
        old_t = old_array[i];
    }

    return new_array; 
}

function blur_video(){
    $("#vid1").css({" -webkit-filter": "blur(30px)","filter": "blur(30px)"});
}

function unblur_video(){
    $("#vid1").css({" -webkit-filter": "blur(0px)","filter": "blur(0px)"});
}

function darken_video(){
    $("#vid1").css({"filter": "brightness(50%)"});
}

function undarken_video(){
    $("#vid1").css({"filter": "brightness(1)"});
}