$(document).ready(function(){
	$('.list-entry-like').click(function(){	
		var self = $(this);	
		var cid = $(this).attr('data-cid');
		var uid = $('#uid').val();

		if($(this).hasClass('fa-plus')){
			$.ajax({
				type: "POST",
				context: self,
				url: "/like",
				timeout: 2000,
				data: { uid: uid, cid: cid },
				success: function(data){
					$(self).removeClass('fa-plus').addClass('fa-check');
				}
			});
		}
		else{
			$.ajax({
				type: "POST",
				context: self,
				url: "/unlike",
				timeout: 2000,
				data: { uid: uid, cid: cid },
				success: function(data){
					$(self).removeClass('fa-check').addClass('fa-plus');
				}
			});
		}
	});
});

function likeCallback(){
	console.log("Reached server");
}