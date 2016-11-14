(function(global, $) {

	var codiad = global.codiad = {};

	$(function() {
		// Sliding sidebars
		codiad.sidebars.init();
		var handleWidth = 10;

		$(window).on('load resize', function() {

			var marginL, reduction;
			if ($("#sb-left").css('left') !== 0 && !codiad.sidebars.userLock) {
				marginL = handleWidth;
				reduction = 2 * handleWidth;
			} else {
				marginL = $("#sb-left").width();
				reduction = marginL + handleWidth;
			}
			$('#editor-region').css({
				'margin-left' : marginL + 'px',
				'width' : ($('body').outerWidth() - reduction) + 'px',
				'height' : ($('body').outerHeight() - 25) + 'px'
			});

		});

		// $('#login').click(function(){
		// codiad.modal.load(400, 'editor/dialog.php?action=login');
		// codiad.modal.hideOverlay();
		// });
	});

})(this, jQuery);

