//es6 부터는 클래스,상속 등을 지원한다...
class PagingManager{
    constructor(){
        this.currentPage=1;
        this.totalRecord=0; //총 레코드 수
        this.pageSize=10;//페이지당 보여질 레코드 수
        this.totalPage=0;//총 페이지 수            
        this.blockSize=10;//블럭당 보여질 페이지 수
        this.firstPage=0;
        this.lastPage=0;
    }
    //위에 선언한 클래스 멤버 변수들의 계산을 처리...
    init(request, total){
        //클라이언트가 전송한 currentPage 값으로 대체
        this.currentPage=request.query.currentPage;
        if(this.currentPage==undefined){
            this.currentPage=1;
        }
        this.totalRecord=total;
        this.totalPage = Math.ceil(this.totalRecord/this.pageSize);
        this.firstPage=this.currentPage-(this.currentPage-1)%this.blockSize;
        this.lastPage=this.firstPage+(this.blockSize-1);
    }
}
//위의 코드를 사용자 정의 모듈로 선언한다!!
module.exports = PagingManager;