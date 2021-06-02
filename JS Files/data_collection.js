var totalTimer;
var viewTimer;
var taskTimer;

var total_time;
var view_time;
var task_time;

function  start_total_timer(){

  var ready_start = confirm("Ready to start?");

  if (ready_start){
    total_time = 0;
    start_view_timer();
    start_task_timer();

    $("#ready_but").hide();
    $("#finish_but").show();
    $(".exp_area").show();
  
    $(".play_but").each(function(){
      $(this).prop("disabled",false); 
    });
  
    totalTimer = setInterval(function() {
      total_time++; 
        // console.log("Task time passed: " + task_time + " s");
      }, 1000);  
  }

  reload_and_hide(); 
  // $(".vid_timeline").show();

}

function start_view_timer(){
  //record the time passed while the user stay on the instruction page
  view_time=0;
  viewTimer = setInterval(function() {
    if(document.visibilityState=='visible'){
      view_time++;
    }
    }, 1000);  
}


function start_task_timer(){
  //record the time passed while the user switches to the task page
  task_time=0;
  taskTimer = setInterval(function() {
    if(document.visibilityState!='visible'){
      task_time++;
    }
    }, 1000);  
}


function stop_total_timer(){

  var complete_task = confirm("Confirm completing the task?");
  var video = document.getElementById('vid1');


  if (complete_task){
    $("#finish_but").hide();
    $("#survey_but").show();
    //clear the total timer
    clearInterval(totalTimer);
    // clear the pause duration timer
    clearInterval(pauseTimer);
    //clear the view timer
    clearInterval(viewTimer);
    //clear the task tiemer
    clearInterval(taskTimer);
    video.pause();
    console.log("Task timer removed!");
    // get current condition & video
    // write time to JSON
    output["completion_time"] = total_time; 
    output["view_time"] = view_time; 
    output["task_time"] = task_time; 

    output["num_pauses_a"] = pause_count_a; 
    output["num_pauses_m"] = pause_count_m; 

    output["num_switches"] = num_switches; 

    output["num_rewinds"] = rewind_count; 
    output["pause_duration"] = pause_duration; 
    output["pause_loc_a"] = pause_loc_a; 
    output["pause_loc_m"] = pause_loc_m; 
    output["replayTime"] = replayTime; 


    push_to_stack();
    // clear count and duration
    refresh_data(); 
  }

}

function load_Qnaire(){
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSfUhrr2qXTVEi7UZ3snmnHTevDGvjpHl8cpNAIF57_IV8O0lg/viewform?usp=sf_link");
}


function reset_task_status_buts(){
  $("#ready_but").show();
  $("#finish_but").hide();
  $("#survey_but").hide();
}
function download_file() {
  //user input txt field will be logged automatically
  output_json['task_data'] = data_stack;
  // stringify JSON Object
  var jsonContent = JSON.stringify(output_json);
  console.log(jsonContent);

  saveText( jsonContent, "output.json" )

}

function save_data(){
  output_json['task_data'] = data_stack;
  // stringify JSON Object
  var jsonContent = JSON.stringify(output_json);
  console.log(jsonContent);
  $(".email").prop('value','gdsyzx@hotmail.com');
  $(".name").prop('value','study_data');
  $(".data").prop('value',jsonContent);

  // link to form submission
  

}

function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}