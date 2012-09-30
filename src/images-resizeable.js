var imagesResizeable = {

	modules: [],

	init: function() {

		this.modules['showImages'] = {

			"dragTargetData" : {

				"imageWidth" : "",
				"diagonal" : "",
				"dragging" : false

			},

			"getDragSize" : function(e){
				var rc = e.target.getBoundingClientRect();
				var p = Math.pow;
				var dragSize = p(p(e.clientX-rc.left, 2)+p(e.clientY-rc.top, 2), .5);
				return Math.round(dragSize);
			}

		};
	},

	makeImageZoomable: function(imageTag) {

		var self = this;
		var modules = self.modules;

		// Add listeners for drag to resize functionality...
		imageTag.addEventListener('mousedown', function(e) {
			if (e.button == 0) {
				if (!imageTag.minWidth) imageTag.minWidth = Math.max(1, Math.min(imageTag.width, 100));
				modules['showImages'].dragTargetData.imageWidth = e.target.width;
				modules['showImages'].dragTargetData.diagonal = modules['showImages'].getDragSize(e);
				modules['showImages'].dragTargetData.dragging = false;
				e.preventDefault();
			}
		}, true);

		imageTag.addEventListener('mousemove', function(e) {
			if (modules['showImages'].dragTargetData.diagonal){
				var newDiagonal = modules['showImages'].getDragSize(e);
				var oldDiagonal = modules['showImages'].dragTargetData.diagonal;
				var imageWidth = modules['showImages'].dragTargetData.imageWidth;
				e.target.style.maxWidth=e.target.style.width=Math.max(e.target.minWidth, newDiagonal/oldDiagonal*imageWidth)+'px';

				e.target.style.maxHeight='';
				e.target.style.height='auto';
				modules['showImages'].dragTargetData.dragging = true;
			}
		}, false);

		imageTag.addEventListener('mouseout', function(e) {
			modules['showImages'].dragTargetData.diagonal = 0;
		}, false);

		imageTag.addEventListener('mouseup', function(e) {
			if (modules['showImages'].dragTargetData.diagonal) {
				var newDiagonal = modules['showImages'].getDragSize(e);
				var oldDiagonal = modules['showImages'].dragTargetData.diagonal;
				var imageWidth = modules['showImages'].dragTargetData.imageWidth;
				e.target.style.maxWidth=e.target.style.width=Math.max(e.target.minWidth, newDiagonal/oldDiagonal*imageWidth)+'px';
			}

			modules['showImages'].dragTargetData.diagonal = 0;
		}, false);

		imageTag.addEventListener('click', function(e) {
			modules['showImages'].dragTargetData.diagonal = 0;
			if (modules['showImages'].dragTargetData.dragging) {
				modules['showImages'].dragTargetData.dragging = false;
				e.preventDefault();
				return false;
			}
		}, false);

	}

}

imagesResizeable.init();