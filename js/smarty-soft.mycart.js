$(document).ready(function(){
	$.ajax({
    type:'post',
    url:'store_items.php',
    data:{
      action:"total"
    },
    success:function(response) {
			$("#cart-total").text(response);
    }
  });
    
  $('.size').on('change', function () {
  	var size   = $(this).val();
  	var color  = $(".color"). val();
  	var name	 = $(this).attr("data-name");
  	var summary = name+'-'+size+'-'+color;
  	$('.add-to-cart').attr("data-summary",summary);
  });
    
  $('.color').on('change', function () {
  	var color  = $(this).val();
  	var size   = $(".size"). val();
  	var name	 = $(this).attr("data-name");
  	var summary = name+'-'+size+'-'+color;
  	$('.add-to-cart').attr("data-summary",summary);
  });
    
	$('.add-to-cart').on('click', function () {
		var is_options 			= $(this).attr("summary");
		if(is_options == "SC"){
			var size 		= $(".size"). val(); 
			var color 	= $(".color"). val();

			if(size == ""){
				$("select#size").focus();
				return false;
			}
			if(color == ""){
				$(".color").focus();
				return false;
			}
		}if(is_options == "NSC"){ 
			var color 	= $(".color"). val();
			if(color == ""){
				$(".color").focus();
				return false;
			}
		}if(is_options == "SNC"){
			var size 		= $(".size"). val();
			if(size == ""){
				$("select#size").focus();
				return false;
			}
		}
	  var id 			= $(this).attr("data-id");
		var name		= $(this).attr("data-name");
		var price		= $(this).attr("data-price");
		var quantity	= $(this).attr("data-quantity");
		var summary	= $(this).attr("data-summary");
		var img_src		= $(this).attr("data-image");
  	var cart = $('.shopping-cart');
    var imgtodrag = $(this).parent().parent().prev().find("img").eq(0);
    $.ajax({
      type:'post',
      url:'store_items.php',
      data:{
        action:"add_to_cart",
        id:id,
        name:name,
        price:price,
        quantity:quantity,
        summary:summary,
        image:img_src
      },
      success:function(response) {
      	var data = JSON.parse(response);
      	$("#cart-total").text(data.total);
      	if(data.message != "Already exists in your cart"){
					if (imgtodrag) { 
			      var imgclone = imgtodrag.clone()
			        .offset({
			        top: imgtodrag.offset().top,
			        left: imgtodrag.offset().left+200
			      })
			      .css({
			        'opacity': '0.5',
			        'position': 'absolute',
			        'height': '150px',
			        'width': '150px',
			        'z-index': '100'
			      })
			      .appendTo($('body'))
			        .animate({
			          'top': cart.offset().top + 10,
			          'left': cart.offset().left + 180,
			          'width': 75,
			          'height': 75
			        }, 500, 'easeInOutExpo');
			        setTimeout(function () {
			          cart.effect("shake", {
			              times: 2
			          }, 200);
			        }, 500);
			        imgclone.animate({
			          'width': 0,
			          'height': 0
			        }, function () {
			          $(this).detach()
			        });
			    }
			    $("#success").text(data.message);
				}
        else {
        	$("#exists").text(data.message);
        }
      }
    });  
  });
  
  $('.Cart_empty').on('click', function () {
		$("div#my-cart-modal").remove();
		$.ajax({
      type:'post',
      url:'store_items.php',
      data:{
        action:"empty"
      },
      success:function(response) {
      	$("#cart-total").text(response);
      }
  	});
	});	
  	
	$('.shopping-cart').on('click', function () {
		$("div#my-cart-modal").remove();
		$.ajax({
      type:'post',
      url:'store_items.php',
      data:{
        action:"show_cart"
      },
      success:function(response) {
      	
      	$('body').append(response);
      	$("#my-cart-modal").modal('show');
      }
  	});
	});
});