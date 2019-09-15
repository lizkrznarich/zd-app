$(document).ready(function(){
    //not a secret - key is sent as url param in APOD api request
    var nasaApiKey = "TFtUNCGWFpQCN7pAdwvgLARTk2ENUR2M17kuRm3w";
    //check if we are in the sidebar or modal
    var isModal = false;
    if(window.location.pathname.indexOf("modal")>0){
      isModal = true;
    } 
    //determine photo date to request from APOD api 
    var requestedDate;
    if(isModal){
      var urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has('requestedDate')){
        requestedDate = urlParams.get('requestedDate'); 
      } 
    } else {
      var today = new Date();
      requestedDate = formatDate(today);
    }
    //get photo
    getPhoto(requestedDate);
    
    //init date picker
    var container=$('form').length>0 ? $('form').parent() : "body";
    var date_input=$('input[name="requestedDate"]');
    var options={
      format: 'yyyy-mm-dd',
      container: container,
      todayHighlight: true,
      autoclose: true,
      clearBtn: true
    };
    date_input.datepicker(options);

    //format date as YYYY-MM-DD for APOD api
    function formatDate(date) {
      var y = date.getFullYear().toString();
      var m = (date.getMonth() + 1).toString();
      var d = date.getDate().toString();
      (d.length == 1) && (d = '0' + d);
      (m.length == 1) && (m = '0' + m);
      var formattedDate = y + "-" + m + "-" + d;
      return formattedDate;
    }

    function getPhoto(date){
      $.ajax({
        type:"GET",
        url: "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey + "&date=" + date,
        headers: {Accept: "application/json"}
      })
      .done(function(data){
        //APOD API doesn't provide timezone and we don't know what time new photos are uploaded each day
        //depending on user timezone photo for requested date may not be available yet
        //show the photo date returned by the APOD api
        var displayDate="";
        if(data.date){
          var dateSplit = data.date.split('-');
          var returnedDate = new Date(Date.UTC(dateSplit[0], dateSplit[1]-1, dateSplit[2]));
          displayDate = returnedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'});
        }
        //copyright field is optional
        var copyright="";
        if(data.copyright){
          copyright = "Copyright: " + data.copyright;
        }
        
        if(data.url && data.media_type=="image"){
          $('#apod').html('<small>' + displayDate + '</small><h2>' + data.title + '</h2><img class="img-thumbnail img-responsive" src="' + data.url + '" alt="' + data.title + '" /><small>' + copyright + '</small>'
          );
        }
        //surprise! some APODs are actually youtube videos
        //show videos in youtube iframe
        if(data.url && data.media_type=="video"){
          var videoWidth = "";
          var videoHeight = "";
          if(isModal){
            videoWidth = "800";
            videoHeight = "450";
          } 
          $('#apod').html('<small>' + displayDate + '</small><h2>' + data.title + '</h2><iframe class="img-thumbnail img-responsive" src="' + data.url + '" lt="' + data.title + '" width="' + videoWidth + '" height="' + videoHeight + '" frameborder="0" allow="encrypted-media"></iframe><small>' + copyright + '</small><button class="btn btn-link" id="videoModal"> Open larger view</button>'
          );
        } 
        if(isModal){
          $('#videoModal').remove();
          $('#apod img, #apod iframe').removeClass('img-thumbnail');
          if (data.explanation){
            $('#apod').append('<p class="explanation">'+ data.explanation + '</p>');
          }
        }
      })
      .fail(function(){
          console.log("Oh noes! Error getting photo");
          $('#apod').html('<h2>Sorry, something went wrong getting the NASA picture of the day! Plese enjoy this photo of Camilla the space chicken instead.</h2><img id="apodThumb" class="img-responsive" src="Space_chicken.jpg" alt="Camilla the space chicken" /><small><a href="https://commons.wikimedia.org/wiki/File:Space_chicken.jpg">Space Chicken</a> by <a href="https://commons.wikimedia.org/wiki/User:BCampbell_(WMF)">BCampbell (WMF)</a> is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">CC BY SA 4.0</a></small>'
          );
      });
    }

    $('#dateSubmit').click(function(event){
        requestedDate = $('input[name="requestedDate"]').val();
        getPhoto(requestedDate);
    });

    $('#apod, #videoModal').click(function(event){
      event.preventDefault();
      if (!isModal) {
        client.invoke('instances.create', {
          location: 'modal',
          url: 'assets/modal.html?requestedDate=' + requestedDate,
          size: { 
            width: '800px',
            height: '1000px'
          }
        }).then(function(modalContext) {
          var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
          modalClient.on('modal.close', function() {
          });
        });
      }    
    });

});