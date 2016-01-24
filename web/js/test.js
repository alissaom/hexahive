$(document).ready(function(){
    $('#urlRequest').on('submit', function(e){
        e.preventDefault();
        var url = e.target.url.value;
        run(url);

    });    
    
    
    /**** COLORS TRANSLATION ****/
    
    function toDiffBase(n,base) {
        if (n == 0) {
            return "0";
        }
        var retval = " ";
        while (n > 0) {
            var rem = n % base;
            retval = rem + retval;
            n = n / base;
        }
        return retval;
    }
    
    function main()
    {
         var anArray = new Array( 7 );
            for( var i = 0; i < 7; ++i )
            {
               anArray[ i ] = ' ';
            }
            // get hexastring of color from front end
            var colorCode = "FF9467";
           
        /// convert decimal to binary
        var completeBinary = "";
        
        hexToBin = {
            '0': '0000',
            '1': '0001',
            '2': '0010',
            '3': '0011',
            '4': '0100',
            '5': '0101',
            '6': '0110',
            '7': '0111',
            '8': '1000',
            '9': '1001',
            'A': '1010',
            'B': '1011',
            'C': '1100',
            'D': '1101',
            'E': '1110',
            'F': '1111'
        }
        
        for( var i = 0; i < colorCode.length; ++i )
        {
            var str = hexToBin[colorCode[i]].toString();
               completeBinary += str;
        }// end for loop
            // print complete string of all bits	
        console.log("Hexadecimal Color Code="+colorCode);
        console.log("Binary Conversion="+completeBinary);
    }// end main function
    
    function getCredentials() {
        if (localStorage.getItem('accessToken') === null
            || localStorage.getItem('tokenTimeStamp') - Math.floor(Date.now() / 1000) > 86400) {
            var data = {
                'grant_type': 'client_credentials',
                'client_id': '_jSNsVv8BWIH1XbcbgDvcc67G0mAWvMuIvbpO-ac',
                'client_secret': 'bPcsQlT7sH8iiJXuyJkWM54GryqbmRAVldD7oA-A'
            };

            $.ajax({
                'url': 'https://api.clarifai.com/v1/token',
                'data': data,
                'type': 'POST'
            })
                .then(function(r) {
                localStorage.setItem('accessToken', r.access_token);
                localStorage.setItem('tokenTimestamp', Math.floor(Date.now() / 1000));
            });
        }
    }

    function postImage(imgurl) {
        var data = {
            'url': imgurl
        };
        var accessToken = localStorage.getItem('accessToken');

        return $.ajax({
            'url': 'https://api.clarifai.com/v1/tag',
            'headers': {
                'Authorization': 'Bearer ' + accessToken
            },
            'data': data,
            'type': 'POST'
        }).then(function(r){
            var tags = parseResponse(r);
            console.log(tags);
            main()
        });
    }

    function parseResponse(resp) {
        var tags = [];
        if (resp.status_code === 'OK') {
            var results = resp.results;
            tags = results[0].result.tag.classes;
            console.log(results[0])
        } else {
            console.log('Sorry, something is wrong.');
        }

        $('#tags').text(tags.toString().replace(/,/g, ', '));
        return tags;
    }

    function run(imgurl) {
        $.when(getCredentials())
            .then(postImage(imgurl));
    }

});

