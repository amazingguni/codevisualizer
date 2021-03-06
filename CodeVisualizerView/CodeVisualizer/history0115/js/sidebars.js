(function(global, $) {

	var codiad = global.codiad;

	codiad.sidebars = {

		userLock : true,
		modalLock : false,

		init : function() {

			var _this = this;

			$('#lock-left-sidebar').on('click', function() {
				if (_this.userLock) {

					_this.userLock = false;
					$('#lock-left-sidebar').html('V');

				} else {

					_this.userLock = true;
					$('#lock-left-sidebar').html('U');

				}
			});

			// Left Column Slider
			$("#sb-left").hoverIntent(function() {
				var timeout_r = $(this).data("timeout_r");
				if (timeout_r) {
					clearTimeout(timeout_r);
				}
				var sbarWidth = $("#sb-left").width();
				$('#editor-region').animate({
					'margin-left' : sbarWidth + 'px',
					'width' : ($('body').outerWidth() - sbarWidth - 10) + 'px'
				}, 300, 'easeOutQuart', function() {
					$(this).trigger('h-resize-init');
				});
				$(this).animate({
					'left' : '0px'
				}, 300, 'easeOutQuart');
			}, function() {
				var sbarWidth = $("#sb-left").width();
				$(this).data("timeout_r", setTimeout($.proxy(function() {
					if (!codiad.sidebars.userLock && !codiad.sidebars.modalLock) {// Check locks
						$(this).animate({
							'left' : (-sbarWidth + 10) + "px"
						}, 300, 'easeOutQuart');
						$('#editor-region').animate({
							'margin-left' : '10px',
							'width' : ($('body').outerWidth() - 20) + 'px'
						}, 300, 'easeOutQuart', function() {
							$(this).trigger('h-resize-init');
						});
					}
				}, this), 500));
			});

			// Right Column Slider
			$("#sb-right").hoverIntent(function() {
				var timeout_r = $(this).data("timeout_r");
				if (timeout_r) {
					clearTimeout(timeout_r);
				}
				$('#editor-region').animate({
					'margin-right' : '200px'
				}, 300, 'easeOutQuart');
				$(this).animate({
					'right' : '0px'
				}, 300, 'easeOutQuart');
			}, function() {
				$(this).data("timeout_r", setTimeout($.proxy(function() {
					$(this).animate({
						'right' : '-190px'
					}, 300, 'easeOutQuart');
					$('#editor-region').animate({
						'margin-right' : '10px'
					}, 300, 'easeOutQuart');
				}, this), 500));
			});

			$("#sb-left .sidebar-handle").draggable({
				axis : 'x',
				drag : function(event, ui) {
					newWidth = ui.position.left;
					$("#sb-left").width(newWidth + 10);
				},
				stop : function() {
					$(window).resize();
					$('#editor-region').trigger('h-resize-init');
				}
			});
		}
	};

})(this, jQuery); 