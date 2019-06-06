function calender() {
    var that = this;
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var event = {
        1 : 'Event 1',
        2 : 'Event 2',
        30 : 'Event 30'
    };
    var calenderData = {};
    var weekdays = ["Sun","Mon", "Tue", "Wed", "Thur", "Fri","Sat"];
     that.monthCombo = document.getElementById('month')
    var yearCombo = document.getElementById('year');
    var currentYear = new Date().getFullYear();
    var startDay,endDay,tableRow, tableData;
    var calenderArray = [];
   //localStorage.setItem('year-'+currentYear+'month-', event);
    for (var i = 0; i < 12 ; i ++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = month[i];
        option.className = 'dropdown-item';
        monthCombo.appendChild(option);
    }
    for(var j = new Date(0).getFullYear()  ; j <= currentYear + 10; j++) {
        var option = document.createElement('option');
        option.value = j;
        option.innerHTML = j;
        option.className = 'dropdown-item';
        yearCombo.appendChild(option);
        if(currentYear === j) {
            option.selected = 'selected';
        }
    }
    var table = document.createElement('table');
    table.id = "cTable";
    table.className = 'table';
    document.getElementById('table-div').appendChild(table);
    monthCombo.addEventListener('change', function () {
        calculateDays();
    });
    yearCombo.addEventListener('change', function () {
        calculateDays();
    });
    var today = new Date();
    document.getElementById('month').options.selectedIndex = today.getMonth();
    calculateDays();
    function calculateDays() {
        var storedData = JSON.parse(localStorage.getItem('year-'+currentYear+''+'month-'+that.monthCombo.options.selectedIndex));
        if(storedData) {
            calenderData = storedData;
        }
        document.getElementById('cTable').innerHTML = '';
        var th = document.createElement('tr');
        th.id = 'tr';
        th.className = 'thead-dark';
        document.getElementById('cTable').appendChild(th);
        for (var k = 0 ; k <weekdays.length ; k++) {
            var td = document.createElement('td');
            td.innerHTML = weekdays[k];
            document.getElementById('tr').appendChild(td);
        }
        calenderArray = [];
        var monthDays = new Date(parseInt(yearCombo.value), parseInt(monthCombo.value) + 1, 0).getDate();
        startDay = new Date(parseInt(yearCombo.value), parseInt(monthCombo.value), 1).getDay();
        endDay = new Date(parseInt(yearCombo.value), parseInt(monthCombo.value) + 1, 0).getDay();
        if (startDay !== 0) {
            for (var l = 0; l < startDay; l++) {
                calenderArray.push('b');
            }
        }
        for (var m = 1; m <= monthDays; m++) {
            calenderArray.push(m);
        }
        if (endDay !== 6) {
            for (var n = 0; n < 6 - endDay; n++) {
                calenderArray.push('b');
            }
        }
        for (var n = 0; n < calenderArray.length; n++) {
            if (n % 7 === 0) {
                tableRow = document.createElement('tr');
                tableRow.id = 'tr-' + (n / 7);
                tableRow.className = 'table-row';
                document.getElementById('cTable').appendChild(tableRow);
            }
            tableData = document.createElement('td');
            tableData.id = 'td-' + calenderArray[n];
            if (calenderArray[n] == 'b') {
                tableData.innerHTML = '';
            }
            else {
                if(calenderArray[n]===today.getDate() && parseInt(yearCombo.value) === today.getFullYear() && parseInt(monthCombo.value)=== today.getMonth()) {
                    tableData.classList.add('today');
                }
                tableData.innerHTML = calenderArray[n];
                if(calenderData[calenderArray[n]]) {
                    var addEventDiv = document.createElement('div');
                    addEventDiv.innerHTML = calenderData[calenderArray[n]];
                    tableData.appendChild(addEventDiv);
                }

            }
            tableData.addEventListener('click', function () {
                var span = document.getElementsByClassName("close")[0];
                span.onclick = function() {
                    modal.myModal.style.display = 'none';
                }
                that.modal = document.getElementsByClassName('modal');
                that.modal.myModal.style.display = 'block';
                that.selectedDate = parseInt(this.id.replace('td-', ''));
            });
            tableRow.appendChild(tableData);
        }

    }
    var saveBtn = document.getElementsByClassName('save-btn')[0];
    saveBtn.addEventListener('click', function () {
        var eventName = document.getElementsByClassName('event-name')[0];
        var eventNameVal = eventName.value;
        var from = document.getElementsByClassName('from-val')[0];
        var to = document.getElementsByClassName('to-val')[0];
        var fromMeridiem = document.getElementById('from').value;
        var toMeridiem = document.getElementById('to').value;
        var fromVal = from.value;
        var toVal = to.value;
        var content =  eventNameVal + ' ' + 'From'+ ' '+ fromVal+ ' ' + fromMeridiem +' '+ 'TO' + ''+ toVal +' ' +  toMeridiem +'<br>';
      /*  if( !calenderData[selectedDate]) {
            calenderData[selectedDate] = {};
            calenderData[selectedDate] = [];
        }
        calenderData[selectedDate][calenderData[selectedDate].length] = content;*/
        calenderData[that.selectedDate] = calenderData[that.selectedDate] ? calenderData[that.selectedDate] + content : content;
        window.localStorage.setItem('year-'+currentYear+''+'month-'+that.monthCombo.options.selectedIndex, JSON.stringify(calenderData));
        from.value = '';
        to.value = ''
        eventName.value = '';
        that.modal.myModal.style.display = 'none';
        calculateDays();

    });
  /*  function  createEventModal() {

    }*/
};
