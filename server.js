/* http 모듈 + express 모듈로 업그레이드!! */
var http=require("http"); //기본 서버 모듈
var express=require("express");//서버 보완모듈
var mysql=require("mysql");
var bodyParser=require("body-parser");//외부모듈

var app=express();//express 객체 생성!!
//서버객체 생성 
var server = http.createServer(app);

//html,css,image,video 등 정적자원은 일일이 
//1:1 대응하는 요청을 처리할 필요 없게 하자!!
//express가 지원하는 미들웨어를 사용한다!!
//미들웨어는 use() 메서드를 이용한다
app.use(express.static(__dirname));

//아래의 미들웨어를 등록한 후의 효과??
//전송 파라미터를 json 객체화 시켜서 사용할 수 있다
//json 객체안에 json 허용할지 여부..
app.use(bodyParser.urlencoded({"extended":"false"}));
app.use(bodyParser.json());

//ejs 뷰 템플릿 등록 (등록할때의 장점?)
//ejs의 폴더경로 및 확장자를 명시하지 않는다..
app.set("views",__dirname+"/views"); //ejs 파일의 위치!!
app.set("view engine","ejs");//확장자 등록

//mysql 연동시작!!
//커넥션풀링이란? 접속자가 없더라도 db와 미리 연결
//된 객체를 확보하여 메모리에 모아놓는 처리방법
//왜 사용하나? 대량의 사용자 처리를 위함..
var pool=mysql.createPool({
    url:"localhost",    
    user:"root",
    password:"",
    database:"front"
});


//요청처리!!
//클라이언트가 요청한 uri 매핑!!
app.get("/board/list", function(request, response){
    //서버에서 지정한 파일을 실행한 후 그결과를 보내준다 
    response.render("board/list");
});

//글등록 요청 처리 
app.post("/board/regist", function(request, response){
    //request 객체로부터 post 방식으로 전달된, 즉 body
    //전달된 파라미터를 추출
    //express 모듈에는 파라미터를 json 형식으로 받을
    //수 있게 해주는 미들웨어가 지원된다..
    console.log(request.body);

    //console.log는 서버측에 출력됨...
    console.log("글 등록 원해?");
    
    //풀로 부터 커넥션 객체 1개 얻기!!!
    pool.getConnection(function(error, con){
        if(error){  
            console.log(error);
        }else{
            //쿼리문 수행!!
            var sql="insert into board(writer,title,content)";
            sql+=" values(?,?,?)"
            //con.query(sql);
        }
    });


});


//서버객체로 서버 가동!!
server.listen(9999, function(){
    console.log("웹서버가 9999포트에서 가동중...");
});
