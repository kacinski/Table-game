

(function () {

    function getId(){
        let id = new Date().getTime();
        return id;
    }

    let clientId = false;

    let arr = [];

    function nextIndex(a) {
        let x = a - 1;
        arr.push(x);
        x = Number(a) + 1;
        arr.push(x);
        x = a - 51;
        arr.push(x);
        x = a - 50;
        arr.push(x);
        x = a - 49;
        arr.push(x);
        x = Number(a) + 51;
        arr.push(x);
        x = Number(a) + 50;
        arr.push(x);
        x = Number(a) + 49;
        arr.push(x);
        let s = new Set(arr);
        let it = s.values();
        return Array.from(it);
    }

    function getColor(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let clientColor = getColor();

    const ws = new WebSocket(`ws://${location.host}`);
    // ws.onmessage = function (event) {
    //   const data = JSON.parse(event.data);
    //   let selector = data.map(el => "tr td[data-index='" + el + "']").join(",");
    //   if(selector) {
    //       var a = document.querySelectorAll(selector);
    //       let index = a[0].dataset.index;
    //
    //
    //
    //       [...a].forEach(el => {
    //           if (el.style.backgroundColor != clientColor) {
    //               el.style.backgroundColor = clientColor;
    //
    //           }
    //       })
    //   }
    // };



    function onClick(e) {


        if (!e.target.textContent &&
            e.target.parentNode.nodeName == "TR" &&
            !e.target.style.backgroundColor) {
            let index = e.target.getAttribute('data-index');
            if (!clientId) {
                clientId = getId();
                nextIndex(index);
                console.log(arr);
                e.target.style.backgroundColor = clientColor;
                console.log(index + "-" + clientId);
            }else
                {

                arr.forEach(function (el) {
                    if (index == el) {

                        let ar = nextIndex(index);
                        console.log(index+ '-'+ ar);
                        ws.send(+index);
                        e.target.style.backgroundColor = clientColor;
                    }
                })
            }
        }
    }





    drawTable = () => {

        let board = [];
        let array = [];
        for (i = 0; i < 50; i++) {
            array[i] = [];
            for (j = 0; j < 50; j++)
                array[i].push(''); // Creating a data array which a loop will source from
        }
        var table = document.createElement('table');
        document.body.appendChild(table); // Drew the main table node on the document

        for (var i = 0; i < array.length; i++) {
            let tr = document.createElement('tr'); //Create 3 <tr> elements assigned to
                                                     // a unique variable BUT need a working alternative for 'tr[i]'
            table.appendChild(tr); // Append to <table> node

            for (var j = 0; j < array[i].length; j++) {

                var tdText = document.createElement('td');
                tdText.textContent = (array[i][j]);
                board.push(tdText);
                tdText.onclick = onClick;
                tdText.setAttribute('data-index', i * array[i].length + (j + 1));

                tr.appendChild(tdText); // Take string from placeholder variable and append it to <tr> node
            }
        }
    };
    drawTable();

    //init

    //Message
    //ws.message


    //Game
    //table [{"Red", id:1", x:1, y:2}]

    // makeRandomColorForUser - DONE !

    // hitCell - on click
    // check is cell empty
    // check is cell first - draw
    // check is there users cell around
    // confirmHit
    //sendHit
    //addHitToTable
    // Table.drawCell

    // oponentHit
    // []
    // addHitToTable
    // Table.drawCell [red, 1, 2]

    //Table
    //drawtable // 10x10
    //drawcell // position, color





})();