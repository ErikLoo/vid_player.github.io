function setupCheckbox(){
        
    // get the current vid
    // video = document.getElementById('vid1')


    $(".v_off").prop("checked",true);
    // $(".v_75").prop("checked",false);
    $(".v_on").prop("checked",false);


     $(".v_off").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        video = document.getElementById('vid1');

        // $(".v_75").prop("checked",false);
        $(".v_on").prop("checked",false);

        if( $(".v_off").prop("checked")){
            video.playbackRate = 1.0;
            console.log("Restore video speed")

        }
        //show the slider
    });


    // $(".v_75").on("click",function(){
    //     // alert("Yes" +count)
    //     //uncheck No box
    //     video = document.getElementById('vid1');

    //     $(".v_100").prop("checked",false);
    //     $(".v_50").prop("checked",false);
    //     if( $(".v_75").prop("checked")){
    //         video.playbackRate = 0.75;
    //         console.log("set playback to " + 0.75)

    //     }
    //     //show the slider
    // });

    $(".v_on").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        video = document.getElementById('vid1');
        original_speed = $("#vid1").attr("vid_speed");
        v_factor = 120/original_speed
        // $(".v_75").prop("checked",false);
        $(".v_off").prop("checked",false);
        if( $(".v_on").prop("checked")==true){
            // video.playbackRate = v_factor;
            console.log("Adjust video speed to 120 wpm by applying a factor of "+v_factor);
            video.playbackRate = v_factor;

        }
        //show the slider
    });


    $(".pause_on").prop("checked",true);
    // by default set the pause to be on
    $(".pause_off").prop("checked",false);

     $(".pause_on").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
      if ($(".pause_on").prop("checked")){
        $(".pause_off").prop("checked",false);
        pause_control(true); 
    }else{
        $(".pause_off").prop("checked",true);

        // console.log("disable Pause");
        pause_control(false); 

      }

    });


    $(".pause_off").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        if ($(".pause_off").prop("checked")){
            $(".pause_on").prop("checked",false);
            pause_control(false); 


          }else{
            $(".pause_on").prop("checked",true);
            pause_control(true); 


          }
    });

}