$(document).ready(function(){

  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    } 
  });

  // On the page load

  // Adding opacity to element other than about
  $(".about").removeClass("bar");
  $(".education").addClass("bar");
  $(".relation").addClass("bar");


  // Adding extra styling to the border of about
  $(".about").addClass("barTop");
  $(".education").removeClass("barTop");
  $(".relation").removeClass("barTop");

  // Displaying the about button and hiding others
  $("#abt").show();
  $("#rel").hide();
  $("#ed").hide();
  
  // Displaying the info of about and hiding others
  $("#abtInfo").show();
  $("#relInfo").hide();
  $("#eduInfo").hide();
  

  // On about click
  $(".about").on('click', function(){

    $("#rsb").slideUp(500);

    // Opacity Classes
    $(".about").removeClass("bar");
    $(".education").addClass("bar");
    $(".relation").addClass("bar");

    // click effects Classes
    $(".about").addClass("barTop");
    $(".education").removeClass("barTop");
    $(".relation").removeClass("barTop");

    // show the button
    $("#abt").show();
    $("#rel").hide();
    $("#ed").hide();
    
    // show the info
    $("#abtInfo").fadeIn(1000);
    $("#relInfo").hide();
    $("#eduInfo").hide();
    
  });

  // On education click
  $(".education").on('click', function(){
    
    $("#rsb").slideUp(500);

    // Opacity Classes
    $(".about").addClass("bar");
    $(".education").removeClass("bar");
    $(".relation").addClass("bar");

    // click effects Classes
    $(".about").removeClass("barTop");
    $(".education").addClass("barTop");
    $(".relation").removeClass("barTop");

    // show the button
    $("#abt").hide();
    $("#rel").hide();
    $("#ed").show();
    
    // show the info
    $("#abtInfo").hide();
    $("#relInfo").hide();
    $("#eduInfo").fadeIn(1000);
    
  });

  // On relation click
  $(".relation").on('click', function(){

    $("#rsb").slideUp(500);

    // Opacity Classes
    $(".about").addClass("bar");
    $(".education").addClass("bar");
    $(".relation").removeClass("bar");

    // click effects Classes
    $(".about").removeClass("barTop");
    $(".education").removeClass("barTop");
    $(".relation").addClass("barTop");

    // show the button
    $("#abt").hide();
    $("#rel").show();
    $("#ed").hide();
    
    // show the info
    $("#abtInfo").hide();
    $("#relInfo").fadeIn(1000);
    $("#eduInfo").hide();
    
  });

  // Hamburger slide effects
  $("#rb").on('click', function(){
    $("#rsb").slideToggle();
  });

  var fbToken = "EAACEdEose0cBAInGlqPVaouTHRiZBRPHZAp8HzrkIS3qH2coZCK6H25pf5ZAPX5BVqZB8SkiZCuO841Xyq4iWYPDa1a7ZAX3F3A02UiDM7ooXHv66ShZCsfa4sRxrLKXNtBUNieBxkefZBMtprGi660e12rtuOlvQdmd1yDaBsZAvVZBkkYJqlWcdDtvnwELmLgpdcZD";

  $.ajax('https://graph.facebook.com/me?fields=name,id,location,favorite_athletes,hometown,quotes,gender,birthday,languages,relationship_status,education,family,email,picture.width(300).height(300),friends&access_token='+fbToken,{
    success: function(response){
      

      $(".profilepic").attr("src", response.picture.data.url);

      // Username
      if(response.name !== null && response.name !== undefined){
        $(".username").text(response.name);  
      }
      else{
        $(".username").text(null);
      }
      
      // Total friends
      $(".friends").text(response.friends.summary.total_count);

      // Favorite Athletes
      if(response.favorite_athletes !== null && response.favorite_athletes !== undefined){
        $(".athletes").text(response.favorite_athletes.length);
      }
      else{
        $(".athletes").text("0");
      }

      // Location Details
      if(response.location !== null && response.location!== undefined){
        $("#location").text(response.location.name);  
      }
      else if(response.hometown !== null && response.hometown !== undefined){

        $("#location").text(response.hometown.name);
      }
      else{
        $("#location").text("(empty)");
      }
      
      // Favourite Quotes
      if(response.quotes !== null && response.quotes !== undefined){
        $("#quotes").text(response.quotes);  
      }
      else{
        $("#quotes").text("(empty)");
      }

      // Gender Details
      $("#gender").text(response.gender);
      
      // Date Of Birth
      $("#dob").text(response.birthday);
      
      // Languages Details
      if(response.languages !== null && response.languages !== undefined){
        for(var i = 0; i < response.languages.length; i++){
        div = document.createElement("div");
        $(div).attr("class", "lang"+i);
        $('#languages').append(div);
          $(".lang"+i).html("<p>"+response.languages[i].name+"</p>");
        }  
      }
      else{
        $("#languages").text("(empty)");
      }
      
      // Email Details
      $("#email").text(response.email);

      // RelationshipStatus Details
      $("#relationshipStatus").text(response.relationship_status);

      // Family Details
      if(response.family !== null && response.family !== undefined){
        for(var i = 0; i < response.family.data.length; i++){
          div = document.createElement("div");
          $(div).attr("class", "fam"+i);
          $('#family').append(div);
          $(".fam"+i).html("<p>"+response.family.data[i].name+ " ("+ response.family.data[i].relationship +")</p>");
        }  
      }
      else{
        $("#family").text("(empty)");
      }
      
      // EDUCATION Details
      if(response.education !== null && response.education !== undefined){
        for(var i = 0; i < response.education.length; i++){
          if(response.education[i].type === "High School"){
            div = document.createElement("div");
            $(div).attr("class", "schl"+i);
            $('#school').append(div);
            $(".schl"+i).html("<p>"+response.education[i].school.name+"</p>");
          }
          else if(response.education[i].type === "College"){
            div = document.createElement("div");
            $(div).attr("class", "clg"+i);
            $("#college").append(div);
            $(".clg"+i).html("<p>"+response.education[i].school.name+"</p>"); 
          }
          else{
            $("#school").text("(empty)");
            $("#college").text("(empty)");
          }
        }
      }
      else {
        $("#schlType").text("School:");
        $("#clgType").text("College:");
        $("#school").text("(empty)");
        $("#college").text("(empty)");
      }
    },
    error : function(request,errorType,errorMessage){

                    console.log(request);
                    console.log(errorType);
                    alert(errorMessage);
      },

    timeout:10000, // in ms

    beforeSend : function(){
                $('.profile').hide();
                $('.loader').show();

      },

      complete : function(){
                $('.profile').show();
                $('.loader').hide();

      }
  });
});
