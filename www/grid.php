<?php

	// GRID GENERATOR
	
	// generate static HTML, server-side, inject into source at runtime
	
	$numCols = 30;
	$numRows = 20;
	
	for($i = 0; 
		$i < $numRows;
		$i ++):
?>
	<div class="row">
		<?php
			
			for($j = 0;
				$j < $numCols;
				$j ++):			
		?>
			<div class="micromonial" id="micromonial-<?php echo($j + $i*$numCols); ?>" title="micromonial-<?php echo($j + $i*$numCols); ?>">
				<img src="assets/img/placeholder.png" alt="<?php echo($j + 1 + $i*$numCols); ?>" /> <?php /* <img src="/generator/172x286/ccc/fff&text=<?php echo($j + 1 + $i*$numCols); ?>" alt="" /> */ ?>
			</div>
		<?php
			endfor;
		?>
	</div>
<?php
	endfor;
?>