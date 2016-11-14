if(jQuery) (function($){
	
	$.extend($.fn, {
		fileTree: function(o, h) {
			// Defaults
			if( !o ) var o = {};
			if( o.root == undefined ) o.root = '/';
			if( o.script == undefined ) o.script = 'jqueryFileTree.php';
			if( o.folderEvent == undefined ) o.folderEvent = 'click';
			if( o.expandSpeed == undefined ) o.expandSpeed= 500;
			if( o.collapseSpeed == undefined ) o.collapseSpeed= 500;
			if( o.expandEasing == undefined ) o.expandEasing = null;
			if( o.collapseEasing == undefined ) o.collapseEasing = null;
			if( o.multiFolder == undefined ) o.multiFolder = true;
			if( o.loadMessage == undefined ) o.loadMessage = 'Loading...';
			
			$(this).each( function() {
				
				function showTree(c, t) {
					
					$(c).addClass('wait');
					$(".jqueryFileTree.start").remove();
					$.post(o.script, { dir: t }, function(data) {
						$(c).find('.start').html('');
						$(c).removeClass('wait').append(data);
						if( o.root == t ) $(c).find('UL:hidden').show(); else $(c).find('UL:hidden').slideDown({ duration: o.expandSpeed, easing: o.expandEasing });
						bindTree(c);
					});
				}
				
				function bindTree(t) {
					$(t).find('LI A').bind(o.folderEvent, function() {
						if( $(this).parent().hasClass('directory') ) {
							if( $(this).parent().hasClass('collapsed') ) {
								// Expand
								if( !o.multiFolder ) {
									$(this).parent().parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
									$(this).parent().parent().find('LI.directory').removeClass('expanded').addClass('collapsed');
								}
								$(this).parent().find('UL').remove(); // cleanup
								showTree( $(this).parent(), escape($(this).attr('rel').match( /.*\// )) );
								$(this).parent().removeClass('collapsed').addClass('expanded');
							} else {
								// Collapse
								$(this).parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
								$(this).parent().removeClass('expanded').addClass('collapsed');
							}
						} else {
							h($(this).attr('rel'));
						}
						return false;
					});
					// Prevent A from triggering the # on non-click events
					if( o.folderEvent.toLowerCase != 'click' ) $(t).find('LI A').bind('click', function() { return false; });
					
					$(t).find('LI A').each(function(){
						selected = $(this);
						inputtext = $('#new_file_popup #filename');
						inputtext_folder = $('#new_folder_popup #foldername');
						$(this).contextMenu('filenav_rightMenu',
						{
							bindings: {
       					'new_file': function(selected) {
							
								$('#new_file_popup #filename').val('');
								
								$('#new_file_popup').reveal({
									animation: 'fade',
									animationspeed: 200,
									closeonbackgroundclick: false,
									dismissmodalclass: 'close',
									submitmodalclass: 'submit',
									submitEvent: function(){
										makeFile({
											
											fileName: $(selected).attr('rel')+$(inputtext).val()
										});
										
										$(selected).parent().find('UL').remove(); // cleanup
										showTree( $(selected).parent(), escape($(selected).attr('rel').match( /.*\// )) );
										$(selected).parent().removeClass('collapsed').addClass('expanded');
										
									}
								}); 
        					},
        					'new_folder': function(selected) {
          						
								$('#new_folder_popup #foldername').val('');
								
								
								$('#new_folder_popup').reveal({
									animation: 'fade',
									animationspeed: 200,
									closeonbackgroundclick: false,
									dismissmodalclass: 'close',
									submitmodalclass: 'submit',
									submitEvent: function(){
										makeFolder({
											path: $(selected).attr('rel'),
											data: $(inputtext_folder).val()
										});
										$(selected).parent().find('UL').remove(); // cleanup
										showTree( $(selected).parent(), escape($(selected).attr('rel').match( /.*\// )) );
										$(selected).parent().removeClass('collapsed').addClass('expanded');
										
									}
								}); 
        					},

        					'export': function(t) {

          						alert('Trigger was '+t.id+'\nAction was export');

        					},

        					'rename': function(t) {

          						alert('Trigger was '+t.id+'\nAction was rename');

        					},
							'delete': function(selected){
								
								delete_file({
									path: $(selected).attr('rel')
								});
								var rebuildNode = $(selected).parent().parent().parent();
								var rebuildPath;
								if(rebuildNode.attr('id')=='filetree'){
									$("#filetree").fileTree({
										root : '../Database/' + username + '/',
										folderEvent : 'dblclick',
										script : 'connectors/jqueryFileTree.php',
										expandSpeed : 200,
										collapseSpeed : 200,
										multiFolder : true
									}, function(file) {
										addSourceTab(file);
									});
								}else{
									rebuildPath = escape($(selected).parent().parent().parent().find('a').attr('rel').match( /.*\// ));
									rebuildNode.find('UL').remove(); // cleanup
									showTree( rebuildNode, rebuildPath);
									rebuildNode.removeClass('collapsed').addClass('expanded');
								}
								
							}

      					}
						});
					});
					
				
				}
				
				// Loading message
				$(this).html('<ul class="jqueryFileTree start"><li class="wait">' + o.loadMessage + '<li></ul>');
				// Get the initial file list
				showTree( $(this), escape(o.root) );
			});
		}
	});
	
})(jQuery);