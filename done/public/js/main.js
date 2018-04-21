$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target=$(e.target);
    const id= $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/jobs/'+id,
      success: function(response){
        alert('Deleting the job');
        window.location.href='/jobs/view';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
