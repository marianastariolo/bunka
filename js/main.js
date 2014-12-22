/**
Simple goto function to give a smoother look at the scroll of the hashes
*/
$(function(){

	var duration = 400;
	function move_to( elem_id ){
		var scrollPos = $(elem_id).offset();
		scrollPos = scrollPos.top + 'px';
		jQuery('html, body').animate({scrollTop: scrollPos}, duration);
	}

	$('.goto').on('click',function(e){
		e.preventDefault();
		var elem_id = $(this).attr('href');
		move_to(elem_id);
	});
});
$(function(){

	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	} 

	function validate( form_element ){
		var required_fields = form_element.find('.required');
		for(var i=0; i< required_fields.length; i++){
			var val = required_fields.eq(i).val();
			if(val.length==0 || $.trim(val)==''){
				return 'All the fields are required';
			}
		};

		var email_fields = form_element.find('.required-email');console.log(email_fields);
		for(var i=0; i< email_fields.length; i++){
			var val = email_fields.eq(i).val(); console.log(validateEmail(val));
			if(validateEmail(val)==false){
				return 'Invalid email';
			}
		};

		return true;
	};

	
	$('form').submit(function(e){
		e.preventDefault();
		e.stopPropagation();
		var result = validate( $(this) );
		if( result==true ){
			var fields = {};
			var raw_fields = $(this).find('input,select');
			for(var i=0; i<raw_fields.length; i++){
				var fname = raw_fields.eq(i).attr('name');
				var fval = raw_fields.eq(i).val();
				fields[ fname ] = fval;	
			}
			$.post($(this).attr('action'), fields, function(res){
				if(res.error==false){
					raw_fields.val('');
				}
				$.fancybox.open({
					width: 600,
					height: 140,
					autoSize: false,
					content: '<header class="page-header"><h2>Message Sent</h2></header><p>'+ res.message +'</p>'
				});
			});
		} else {
			$.fancybox.open({
				width: 600,
				height: 140,
				autoSize: false,
				content: '<header class="page-header"><h2>Error</h2></header><p>'+ result +'</p>'
			});
		}
	});

});

