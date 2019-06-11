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
   that.yearCombo = document.getElementById('year');
    that.$from = document.getElementsByClassName('from-val')[0];
    that.$to = document.getElementsByClassName('to-val')[0];
    that.$eventName = document.getElementsByClassName('event-name')[0];
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
    function clearModal() {
        that.$from.value = '';
        that.$to.value = '';
        that.$eventName.value = '';
        that.modal.myModal.style.display = 'none';
    };
    function calculateDays() {
        var that = this;
       /* var monthAndYear = document.getElementById('month-and-year');
        monthAndYear.innerHTML = month[that.monthCombo.options.selectedIndex] + ', ' + that.yearCombo.selectedOptions[0].value;
       */ var storedData = JSON.parse(localStorage.getItem('year-'+that.yearCombo.selectedOptions[0].value+''+'month-'+that.monthCombo.options.selectedIndex));
        if(storedData) {
            calenderData = storedData;
        }
        else
            calenderData = {};
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
                tableData.innerHTML = calenderArray[n];
                if(calenderArray[n]===today.getDate() && parseInt(yearCombo.value) === today.getFullYear() && parseInt(monthCombo.value)=== today.getMonth()) {
                    tableData.classList.add('today');
                    tableData.innerHTML += '<br >' + '<div style = "padding-top: 30%">' + 'Today !!!' + '</div>';
                }
                if(calenderData[calenderArray[n]]) {
                    calenderData = storedData;
                    for (var p=0; p < calenderData[calenderArray[n]].length ; p++) {
                        var addEventDiv = document.createElement('div');
                        addEventDiv.id = 'event-on ' + calenderArray[n];
                        addEventDiv.classList.add('bg-card' ,'card');
                        addEventDiv.innerHTML += calenderData[calenderArray[n]][p];
                        tableData.appendChild(addEventDiv);
                    }


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
    // TO set listener for each event card
    var allEvents  = document.querySelectorAll('.bg-card');
    allEvents.forEach(function (eventCard , index) {
        eventCard.addEventListener('click' , function () {
            console.log(eventCard, index);
        })
    })
    var saveBtn = document.getElementsByClassName('save-btn')[0];
    saveBtn.addEventListener('click', function () {
        var eventNameVal = that.$eventName.value;
        var fromMeridiem = document.getElementById('from').value;
        var toMeridiem = document.getElementById('to').value;
        var fromVal = that.$from.value;
        var toVal = that.$to.value;
        var content =  eventNameVal + ' ' + 'From'+ ' '+ fromVal+ ' ' + fromMeridiem +' '+ 'TO' + ''+ toVal +' ' +  toMeridiem +'<br>';
        if( !calenderData[selectedDate]) {
            calenderData[selectedDate] = [];
        }
        calenderData[that.selectedDate].push(content);
        window.localStorage.setItem('year-'+that.yearCombo.selectedOptions[0].value+''+'month-'+that.monthCombo.options.selectedIndex, JSON.stringify(calenderData));
       clearModal();
        calculateDays();

    });

    var closeBtn = document.getElementsByClassName('cancel-btn')[0];
    closeBtn.addEventListener('click', function () {
        clearModal.call(that);
    });
function eventHandLing(addEventDIv) {
    console.log(addEventDIv);
}

};
