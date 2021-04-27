var taskCountUpTimer;
var task_time;
// var output = { vid: "Fiat", part_id:"",condition:" ", completion_time: "500", num_pauses: "white", avg_pause_dur:"", num_rewinds: "" };

function  start_task_timer(){

  var ready_start = confirm("Ready to start?");

  if (ready_start){
    task_time = 0;
    $("#ready_but").hide();
    $("#finish_but").show();
    $(".exp_area").show();
  
    $(".play_but").each(function(){
      $(this).prop("disabled",false); 
    });
  
    taskCountUpTimer = setInterval(function() {
      task_time++; 
        // console.log("Task time passed: " + task_time + " s");
      }, 1000);  
  }

  reload_and_hide(); 
  // $(".vid_timeline").show();

}

function stop_task_timer(){

  var complete_task = confirm("Confirm completing the task?");
  var video = document.getElementById('vid1');


  if (complete_task){
    $("#finish_but").hide();
    $("#survey_but").show();
    clearInterval(taskCountUpTimer);
    // clear the pause duration timer
    clearInterval(myCountUpTimer);
    video.pause();
    console.log("Task timer removed!");
    // get current condition & video
    // write time to JSON
    output["completion_time"] = task_time; 
    output["num_pauses"] = pause_count; 
    output["num_rewinds"] = rewind_count; 
    output["pause_duration"] = pause_duration; 
    output["pause_loc"] = pause_loc; 

    push_to_stack();
    // clear count and duration
    refresh_data(); 
  }

}

function load_Qnaire(){
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSccYZIaPbJZoDgcFz6Yyweqs9DeSOPmGnPEM8fYeBePpFgW-w/viewform?usp=sf_link");
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