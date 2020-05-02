//var farmingCycle = $("#farmingcycle-result");
var seedInput = $("#startingSeedInput");
var blockInput = $("#startingBlockInput");
(function($) {
	"use strict";

	$(function() {
		seedInput.on('input', function() {
			if($(this).val() > 9999)
		        $(this).val(9999);
		    if($(this).val() < 0)
		        $(this).val(0);
		    gotResults();
		});
		
		blockInput.on('input', function() {
			if($(this).val() > 99999)
		        $(this).val(99999);
		    if($(this).val() < 0)
		        $(this).val(0);
		    gotResults();
		});
		
		$('#farmedInput').on('input', function() {
		    $('#farmedRange').val($(this).val());
		    if ($(this).val() >= 50)
		        $(this).val(50);
		    if ($(this).val() < 0)
		        $(this).val(1);
		    gotResults();
		});
		
		$('#farmedRange').on('input', function() {
		    $('#farmedInput').val($(this).val());
	   	 gotResults();
		});
		
		$('#rarityInput').on('input', function() {
		    $('#rarityRange').val($(this).val());
		    if ($(this).val() >= 246)
		        $(this).val(246);
		    if ($(this).val() < 0)
		        $(this).val(1);
		    gotResults();
		});
		
		$('#rarityRange').on('input', function() {
		    $('#rarityInput').val($(this).val());
	   	 gotResults();
		});
		
		function getBlockFromTree(m, x) {
		    var blocks, fruit;
		    if (m == 4) {
		        blocks = 1;
		        fruit = 1;
		    } else if (m == 8) {
		        blocks = 3;
		        fruit = 2;
		    } else if (m == 12) {
		        blocks = 6;
		        fruit = 3;
		    } else if (m == 16) {
		        blocks = 10;
		        fruit = 4;
		    }
		    return Math.floor(x * blocks / fruit * 2);
		}
	
		function getBlockFromSmashed(x) {
		    return Math.floor(x / 12);
		}
		
		function getGrowTime(r) {
		    var growTime = r * (Math.pow(r, 2) + 30);
		    var days = Math.floor(growTime / 86400);
		    growTime %= 86400;
		    var hours = Math.floor(growTime / 3600);
		    growTime %= 3600;
		    var minutes = Math.floor(growTime / 60);
		    var seconds = growTime % 60;
		    return growTime = days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds";
		}
		
		function setResults(bSmash, eSeed, gems, exp, growTime, fuel)
		{
			if(!fuel) fuel = 'You are not using harvester';
			$('#testing').html('<tr><td>Total number of blocks smashed</td><td>' + bSmash + '</td></tr><tr><td>End amount of seeds</td><td>' + eSeed +'</td></tr><tr><td>Total gems earned</td><td>' + gems + '</td></tr><tr><td>Total experience gained</td><td>' + exp + '</td></tr><tr><td>Total growing time</td><td>' + growTime + '</td></tr><tr><td>Total pack fuel needed</td><td>' + fuel + '</td></tr>');
		}
		
		$('#farmingcycle-result').css('display', 'none');
		setResults(0, 0, 0, 0, getGrowTime(1), 0);
		function gotResults() {
			var maxDrop = 8;
  		  if ($("#notFarmable").checked == 1) maxDrop = 4;
		    else if ($("#farmable").checked == 1) maxDrop = 8;
		    else if ($("#veryFarmable").checked == 1) maxDrop = 12;
		    else if ($("#superFarmable").checked == 1) maxDrop = 16;
		    var seeds = parseInt(seedInput.val());
			var blocks = parseInt(blockInput.val());
			var allBlocks = (blocks + getBlockFromTree(maxDrop, seeds) + getBlockFromSmashed(getBlockFromTree(maxDrop, seeds) + blocks));
			setResults(isNaN(allBlocks) ? 0 : allBlocks, 0, 0, 0, getGrowTime(1), 0);
		}
	});
	
	/*getBlocksFromTree = function(m, x) {
	    var blocks, fruit;
	    if (m == 4) {
	        blocks = 1;
	        fruit = 1;
	    } else if (m == 8) {
	        blocks = 3;
	        fruit = 2;
	    } else if (m == 12) {
	        blocks = 6;
	        fruit = 3;
	    } else if (m == 16) {
	        blocks = 10;
	        fruit = 4;
	    }
	    return Math.floor(x * blocks / fruit * 2);
	}
	
	getBlocksFromSmashed = function(x) {
	    return Math.floor(x / 12);
	}
	
	getSeedsFromTree = function(r, x) {
	    return Math.floor(x * 4 / (r / 10 + 12));
	}
	
	getSeedsFromSmashed = function(x) {
	    return Math.floor(x / 4.2);
	}
	
	getExps = function(r, x) {
	    return Math.round((r / 5) + 1) * x;
	}
	
	getGems = function(R, x, C) {
	    var avg;
	    if (R < 31) avg = R / 12;
	    else if (R > 30) avg = R / 8.5;
	    if (R < 12 && C == !0) avg = avg * 5;
	    return Math.round((x * 2 / 3) * avg)
	}
	
	getGemsFromEmeraldLock = function(R, x) {
	    return Math.round(x * 0.1 / 2);
	}
	
	getDoubleBlockFromHarvester = function(x) {
	    return Math.round(x * 0.1);
	}
	
	getGemsFromLuckyClover = function(r, x) {
	    return Math.round(getGems(r, x * 0.1, !0) * 5);
	}
	
	getGrowTime = function(r) {
	    var growTime = r * (Math.pow(R, 2) + 30);
	    var days = Math.floor(growTime / 86400);
	    growTime %= 86400;
	    var hours = Math.floor(growTime / 3600);
	    growTime %= 3600;
	    var minutes = Math.floor(growTime / 60);
	    var seconds = growTime % 60;
	    return growTime = days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds";
	}
	
	getExpFromEBenedicts = function(e) {
	    return Math.round(e * 1.1);
	}
	
	getExpFromWisdom = function(e) {
	    return Math.round(e * 1.25);
	}
	
	getFarmedCycleText = function(text, loop, startSeeds, endSeeds, gems, exp) {
	    return text + "<tr><td>" + loop + "</td><td>" + startSeeds + "</td><td>" + endSeeds + "</td><td>" + gems + "</td><td>" + exp + "</td></tr>";
	}*/
})(jQuery);

/*document.getElementById("farmingcycle-result").style.display = "none";
document.getElementById("testing").innerHTML = "<tr><td>Total number of blocks smashed</td><td>0</td></tr><tr><td>End amount of seeds</td><td>0</td></tr><tr><td>Total gems earned</td><td>0</td></tr><tr><td>Total experience gained</td><td>0</td></tr><tr><td>Total growing time</td><td>0 Days 0 Hours 0 Minutes 31 Seconds</td></tr><tr><td>Total pack fuel needed</td><td>You are not using harvester</td></tr>";

gotResults = function() {
	var seedInput = document.getElementById("startingSeedInput").value;
	var blockInput = document.getElementById("startingBlockInput").value;
	var rarityInput = document.getElementById("rarityInput").value;
	var farmedInput = document.getElementById("farmedInput").value;

    var maxDrop = 0;
    if (document.getElementById("notFarmable").checked == !0) maxDrop = 4;
    else if (document.getElementById("farmable").checked == !0) maxDrop = 8;
    else if (document.getElementById("veryFarmable").checked == !0) maxDrop = 12;
    else if (document.getElementById("superFarmable").checked == !0) maxDrop = 16;
    
    if (parseInt(blockInput) < 0) blockInput = 0;
    if (parseInt(farmedInput) < 0) farmedInput = 0;
    var startSeeds = parseInt(seedInput);
    var usedFuel = "You are not using harvester";
    var farmedCycleText = "";
    var growTime = getGrowTime(rarityInput);
    var allBlocks = (parseInt(blockInput) + getBlocksFromTree(maxDrop, seedInput) + getBlocksFromSmashed(getBlocksFromTree(maxDrop, seedInput) + parseInt(blockInput)));
    if (document.getElementById("harvester").checked == !0) {
        usedFuel = getDoubleBlockFromHarvester(seedInput);
        if (usedFuel > 0) allBlocks = (allBlocks + getBlocksFromTree(maxDrop, usedFuel) + 2)
    }
    var allSeeds = (getSeedsFromTree(rarityInput, seedInput) + getSeedsFromSmashed(allBlocks));
    var allExps = (getExps(rarityInput, seedInput) + getExps(rarityInput, allBlocks));
    var allGems = (getGems(rarityInput, seedInput) + getGems(rarityInput, allBlocks));
    if (document.getElementById("emeraldLock").checked == !0) allGems = (allGems + getGemsFromEmeraldLock(rarityInput, allBlocks));
    if (document.getElementById("luckyClover").checked == !0) allGems = (allGems + getGemsFromLuckyClover(rarityInput, allBlocks));
    farmedCycleText = getFarmedCycleText(farmedCycleText, 1, startSeeds, allSeeds, allGems, allExps);
    for (i = 1; i < farmedInput; i++) {
        startSeeds = allSeeds;
        allBlocks = (getBlocksFromTree(maxDrop, allSeeds) + getBlocksFromSmashed(getBlocksFromTree(maxDrop, allSeeds)));
        if (document.getElementById("harvester").checked == !0) {
            usedFuel = getDoubleBlockFromHarvester(allSeeds);
            if (usedFuel > 0) allBlocks = (allBlocks + getBlocksFromTree(maxDrop, usedFuel) + 2)
        }
        allSeeds = (getSeedsFromTree(rarityInput, allSeeds) + getSeedsFromSmashed(allBlocks));
        allExps = (getExps(rarityInput, allSeeds) + getExps(rarityInput, allBlocks));
        allGems = (getGems(rarityInput, allSeeds) + getGems(rarityInput, allBlocks));
        if (document.getElementById("emeraldLock").checked == !0) allGems = (allGems + getGemsFromEmeraldLock(rarityInput, allBlocks));
        if (document.getElementById("luckyClover").checked == !0) allGems = (allGems + getGemsFromLuckyClover(rarityInput, allBlocks));
        farmedCycleText = getFarmedCycleText(farmedCycleText, i+1, startSeeds, allSeeds, allGems, allExps)
    }
    var farmedCycleResult = document.getElementById("farmingcycle-result");
    if (document.getElementById("farmedCycle").checked == !0)
        farmedCycleResult.style.display = "block";
    else farmedCycleResult.style.display = "none";
    document.getElementById("testing").innerHTML = "<tr><td>Total number of blocks smashed</td><td>" + allBlocks + "</td></tr><tr><td>End amount of seeds</td><td>" + allSeeds + "</td></tr><tr><td>Total gems earned</td><td>" + allGems + "</td></tr><tr><td>Total experience gained</td><td>" + allExps + "</td></tr><tr><td>Total growing time</td><td>" + growTime + "</td></tr><tr><td>Total pack fuel needed</td><td>" + usedFuel + "</td></tr>";
    $('#farmingcycle-table').DataTable().clear().destroy();
    document.getElementById("testing-2").innerHTML = farmedCycleText;
    $('#farmingcycle-table').DataTable({
    	"paging": true,
    	"lengthChange": false,
        "ordering": true,
        "info": false,
        "searching": false
	});
	return 1;
}*/