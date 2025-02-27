console.log("main.js 연결");
// const API_KEY = `8aea88ecd45146d0aa0f4b56fbcc1be8`
let newsList=[]
// 모든 카테고리 가져오기
const menus = document.querySelectorAll(".menus button") 
// 각 카테고리에 클릭이벤트 -> 카테고리별 뉴스
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));



let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`)
// let = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

// 조건에 맞는 뉴스 가져오기
const getNews = async () => {
  try{
    const response = await fetch(url);
    const data = await response.json(); 
    if(response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No result for this search")
      }
      newsList = data.articles 
      console.log(newsList)
      render();
    }else {
      throw new Error(data.message)
    }
   
  }catch(error){
    // console.log(error.message)
    errorRender(error.message)
  }
}


// 최근 뉴스 출력
const getLatestNews = async () => {
   // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
   url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);

    getNews();
}
// 카테고리별 뉴스 출력
const getNewsByCategory = async (event) => {
   const category = event.target.textContent.trim().toLowerCase();
   console.log(category)
   // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    url= new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`)

    getNews();
}

// 키워드 검색 뉴스 출력
const getNewsByKeyword = async() => {
    const keyword = document.getElementById("search-input").value;

  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`)
  url= new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`)

   getNews();
}

// 검색창 엔터키 적용
function enterKey(){
  if(window.event.keyCode == 13){
    if(document.getElementById("search-input").value.trim() != ''){
      getNewsByKeyword();
    }
  }
}

// 화면에 조건에 맞는 뉴스를 배치
const render = () => {
    const newsHTML = newsList.map(news => ` <div class="row news"> 
            <div class="col-lg-4"> 
              <img class="news-img-size"
                src="${news.urlToImage}"
                  onerror="this.src='https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg';"/>
            </div>
            <div class="col-lg-8"> 
              <h3> ${news.title} </h3>
               <p>${
                      news.description == null || news.description == ""
                        ? "내용없음"
                        : news.description.length > 200
                        ? news.description.substring(0, 200) + "..."
                        : news.description
                }</p>
              <div> ${news.source.name == null || news.source.name == ""
                ? "NO_SOURCE"
                : news.source.name} 
                / ${moment(news.publishedAt).fromNow()}</div>
            </div>
        </div>`).join('')

    document.getElementById("news-board").innerHTML = newsHTML; 
}

// 에러처리
/* const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
                    ${errorMessage}
                    </div>`

  document.getElementById("news-board").innerHTML = errorHTML 
} */

// 최근 헤드라인 뉴스 출력
getLatestNews();

// 검색창 열기
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
    document.getElementById("search-input").value =""; // 닫으면 써있던 내용 삭제
  } else {
    inputArea.style.display = "inline";
  }
};

// 햄버거 열기
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};
// 햄버거 닫기
const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

// 사이드바 카테고리 가져오기
const sideMenus = document.querySelectorAll("#menu-list button");
// 각 버튼에 클릭 이벤트 추가
sideMenus.forEach(button => {
    button.addEventListener("click", closeNav);
}); 