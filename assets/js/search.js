$(document).ready(function() {
  
  $("#searchInput").on("keyup", function() {
    filterResults();
  });
       
  $('#core').click(function() {
    filterResults();
  });

  $('#intermediate').click(function() {
    filterResults();
  });

  $('#advanced').click(function() {
    filterResults();
  });

  $('#hpc').click(function() {
    filterResults();
  });

  $('#data').click(function() {
    filterResults();
  });

  $('#cloud').click(function() {
    filterResults();
  });

  $('#visualisation').click(function() {
    filterResults();
  });

  $('#containers').click(function() {
    filterResults();
  });

  $('#chemistry').click(function() {
    filterResults();
  });

  $('#fea').click(function() {
    filterResults();
  });

  $('#nlp').click(function() {
    filterResults();
  });

  $('#bio').click(function() {
    filterResults();
  });
  
  $('#cfd').click(function() {
    filterResults();
  });

  $('#ml').click(function() {
    filterResults();
  });

  $('#ddp').click(function() {
    filterResults();
  });

  $('#external').click(function() {
    filterResults();
  });

  $('#sheffield-rit').click(function() {
    filterResults();
  });

  $('#sheffield-rse').click(function() {
    filterResults();
  });
  
  document.getElementById('sheffield-rit').click();
  document.getElementById('sheffield-rse').click();

  function filterResults() {
    $("#pageTable tr").filter(function() {
      text = $(this).text().toLowerCase();
      searchValue = $("#searchInput").val().toLowerCase();
      
      $(this).toggle(text.indexOf(searchValue) > -1 ? true : false);

      isCore = $('#core').is(':checked');
      isIntermediate = $('#intermediate').is(':checked');
      isAdvanced = $('#advanced').is(':checked');
      noLevel = ( !isCore && !isIntermediate && !isAdvanced );

      isHPC = $('#hpc').is(':checked');
      isData = $('#data').is(':checked');
      isCloud = $('#cloud').is(':checked');
      isVisualisation = $('#visualisation').is(':checked');
      isContainers = $('#containers').is(':checked');
      isChemistry = $('#chemistry').is(':checked');
      isFEA = $('#fea').is(':checked');
      isNLP = $('#nlp').is(':checked');
      isBiology = $('#bio').is(':checked');
      isCFD = $('#cfd').is(':checked');
      isML = $('#ml').is(':checked');
      isDDP = $('#ddp').is(':checked');
      noTopic = ( !isHPC && !isData && !isCloud && !isVisualisation && !isContainers && !isChemistry && !isFEA && !isNLP && !isBiology && !isCFD  && !isML && !isDDP );
      
      isExternal = $('#external').is(':checked');
      isSheffieldRIT = $('#sheffield-rit').is(':checked');
      isSheffieldRSE = $('#sheffield-rse').is(':checked');
      noProvider = ( !isExternal && !isSheffieldRIT && !isSheffieldRSE);
      
      if (isCore || isIntermediate || isAdvanced || isHPC || isData || isCloud || isVisualisation || isContainers || isChemistry || isFEA || isNLP || isBiology || isCFD || isML || isDDP || isExternal || isSheffieldRIT || isSheffieldRSE) 
      {
        tag = $(this).find("td:eq(1)").html().toLowerCase();        
        if ( ( searchValue == "" || text.indexOf(searchValue) > -1 ) &&
            ( (isCore && tag.indexOf('core') > -1) ||
            (isIntermediate && tag.indexOf('intermediate') > -1) ||
            (isAdvanced && tag.indexOf('advanced') > -1) ||
            noLevel ) &&
            ( (isHPC && tag.indexOf('hpc') > -1) ||
            (isData && tag.indexOf('data') > -1) ||
            (isCloud && tag.indexOf('cloud') > -1) ||
            (isVisualisation && tag.indexOf('visualisation') > -1) ||
            (isContainers && tag.indexOf('containers') > -1) ||
            (isChemistry && tag.indexOf('chemistry') > -1) ||
            (isFEA && tag.indexOf('fea') > -1) ||
            (isNLP && tag.indexOf('nlp') > -1) ||
            (isBiology && tag.indexOf('bio') > -1) ||
            (isCFD && tag.indexOf('cfd') > -1) ||
            (isML && tag.indexOf('ml') > -1) ||
            (isDDP && tag.indexOf('ddp') > -1) ||
            noTopic ) &&
            ( 
            (isExternal && tag.indexOf('external') > -1) ||
            (isSheffieldRIT && tag.indexOf('sheffield-rit') > -1) ||
            (isSheffieldRSE && tag.indexOf('sheffield-rse') > -1) ||
            noProvider 
            ) 
            )
        {
          $(this).toggle(true);
        }
        else 
        {
          $(this).toggle(false);
        } 
      }
      
      sortTable();
    });
  };
});

window.onload = function sortTableByName() {
  sortTable();
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("trainingTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
