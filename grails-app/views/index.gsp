<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Asset Pipeline Stylus plugin</title>
	<asset:stylesheet href="style.css"/>
	<style>
		body>* {
			width: 300px
		}
		
		body>div::after {
			content: 'BROKEN';
			color: red;
			float: right
		}
	</style>
</head>
<body>
	<h1>Stylus plugin functionality test</h1>
	<div class="basic">basic functionality:</div>
	<div class="import">import a file:</div>
	<div class="require">require a file:</div>
	<div class="tux">sample image dimensions:</div>
</body>
</html>