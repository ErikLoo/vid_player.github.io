var taskCountUpTimer;
var task_time;
// var output = { vid: "Fiat", part_id:"",condition:" ", completion_time: "500", num_pauses: "white", avg_pause_dur:"", num_rewinds: "" };

function  start_task_timer(){
  task_time = 0;
  $("#ready_but").hide();
  $("#finish_but").show();
  $(".exp_area").show();

  $(".play_but").each(function(){
    $(this).prop("disabled",false); 
});

  taskCountUpTimer = setInterval(function() {
    task_time++; 
      console.log("Task time passed: " + task_time + " s");
    }, 1000);
  
  
}

function stop_task_timer(){
  $("#finish_but").hide();
  $("#survey_but").show();
  clearInterval(taskCountUpTimer);
  console.log("Task timer removed!");
  // get current condition & video
  // write time to JSON
  output["completion_time"] = task_time; 
  push_to_stack();
}

function write_to_file(){

}

function reset_task_status_buts(){
  $("#ready_but").show();
  $("#finish_but").hide();
  $("#survey_but").hide();
}
function download_file() {
  //user input txt field will be logged automatically
  output_json['data'] = data_stack;
  // stringify JSON Object
  var jsonContent = JSON.stringify(output_json);
  console.log(jsonContent);

  saveText( jsonContent, "output.json" )

}

function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}