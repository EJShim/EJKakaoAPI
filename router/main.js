/**
 * Created by http://myeonguni.com on 2016-09-04.
 */

var jaccard = require ('jaccard-similarity-sentences');


module.exports = function(app, fs)
{

	app.get('/', function(req, res){
			res.end("Hello World");
	});

	// 키보드
	app.get('/keyboard', function(req, res){
		console.log("keyboard");
        fs.readFile( __dirname + "/../data/" + "keyboard.json", 'utf8', function (err, data) {
           console.log( data );
           res.end( data );
        });
			});

	// 메시지
	app.post('/message', function(req, res){
		var result = {  };

		// CHECK REQ VALIDITY
    if(!req.body["user_key"] || !req.body["type"] || !req.body["content"]){
    	result["success"] = 0;
      result["error"] = "invalid request";
			res.json(result);
      return;
    }


		console.log(req.body["content"]);


		// 초기 keyboard 버튼일 경우(도움말||시작하기||만든이)
		if(req.body["content"] == "도움맬" || req.body["content"] == "시작하기" || req.body["content"] == "만든이"){

			fs.readFile( __dirname + "/../data/message.json", 'utf8',  function(err, data){
				var messages = JSON.parse(data)["content"];

				// 각 keyboard 버튼에 따른 응답 메시지 설정
				if(req.body["content"] == "도움말"){
					messages["message"] = {"text" : "심심해서 만들어봤습니."};
				}else if(req.body["content"] == "시작하기"){
					messages["message"] = {"text" : "뭘시작해"};
				}else{
					messages["message"] = {"text" : "심응준이 만들었습니다."};
				}

				res.end( JSON.stringify(messages) );
				//나중에 데이터베이스 업데이트를 Dynamically 하고싶을때 이거 사용해봐야겠음.
				// fs.writeFile(__dirname + "/../data/message.json",
				// 			 JSON.stringify(messages, null, '\t'), "utf8", function(err, data){
				// })
				// fs.readFile( __dirname + "/../data/message.json", 'utf8', function (err, data) {
				// 	// 결과 로그 출력
				// 	console.log("Request_user_key : "+req.body["user_key"]);
				// 	console.log("Request_type : keyboard - "+req.body["content"]);
				// 	res.end(data);
				// 	return;
				// })

			})
		}else { //아무말이나 할때
			fs.readFile( __dirname + "/../data/message.json", 'utf8',  function(err, data){
				var messages = JSON.parse(data)["content"];
				var array = JSON.parse(data)["array"];

				//랜덤하게 아무말이나 내뱉음
				var temp = array[Math.floor(Math.random() * array.length)];
				messages["message"] = {"text" : temp};

				res.end(JSON.stringify(messages));

			})
		}
  });

	// 친구추가
	app.post('/friend', function(req, res){
        var result = {  };

		// 요청 param 체크
        if(!req.body["user_key"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

		// 파일 입출력
        fs.readFile( __dirname + "/../data/friend.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
			// 이미 존재하는 친구일 경우
            if(users[req.body["user_key"]]){
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }
            // 친구추가
            users[req.body["user_key"]] = req.body;
            fs.writeFile(__dirname + "/../data/friend.json",
                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                result = 200;
                res.json(result);
                return;
            })
        })
    });

	// 친구삭제(차단)
	app.delete('/friend/:user_key', function(req, res){
        var result = { };

        // 파일 입출력
        fs.readFile(__dirname + "/../data/friend.json", "utf8", function(err, data){
            var users = JSON.parse(data);

            // 존재하지 않는 친구일 경우
            if(!users[req.params.user_key]){
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }
			// 친구 삭제
            delete users[req.params.user_key];
            fs.writeFile(__dirname + "/../data/friend.json",
                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                result = 200;
                res.json(result);
                return;
            })
        })
    })

	// 채팅방 나가기
	app.delete('/chat_room/:user_key', function(req, res){
        var result = { };
		result = 200;
		res.json(result);
		return;
    })
}
