function download_data() {
    //user input txt field will be logged automatically

    var output = { label:" ",gStart: "Fiat", gEnd: "500", bStart: "white", bEnd: "" };
    var output = {}

    $(".sliderValues").each(function () {
        //get the name of the input block
        var name = $(this).attr('name');

        // get the value of label
        // alert($("[name='" + t_box_name + "']").val());
        //find the corresponding input tags for slider 1
        var time_track = { label: " ", gStart: "Fiat", gEnd: "500", bStart: "white", bEnd: "" };

        var sliderData = $(this);

        //find the corresponding slider values for slider one
        var gMinValue = $(".T1_Slider[name='" + name + "']").eq(0).find(".rail").eq(0).find("img").eq(0).attr('aria-valuetext').split(" ")[1];
        var gMaxValue = $(".T1_Slider[name='" + name + "']").eq(0).find(".rail").eq(0).find("img").eq(1).attr('aria-valuetext').split(" ")[1];
        var bMinValue = $(".T1_Slider[name='" + name + "']").eq(0).find(".rail").eq(1).find("img").eq(0).attr('aria-valuetext').split(" ")[1];
        var bMaxValue = $(".T1_Slider[name='" + name + "']").eq(0).find(".rail").eq(1).find("img").eq(1).attr('aria-valuetext').split(" ")[1];

        // var t_box_name = "Activity Segment " + name.split("-")[1] +"-"+ name.split("-")[2];
        var key = name.split("-")[1] + "-" + name.split("-")[2]
        var t_box_name = "Activity Segment " + key;
        time_track.label = $("[name='" + t_box_name + "']").val();
        time_track.gStart = gMinValue;
        time_track.gEnd = gMaxValue;
        time_track.bStart = bMinValue;
        time_track.bEnd = bMaxValue;

        sliderData.val(JSON.stringify(time_track));

        // output the JSON File in here
        var value = sliderData.val(); //retrieve array
        var pvalue = JSON.parse(value);

        // retriving the json file
        // console.log(pvalue);

        output[key] = time_track;
    });



    // stringify JSON Object
    var jsonContent = JSON.stringify(output);
    console.log(jsonContent);

    saveText( jsonContent, "output.json" );

}

function saveText(text, filename){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }