function calender() {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var event = {
        1 : 'Event 1',
        2 : 'Event 2',
        30 : 'Event 30'
    };
    var calenderData = [];
    var weekdays = ["Sun","Mon", "Tue", "Wed", "Thur", "Fri","Sat"];
    var monthCombo = document.getElementById('month')
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
        console.log(monthCombo.value);
        calculateDays();
    });
    yearCombo.addEventListener('change', function () {
        console.log(yearCombo.value);
        calculateDays();
    });
    var today = new Date();
    document.getElementById('month').options.selectedIndex = today.getMonth();
    calculateDays();
    function calculateDays() {
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
        console.log("Number of days in this month", monthDays, startDay, endDay);
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
        console.log(calenderArray);
        for (var n = 0; n < calenderArray.length; n++) {
            if (n % 7 === 0) {
                tableRow = document.createElement('tr');
                tableRow.id = 'tr-' + (n / 7);
                tableRow.className = 'table-row';
                document.getElementById('cTable').appendChild(tableRow);
            }
            tableData = document.createElement('td');
            tableData.id = 'td-' + n;
            if (calenderArray[n] == 'b') {
                tableData.innerHTML = '';
            }
            else {
                if(calenderArray[n]===today.getDate() && parseInt(yearCombo.value) === today.getFullYear() && parseInt(monthCombo.value)=== today.getMonth()) {
                    tableData.classList.add('today');
                }
                tableData.innerHTML = calenderArray[n];
                if(event[calenderArray[n]]) {
                    var addEventDiv = document.createElement('div');
                    addEventDiv.innerHTML = event[calenderArray[n]];
                    tableData.appendChild(addEventDiv);
                }

            }
            tableData.addEventListener('click', function () {
                console.log(tableData.id, 'clicked');
                var span = document.getElementsByClassName("close")[0];
                span.onclick = function() {
                    modal.myModal.style.display = 'none';
                }
                var modal = document.getElementsByClassName('modal');
                modal.myModal.style.display = 'block'
            });
            tableRow.appendChild(tableData);
        }
    }
  /*  function  createEventModal() {

    }*/
};
